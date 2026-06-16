import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MARBLE_EMAIL = "ziyansolkar@gmail.com";
const TRADING_EMAIL = "zizousolkar@gmail.com";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, number, email, organizationName, organizationDesignation, enquiryType, message } = body;

    if (!name || !number || !email || !enquiryType || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const toEmail = enquiryType === "Marble" ? MARBLE_EMAIL : TRADING_EMAIL;

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"UMS Website" <${process.env.SMTP_USER || "noreply@unitedmodernstone.com"}>`,
      to: toEmail,
      subject: `New ${enquiryType} Enquiry from ${name}`,
      html: `
        <h2>New ${enquiryType} Enquiry</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Number</td><td style="padding:8px;border:1px solid #ddd;">${number}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
          ${organizationName ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Organization</td><td style="padding:8px;border:1px solid #ddd;">${organizationName}</td></tr>` : ""}
          ${organizationDesignation ? `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Designation</td><td style="padding:8px;border:1px solid #ddd;">${organizationDesignation}</td></tr>` : ""}
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Enquiry Type</td><td style="padding:8px;border:1px solid #ddd;">${enquiryType}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Message</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;">${message}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
