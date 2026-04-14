import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Course schedule names for display
const COURSE_SCHEDULES: Record<string, string> = {
  "level-1-regular": "Level 1 - Regular Course ($439)",
  "level-2-regular": "Level 2 - Regular Course ($439)",
  "level-3-regular": "Level 3 - Regular Course ($439)",
  "level-1-crash": "Level 1 - Crash Course ($139)",
  "level-2-crash": "Level 2 - Crash Course ($139)",
  "level-3-crash": "Level 3 - Crash Course ($139)",
  "bundle": "All 3 Levels Bundle ($1,200)",
};

function getCourseName(scheduleId: string): string {
  return COURSE_SCHEDULES[scheduleId] || scheduleId;
}

export async function POST(request: Request) {
  try {
    const { name, email, phone, schedule } = await request.json();

    if (!name || !email || !phone || !schedule) {
      return NextResponse.json(
        { error: "Name, email, phone, and schedule are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Save to MongoDB
    const result = await db.collection("registrations").insertOne({
      name,
      email,
      phone,
      schedule,
      courseName: getCourseName(schedule),
      paymentStatus: "pending", // since they are about to be redirected to Stripe
      createdAt: new Date().toISOString(),
    });

    // Send Confirmation Email to User
    try {
      await resend.emails.send({
        from: "Exceed Learning Center <programs@swe-rech.site>",
        to: email,
        subject: "Registration Confirmation - Exceed Learning Center",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Confirmation</title>
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
                        <h2 style="margin: 0 0 20px; color: #0e1f3e; font-size: 24px;">Thank you for registering, ${name}!</h2>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #555555;">
                          We are thrilled that you've chosen to enroll in our <strong>Public Speaking Program</strong>. Your journey toward masterful communication and executive presence begins here.
                        </p>
                        <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #555555;">
                          Your registration has been received. Please complete your payment to finalize your enrollment.
                        </p>
                        
                        <div style="background-color: #f9fafb; border-left: 4px solid #ca3433; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                          <p style="margin: 0 0 8px; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Registration Details</p>
                          <p style="margin: 0 0 5px; font-size: 15px; color: #444444;"><strong>Course:</strong> ${getCourseName(schedule)}</p>
                          <p style="margin: 0 0 5px; font-size: 15px; color: #444444;"><strong>Name:</strong> ${name}</p>
                          <p style="margin: 0 0 5px; font-size: 15px; color: #444444;"><strong>Email:</strong> ${email}</p>
                          <p style="margin: 0; font-size: 15px; color: #444444;"><strong>Phone:</strong> ${phone}</p>
                        </div>

                        <div style="background-color: #fffbeb; border: 1px solid #fde68a; padding: 20px; margin: 30px 0; border-radius: 8px;">
                          <p style="margin: 0 0 10px; font-size: 14px; color: #92400e; font-weight: bold;">⏭️ Next Steps</p>
                          <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                            Please complete your payment to secure your spot. If you have any questions, feel free to contact us.
                          </p>
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
        from: "Registration System <programs@swe-rech.site>",
        to: ["info@exceedlearningcenterny.com", "olga@exceedlearningcenterny.com"],
        subject: `New Public Speaking Registration - ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Registration Received</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; color: #333333;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f7f6; padding: 40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                      <td style="background-color: #ca3433; padding: 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 0.5px;">New Public Speaking Registration</h1>
                      </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 25px; font-size: 16px; line-height: 1.6; color: #555555;">
                          A new student has registered for the Public Speaking Program on the Exceed Learning Center website.
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
                                    <a href="tel:${phone}" style="color: #0e1f3e; text-decoration: none;">${phone}</a>
                                  </td>
                                </tr>
                                <tr>
                                  <td width="120" style="padding: 10px 0; font-weight: bold; color: #0e1f3e; font-size: 14px;">Course:</td>
                                  <td style="padding: 10px 0;">
                                    <span style="background-color: #0e1f3e; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: bold;">
                                      ${getCourseName(schedule)}
                                    </span>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <div style="text-align: center; margin-top: 40px;">
                          <a href="${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/registrations" style="display: inline-block; background-color: #0e1f3e; color: #ffffff; text-decoration: none; font-weight: bold; padding: 14px 35px; border-radius: 30px; font-size: 16px; box-shadow: 0 4px 10px rgba(14,31,62,0.2);">View in Dashboard</a>
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
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}
