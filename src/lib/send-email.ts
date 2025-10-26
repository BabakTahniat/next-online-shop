import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationTokenEmail(token: string, email: string) {
    resend.emails.send({
        from: 'no-reply@resend.dev',
        to: email,
        subject: 'Verify your email',
        html: `<h2>Welcome!</h2>
      <p>Click below to verify your email:</p>
      <a href="http://localhost:3000/verify-email?token=${token}">Verify Email</a>
      <p>If you didn’t create an account, ignore this message.</p>`,
    });
    console.log(`Verification token ${token} sent to ${email}`);
}
