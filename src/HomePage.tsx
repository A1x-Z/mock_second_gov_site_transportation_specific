type HomePageProps = {
  onReportIssue: () => void
}

const serviceAreas = [
  {
    title: 'Pavement & potholes',
    detail: 'Broken pavement, shoulder drop-offs, and roadway debris.',
  },
  {
    title: 'Traffic control',
    detail: 'Signals, stop signs, faded lane markings, and work-zone issues.',
  },
  {
    title: 'Transit facilities',
    detail: 'Damaged bus shelters, inaccessible boarding areas, and stop hazards.',
  },
  {
    title: 'Bridges & structures',
    detail: 'Guardrail damage, overpass debris, and railing defects.',
  },
]

export function HomePage({ onReportIssue }: HomePageProps) {
  return (
    <main className="page">
      <p className="eyebrow">Public hazard reporting</p>
      <h1>Report a roadway or transit hazard</h1>
      <p className="subtitle">
        Non-emergency requests for streets, highways, signals, and transit
        facilities.
      </p>
      <p className="lede">
        Use this form to notify the Department of Transportation about
        potholes, malfunctioning traffic signals, damaged guardrails, blocked
        bike lanes, unsafe bus stops, and other transportation-network
        problems. For crashes or medical emergencies, call 911.
      </p>

      <ul className="service-grid">
        {serviceAreas.map((area) => (
          <li key={area.title}>
            <strong>{area.title}</strong>
            <span>{area.detail}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        id="report-issue-button"
        className="primary-button"
        onClick={onReportIssue}
      >
        Report a Roadway Hazard
      </button>
    </main>
  )
}
