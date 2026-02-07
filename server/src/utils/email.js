import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.emailHost,
  port: env.emailPort,
  secure: false,
  auth: {
    user: env.emailUser,
    pass: env.emailPass,
  },
});

export const sendVerificationEmail = async (to, link) => {
  await transporter.sendMail({
    from: env.emailFrom,
    to,
    subject: "Verify your Scooptale account",
    html: `
        <h2>Welcome to Scooptale!</h2>
        <p>Please verify your email to activate your account.</p>
        <a href="${link}" target="_blank">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        `,
  });
};
