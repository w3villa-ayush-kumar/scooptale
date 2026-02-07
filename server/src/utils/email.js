import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Email server failed:", error);
  } else {
    console.log("Email server is ready");
  }
});

export const sendVerificationEmail = async (to, link) => {
  try {
    console.log("Sending verification email to:", to);

    const info = await transporter.sendMail({
      from: `Scooptale <${env.emailUser}>`,
      to,
      subject: "Verify your Scooptale account",
      html: `
        <h2>Welcome to Scooptale 🎬</h2>
        <p>Please verify your email to activate your account.</p>

        <a 
          href="${link}" 
          target="_blank"
          style="
            display:inline-block;
            padding:10px 20px;
            background:#22c55e;
            color:black;
            border-radius:6px;
            text-decoration:none;
            font-weight:bold;
          "
        >
          Verify Email
        </a>

        <p>This link expires in 24 hours.</p>
        <p>If you don't see the email, check Spam.</p>
      `,
    });

    console.log("Email sent:", info.messageId);
  } catch (err) {
    console.error("Email failed:", err);
  }
};
