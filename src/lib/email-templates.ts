//For Welcome Message
export function welcomeTemplate(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome, ${name}! 🎉</h2>
      <p>Your account has been created successfully.</p>
      <p>We're glad to have you on board.</p>
    </div>
  `;
}

//For Contact Form Message
export function contactTemplate({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;
}

//For Email Verification
export function verificationTemplate(name: string, url: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Email Verification</h2>
      <p>Hi ${name},</p>
      <p>Click the button below to verify your email address.</p>
      <a href="${url}" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #000;
        color: #fff;
        text-decoration: none;
        border-radius: 6px;
        margin: 16px 0;
      ">
        Verify Email
      </a>
      <p>If you didn't create an account, ignore this email.</p>
    </div>
  `;
}