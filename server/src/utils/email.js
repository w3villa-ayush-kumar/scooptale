import axios from "axios";
import { env } from "../config/env.js";

export const sendVerificationEmail = async (to, link) => {
  try {
    console.log("Attempting to send email via Brevo API...");

    const data = {
      sender: { name: "Scooptale", email: "ayush.kumar@w3villa.com" },
      to: [{ email: to }],
      subject: "Verify your Scooptale account",
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h2>Welcome to Scooptale 🎬</h2>
          <p>Please verify your email to activate your account.</p>
          <a 
            href="${link}" 
            style="display:inline-block; padding:12px 24px; background:#22c55e; color:white; border-radius:6px; text-decoration:none; font-weight:bold;"
          >
            Verify Email
          </a>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">This link expires in 24 hours.</p>
        </div>
      `,
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      data,
      {
        headers: {
          "api-key": env.emailPass,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    console.log(
      "Email sent successfully via API! ID:",
      response.data.messageId,
    );
  } catch (err) {
    console.error("API Email failed:", err.response?.data || err.message);
  }
};
