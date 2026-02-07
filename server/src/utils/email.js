import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (to, link) => {
  await resend.emails.send({
    from: "Scooptale <onboarding@resend.dev>",
    to,
    subject: "Verify your Scooptale account",
    html: `
      <h2>Welcome to Scooptale!</h2>
      <p>Please verify your email to activate your account.</p>
      <a href="${link}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `,
  });
};
