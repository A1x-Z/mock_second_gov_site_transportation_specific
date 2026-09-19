import { REPORT_EMAIL } from './emailRecipient'
import type { ReportSubmission } from './types'

type FormSubmitResponse = {
  success?: string | boolean
  message?: string
}

function emailEndpoint() {
  if (import.meta.env.DEV) {
    return '/api/email-report'
  }

  return `https://formsubmit.co/ajax/${encodeURIComponent(REPORT_EMAIL)}`
}

export async function sendReportEmail(
  report: ReportSubmission,
  referenceId: string,
): Promise<void> {
  const response = await fetch(emailEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `DOT mock report ${referenceId}`,
      _template: 'table',
      _captcha: 'false',
      to: REPORT_EMAIL,
      referenceId,
      description: report.description,
      latitude: report.latitude,
      longitude: report.longitude,
      photoUrl: report.photoUrl || 'None provided',
    }),
  })

  let result: FormSubmitResponse = {}
  try {
    result = (await response.json()) as FormSubmitResponse
  } catch {
    result = {}
  }

  const succeeded = result.success === true || result.success === 'true'

  if (!response.ok || !succeeded) {
    throw new Error(result.message || 'Unable to send the report email.')
  }
}
