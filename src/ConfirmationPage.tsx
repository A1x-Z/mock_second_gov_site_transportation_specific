import type { ReportSubmission } from './types'

type ConfirmationPageProps = {
  referenceId: string
  report: ReportSubmission
}

export function ConfirmationPage({
  referenceId,
  report,
}: ConfirmationPageProps) {
  return (
    <main className="page">
      <p className="eyebrow">Maintenance request received</p>
      <h1 id="confirmation-message">Hazard report submitted</h1>
      <p className="subtitle">
        Riverton DOT has logged this transportation request. Keep the work-order
        number for your records.
      </p>

      <p className="reference-line">
        Work order:{' '}
        <strong id="reference-id">{referenceId}</strong>
      </p>

      <dl className="submitted-details">
        <div>
          <dt>Description of hazard</dt>
          <dd id="submitted-description">{report.description}</dd>
        </div>
        <div>
          <dt>Latitude</dt>
          <dd id="submitted-latitude">{report.latitude}</dd>
        </div>
        <div>
          <dt>Longitude</dt>
          <dd id="submitted-longitude">{report.longitude}</dd>
        </div>
        <div>
          <dt>Photo URL</dt>
          <dd id="submitted-photo-url">{report.photoUrl || 'None provided'}</dd>
        </div>
      </dl>
    </main>
  )
}
