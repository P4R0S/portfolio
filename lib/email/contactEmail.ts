// HTML template for the contact-form email sent to me. Email clients ignore stylesheets and
// CSS variables, so everything is inline styles and tables, with the light theme's hex values.

const C = {
  page: '#faf8f5',
  card: '#ffffff',
  line: '#e7e2db',
  fg: '#18181b',
  fg2: '#52525b',
  fg3: '#6b6b74',
  accent: '#ea580c',
  accentFg: '#c2410c',
  tint: '#fff4ec',
}

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function contactEmailHtml({
  name,
  email,
  message,
  siteUrl,
}: {
  name: string
  email: string
  message: string
  siteUrl: string
}) {
  const n = escapeHtml(name)
  const e = escapeHtml(email)
  const body = escapeHtml(message).replace(/\r?\n/g, '<br>')
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: your message on p4ros.de')}`
  const sentAt = new Date().toLocaleString('en-GB', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>New message from ${n}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(message.slice(0, 120))}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.card};border:1px solid ${C.line};border-radius:16px;overflow:hidden;font-family:${FONT};">
        <tr><td style="height:4px;background:${C.accent};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr>
          <td style="padding:28px 32px 8px;">
            <p style="margin:0;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.accentFg};font-weight:600;">Portfolio contact</p>
            <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;color:${C.fg};font-weight:700;">New message from ${n}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:${C.fg2};">
              <tr>
                <td style="padding:4px 0;width:64px;color:${C.fg3};">Name</td>
                <td style="padding:4px 0;color:${C.fg};font-weight:600;">${n}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;width:64px;color:${C.fg3};">Email</td>
                <td style="padding:4px 0;"><a href="mailto:${e}" style="color:${C.accentFg};text-decoration:none;">${e}</a></td>
              </tr>
              <tr>
                <td style="padding:4px 0;width:64px;color:${C.fg3};">Sent</td>
                <td style="padding:4px 0;color:${C.fg2};">${sentAt}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px 0;">
            <div style="background:${C.tint};border-left:3px solid ${C.accent};border-radius:8px;padding:16px 18px;font-size:15px;line-height:1.6;color:${C.fg};">${body}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px 28px;">
            <a href="${replyHref}" style="display:inline-block;background:${C.accent};color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:10px 20px;border-radius:10px;">Reply to ${n}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:16px 32px;border-top:1px solid ${C.line};font-size:12px;color:${C.fg3};">
            Sent from the contact form on <a href="${siteUrl}" style="color:${C.fg3};">${escapeHtml(siteUrl.replace(/^https?:\/\//, ''))}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}
