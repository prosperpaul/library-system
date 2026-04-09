const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"LibraryOS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request - LibraryOS",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 32px; background: #1a1d27; border-radius: 16px; color: #f0ece4;">
        <h1 style="color: #c8a96e; text-align: center;">LibraryOS</h1>
        <p style="text-align: center; color: #5a5f78;">Password Reset Request</p>
        <p>You requested to reset your password. Click the button below:</p>
        <a href="${resetLink}" style="display: block; text-align: center; margin: 24px auto; padding: 12px 24px; background: #c8a96e; color: #0f1117; border-radius: 10px; text-decoration: none; font-weight: 600; width: fit-content;">
          Reset Password
        </a>
        <p style="color: #5a5f78; font-size: 13px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendPasswordResetEmail };