import { createServerFn } from "@tanstack/react-start";

export const sendEmailFn = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; message: string }) => data)
  .handler(async ({ data }) => {
    const nodemailer = await import("nodemailer");

    const host = process.env.BREVO_SMTP_HOST || "smtp-relay.brevo.com";
    const port = parseInt(process.env.BREVO_SMTP_PORT || "587");
    const user = process.env.BREVO_SMTP_USER;
    const pass = process.env.BREVO_SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || "ankitkr5609@gmail.com";

    if (!user || !pass) {
      throw new Error("SMTP credentials are not configured.");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"${data.name}" <${user}>`,
      to: receiver,
      replyTo: data.email,
      subject: `Portfolio Contact Form: ${data.name}`,
      text: `You received a new message from your portfolio contact form:\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
      html: `
        <h3>New Message from Portfolio Contact Form</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${data.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  });
