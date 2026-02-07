import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
  family: 4,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Brevo Connection Error:", error);
  } else {
    console.log("Email server is ready to send via Brevo");
  }
});

export const sendVerificationEmail = async (to, link) => {
  try {
    console.log("Sending verification email to:", to);

    const info = await transporter.sendMail({
      from: `"Scooptale" <ayush.kumar@w3villa.com>`,
      to,
      subject: "Verify your Scooptale account",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>Welcome to Scooptale 🎬</h2>
          <p>Please verify your email to activate your account.</p>
          <a 
            href="${link}" 
            style="
              display:inline-block;
              padding:12px 24px;
              background:#22c55e;
              color:white;
              border-radius:6px;
              text-decoration:none;
              font-weight:bold;
            "
          >
            Verify Email
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            This link expires in 24 hours. If you didn't request this, ignore this email.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (err) {
    console.error("Email delivery failed:", err);
  }
};
