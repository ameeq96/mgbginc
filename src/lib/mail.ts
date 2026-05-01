import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

type MailInput = {
  subject: string;
  html: string;
};

export async function sendAdminNotification({ subject, html }: MailInput) {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "site" } }).catch(() => null);
  const to = settings?.contactEmail || process.env.ADMIN_NOTIFY_EMAIL || process.env.ADMIN_EMAIL;
  if (!to) return;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.info(`[email skipped] ${subject} -> ${to}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: { user, pass }
  });

  await transporter.sendMail({
    to,
    from: process.env.SMTP_FROM || "MGBG Inc. <no-reply@mgbginc.ca>",
    subject,
    html
  });
}
