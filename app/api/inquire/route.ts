import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, course } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Save to MongoDB
    const result = await db.collection("inquiries").insertOne({
      name,
      email,
      phone: phone || "",
      message,
      course: course || "General Inquiry",
      read: false,
      createdAt: new Date().toISOString(),
    });

    // Send Confirmation Email to User
    try {
      await resend.emails.send({
        from: "Exceed Learning Center <programs@swe-rech.site>",
        to: email,
        subject: "Inquiry Confirmation - Exceed Learning Center",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank you for your inquiry</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; color: #333333;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7f6; padding: 40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #0e1f3e; padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: 1px; font-weight: 800;">Exceed Learning Center</h1>
                        <p style="margin: 10px 0 0; color: #a1b0cc; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Public Speaking Programs</p>
                      </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h2 style="margin: 0 0 20px; color: #0e1f3e; font-size: 24px;">Thank you for reaching out, ${name}!</h2>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #555555;">
                          We are absolutely thrilled that you're interested in <strong>${course || "our programs"}</strong>. Your journey toward masterful communication and an undeniable executive presence begins here.
                        </p>
                        <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #555555;">
                          Our team has received your message and will review it right away. We'll be in touch shortly to answer any questions and guide you through the next steps for enrollment.
                        </p>
                        
                        <div style="background-color: #f9fafb; border-left: 4px solid #ca3433; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                          <p style="margin: 0 0 8px; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Your Message Summary</p>
                          <p style="margin: 0; font-size: 15px; font-style: italic; color: #444444; line-height: 1.5;">"${message}"</p>
                        </div>

                        <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #555555;">
                          Warm regards,<br>
                          <strong style="color: #0e1f3e;">The Exceed Learning Center Team</strong>
                        </p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f9fafb; padding: 25px 30px; text-align: center; border-top: 1px solid #eeeeee;">
                        <p style="margin: 0 0 10px; font-size: 14px; color: #888888;">
                          Questions? Call us directly at <a href="tel:+15162263114" style="color: #ca3433; text-decoration: none; font-weight: bold;">+1 (516) 226-3114</a>
                        </p>
                        <p style="margin: 0; font-size: 12px; color: #aaaaaa;">
                          &copy; ${new Date().getFullYear()} Exceed Learning Center. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }

    // Send Notification Email to Admin
    try {
      await resend.emails.send({
        from: "Inquiry System <programs@swe-rech.site>",
        to: "phcodesage@gmail.com", // Updated admin email for testing
        subject: `New Inquiry from ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Inquiry Received</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; color: #333333;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7f6; padding: 40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #ca3433; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 0.5px;">New Website Inquiry</h1>
                      </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #555555;">
                          A new prospect has submitted an inquiry on the Exceed Learning Center website.
                        </p>
                        
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #eeeeee; border-radius: 8px;">
                          <tr>
                            <td style="padding: 20px;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="120" style="padding: 10px 0; font-weight: bold; color: #0e1f3e; font-size: 14px; border-bottom: 1px solid #eeeeee;">Name:</td>
                                  <td style="padding: 10px 0; color: #333333; font-size: 15px; border-bottom: 1px solid #eeeeee;">${name}</td>
                                </tr>
                                <tr>
                                  <td width="120" style="padding: 10px 0; font-weight: bold; color: #0e1f3e; font-size: 14px; border-bottom: 1px solid #eeeeee;">Email:</td>
                                  <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
                                    <a href="mailto:${email}" style="color: #ca3433; text-decoration: none; font-weight: 500;">${email}</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="120" style="padding: 10px 0; font-weight: bold; color: #0e1f3e; font-size: 14px; border-bottom: 1px solid #eeeeee;">Phone:</td>
                                  <td style="padding: 10px 0; color: #333333; font-size: 15px; border-bottom: 1px solid #eeeeee;">
                                    ${phone ? `<a href="tel:${phone}" style="color: #0e1f3e; text-decoration: none;">${phone}</a>` : `<span style="color: #aaaaaa; font-style: italic;">Not provided</span>`}
                                  </td>
                                </tr>
                                <tr>
                                  <td width="120" style="padding: 10px 0; font-weight: bold; color: #0e1f3e; font-size: 14px;">Course:</td>
                                  <td style="padding: 10px 0;">
                                    <span style="background-color: #0e1f3e; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold;">
                                      ${course || "General Inquiry"}
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <h3 style="margin: 30px 0 15px; color: #0e1f3e; font-size: 18px;">Message:</h3>
                        <div style="background-color: #f9fafb; border: 1px solid #eeeeee; padding: 20px; border-radius: 8px; font-size: 15px; line-height: 1.6; color: #444444; white-space: pre-wrap;">${message}</div>

                        <div style="text-align: center; margin-top: 40px;">
                          <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/inquiries" style="display: inline-block; background-color: #0e1f3e; color: #ffffff; text-decoration: none; font-weight: bold; padding: 14px 35px; border-radius: 30px; font-size: 16px; box-shadow: 0 4px 10px rgba(14,31,62,0.2);">View in Dashboard</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
      });
    } catch (adminEmailError) {
      console.error("Error sending admin notification email:", adminEmailError);
    }

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Inquiry error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
