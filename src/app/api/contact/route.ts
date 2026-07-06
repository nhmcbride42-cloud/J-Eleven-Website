import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const result = await resend.emails.send({
      from: "J Eleven Media <jelevenmedia@gmail.com>",
      to: "nhmcbride42@gmail.com",
      subject: `New inquiry from ${name}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Form Submission</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f0ece4;font-family:'Playfair Display',Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#f0ece4;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
          style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:0 0 24px 0;">
              <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:11px;
                letter-spacing:0.18em;text-transform:uppercase;color:#9c6b4e;font-weight:400;">
                J Eleven Media
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border-radius:16px;overflow:hidden;">
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
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
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

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
