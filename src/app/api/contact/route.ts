import { Resend } from "resend";
import { NextResponse } from "next/server";

// POST /api/contact
// Handles submissions from the site's contact form(s) — validates the
// incoming data, builds a branded HTML email, and sends it via Resend.
export async function POST(req: Request) {
  try {
    // Resend client is authenticated using the API key from env vars
    // (set in .env.local locally, and in your hosting provider's dashboard in production).
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Parse the JSON body sent by the contact form's fetch() call.
    // Expected shape: { name, email, phone, message }
    const { name, email, phone, message } = await req.json();

    // ── Server-side validation ──
    // Phone is optional (see fallback below), but name/email/message are required.
    // This is a second line of defense — the form itself uses `required` on inputs,
    // but that's client-side only and can be bypassed, so we re-check here.
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // ── Send the email via Resend ──
    // The `html` field below is a full HTML email template, written with
    // table-based layout and inline styles because that's what's required
    // for consistent rendering across email clients (many strip <style> blocks
    // or ignore modern CSS like Flexbox/Grid).
    const result = await resend.emails.send({
      from: "J Eleven Media <contact@jelevenmedia.com>", // must be a verified sending domain in Resend
      to: "nhmcbride42@gmail.com",                        // where inquiries land — update if this changes
      subject: `New inquiry from ${name}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Form Submission</title>
  <style>
    /* Imported for email clients that DO support <style> + @import (e.g. Apple Mail).
       Clients that don't will just fall back to the Georgia/serif stack below. */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0ece4;font-family:'Playfair Display',Georgia,serif;">

  <!-- Outer full-width table: centers the email card on any screen/client -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#f0ece4;padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Fixed-width inner table: the actual "card" content, capped at 600px -->
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;">

          <!-- Small brand kicker above the card -->
          <tr>
            <td style="padding:0 0 24px 0;">
              <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:11px;
                letter-spacing:0.18em;text-transform:uppercase;color:#9c6b4e;font-weight:400;">
                J Eleven Media
              </p>
            </td>
          </tr>

          <!-- Main white card -->
          <tr>
            <td style="background:#ffffff;border-radius:16px;overflow:hidden;">

              <!-- Card header: "New Inquiry" eyebrow + headline -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:32px 40px 24px;border-bottom:1px solid #e8e2d9;">
                    <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.14em;
                      text-transform:uppercase;color:#9c6b4e;
                      font-family:'Playfair Display',Georgia,serif;">
                      New Inquiry
                    </p>
                    <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;
                      font-size:28px;font-weight:400;color:#2c2420;
                      letter-spacing:-0.01em;line-height:1.15;">
                      Someone reached out
                    </h1>
                  </td>
                </tr>
              </table>

              <!-- Card body: each form field rendered as a label + value,
                   separated by thin 1px divider rows. Repetitive by design —
                   email HTML doesn't support shared classes/loops. -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- Name -->
                <tr>
                  <td style="padding:24px 40px 0;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;
                      text-transform:uppercase;color:#9c6b4e;
                      font-family:'Playfair Display',Georgia,serif;">Name</p>
                    <p style="margin:0;font-size:17px;color:#2c2420;
                      font-family:'Playfair Display',Georgia,serif;line-height:1.4;">
                      ${name}
                    </p>
                  </td>
                </tr>
                <tr><td style="padding:20px 40px 0;">
                  <div style="height:1px;background:#e8e2d9;"></div>
                </td></tr>

                <!-- Email — rendered as a mailto: link so it's clickable from the inbox -->
                <tr>
                  <td style="padding:20px 40px 0;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;
                      text-transform:uppercase;color:#9c6b4e;
                      font-family:'Playfair Display',Georgia,serif;">Email</p>
                    <a href="mailto:${email}" style="margin:0;font-size:17px;color:#2c2420;
                      font-family:'Playfair Display',Georgia,serif;
                      text-decoration:none;line-height:1.4;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr><td style="padding:20px 40px 0;">
                  <div style="height:1px;background:#e8e2d9;"></div>
                </td></tr>

                <!-- Phone — optional field, so we fall back to "Not provided" if empty -->
                <tr>
                  <td style="padding:20px 40px 0;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;
                      text-transform:uppercase;color:#9c6b4e;
                      font-family:'Playfair Display',Georgia,serif;">Phone</p>
                    <p style="margin:0;font-size:17px;color:#2c2420;
                      font-family:'Playfair Display',Georgia,serif;line-height:1.4;">
                      ${phone || "Not provided"}
                    </p>
                  </td>
                </tr>
                <tr><td style="padding:20px 40px 0;">
                  <div style="height:1px;background:#e8e2d9;"></div>
                </td></tr>

                <!-- Message — the free-text project description, italicized to
                     visually distinguish it as "quoted" user content -->
                <tr>
                  <td style="padding:20px 40px 32px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;
                      text-transform:uppercase;color:#9c6b4e;
                      font-family:'Playfair Display',Georgia,serif;">Message</p>
                    <p style="margin:0;font-size:17px;color:#2c2420;
                      font-family:'Playfair Display',Georgia,serif;
                      line-height:1.65;font-style:italic;">
                      ${message}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Call-to-action button: one-click reply, pre-filled via mailto: -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 40px 36px;">
                    <a href="mailto:${email}"
                      style="display:inline-block;background:#9c6b4e;color:#ffffff;
                        font-family:'Playfair Display',Georgia,serif;font-size:14px;
                        font-weight:400;letter-spacing:0.06em;text-decoration:none;
                        padding:12px 28px;border-radius:50px;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer: small brand/location line below the card -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-family:'Playfair Display',Georgia,serif;
                font-size:11px;color:#b8a99a;letter-spacing:0.08em;">
                J Eleven Media &nbsp;·&nbsp; Lenoir City, TN
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    // Resend can return a 200 response that still contains an `error` field
    // (e.g. bad "from" domain, rate limit) — so we check this explicitly
    // rather than relying solely on try/catch.
    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    // Success — the frontend uses this to flip the form into its "Message sent!" state.
    return NextResponse.json({ success: true });
  } catch (err) {
    // Catches network failures, JSON parse errors, or anything else unexpected.
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}