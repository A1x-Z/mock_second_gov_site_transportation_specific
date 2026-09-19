import { useState } from 'react'
import { ConfirmationPage } from './ConfirmationPage'
import { HomePage } from './HomePage'
import { ReportForm } from './ReportForm'
import { sendReportEmail } from './sendReportEmail'
import type { Page, ReportSubmission } from './types'

function createReferenceId() {
  const number = Math.floor(10000 + Math.random() * 90000)
  return `DOT-${number}`
}

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [report, setReport] = useState<ReportSubmission | null>(null)
  const [referenceId, setReferenceId] = useState('')

  async function handleSubmitReport(submitted: ReportSubmission) {
    const nextReferenceId = createReferenceId()
    await sendReportEmail(submitted, nextReferenceId)
    setReport(submitted)
    setReferenceId(nextReferenceId)
    setPage('confirmation')
  }

  return (
    <div className="app">
      <header className="site-header">
        <p className="agency-banner">
          Official website of the Riverton Department of Transportation
        </p>
        <div className="header-bar">
          <div className="brand">
            <svg
              className="dot-shield"
              viewBox="0 0 48 48"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="#f4f1e8"
                d="M24 3.5 41 10v13.2c0 10.4-8.4 18.8-17 21.3C15.4 42 7 33.6 7 23.2V10z"
              />
              <path
                fill="#123c2b"
                d="M24 8.4 36.6 13.2v9.4c0 7.6-6.1 13.8-12.6 15.8-6.5-2-12.6-8.2-12.6-15.8v-9.4z"
              />
              <text
                x="24"
                y="27"
                textAnchor="middle"
                fill="#f4f1e8"
                fontSize="10"
                fontFamily="inherit"
                fontWeight="700"
              >
                DOT
              </text>
            </svg>
            <div className="brand-text">
              <span className="header-kicker">City of Riverton</span>
              <span className="header-title">Department of Transportation</span>
            </div>
          </div>
          <p className="header-mission">Roads · Transit · Traffic systems</p>
        </div>
        <nav className="agency-nav" aria-label="Agency sections">
          <span>Highways &amp; Streets</span>
          <span>Traffic Signals</span>
          <span>Transit Stops</span>
          <span>Bridges &amp; Structures</span>
        </nav>
        <div className="safety-stripe" aria-hidden="true" />
      </header>

      {page === 'home' && (
        <HomePage onReportIssue={() => setPage('report')} />
      )}
      {page === 'report' && (
        <ReportForm onSubmitReport={handleSubmitReport} />
      )}
      {page === 'confirmation' && report && (
        <ConfirmationPage referenceId={referenceId} report={report} />
      )}

      <footer className="site-footer">
        <p>Riverton DOT · Mock transportation agency website for testing only.</p>
        <p>Do not submit real roadway or transit hazards here.</p>
      </footer>
    </div>
  )
}
