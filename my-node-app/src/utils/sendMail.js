// src/utils/sendMail.js
const nodemailer = require("nodemailer");

function canSendMail() {
  const host = String(process.env.SMTP_HOST || "").trim().toLowerCase();
  const user = String(process.env.SMTP_USER || "").trim();
  const pass = String(process.env.SMTP_PASS || "").trim();

  if (!host || host === "smtp.example.com" || host.endsWith(".example.com")) {
    return false;
  }

  return Boolean(host && user && pass);
}

function getTransport() {
  if (!canSendMail()) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true", // true nếu 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendMail({ to, subject, text, html }) {
  const transport = getTransport();

  if (!transport) {
    const err = new Error("SMTP chưa được cấu hình đúng trong file .env");
    err.status = 400;
    throw err;
  }

  await transport.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    text,
    html,
  });

  return true;
}

module.exports = { sendMail, canSendMail };