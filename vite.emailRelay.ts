import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { REPORT_EMAIL } from './src/emailRecipient.ts'

async function readBody(req: IncomingMessage) {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf8')
}

async function relayEmail(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, message: 'Method not allowed' }))
    return
  }

  try {
    const body = await readBody(req)
    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(REPORT_EMAIL)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: 'http://localhost:3001',
          Referer: 'http://localhost:3001/',
        },
        body,
      },
    )

    const text = await response.text()
    res.statusCode = response.ok ? 200 : 502
    res.setHeader('Content-Type', 'application/json')
    res.end(text)
  } catch {
    res.statusCode = 502
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify({
        success: false,
        message: 'Unable to send the report email.',
      }),
    )
  }
}

export function emailRelayPlugin(): Plugin {
  return {
    name: 'email-relay',
    configureServer(server) {
      server.middlewares.use('/api/email-report', (req, res) => {
        void relayEmail(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/email-report', (req, res) => {
        void relayEmail(req, res)
      })
    },
  }
}
