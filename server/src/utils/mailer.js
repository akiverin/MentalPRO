import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendConfirmationEmail(user) {
  const url = `${process.env.FRONTEND_URL}/api/auth/confirm-email?token=${user.emailConfirmToken}`;
  await transporter.sendMail({
    from: `"MentalPRO" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Подтверждение E-mail",
    html: `<p>Здравствуйте, ${user.firstName}!</p>
           <p>Пожалуйста, подтвердите свою почту, перейдя по ссылке:</p>
           <a href="${url}">${url}</a>`,
  });
}
