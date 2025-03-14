import sgMail from '@sendgrid/mail';

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  const msg = {
    to,
    from: {
      email: process.env.EMAIL_FROM,
      name: 'Hackabyte',
    },
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};

export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to Hackabyte!';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${process.env.NEXTAUTH_URL}/logo.png" alt="Hackabyte Logo" style="max-width: 150px;" />
      </div>
      <h1 style="color: #FF2247; text-align: center;">Welcome to Hackabyte, ${user.name}!</h1>
      <p>Thank you for creating an account. You're now ready to register for our upcoming events!</p>
      <p>Visit our <a href="${process.env.NEXTAUTH_URL}/events" style="color: #FF2247; text-decoration: none; font-weight: bold;">events page</a> to see what's coming up.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p style="margin: 0; font-size: 14px;">If you have any questions, feel free to contact us at <a href="mailto:teamhackabyte@gmail.com" style="color: #FF2247;">teamhackabyte@gmail.com</a></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject,
    html,
  });
};

export const sendEventRegistrationEmail = async (user, event) => {
  const subject = `Registration Confirmed: ${event.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${process.env.NEXTAUTH_URL}/logo.png" alt="Hackabyte Logo" style="max-width: 150px;" />
      </div>
      <h1 style="color: #FF2247; text-align: center;">You're registered for ${event.name}!</h1>
      <p>Hi ${user.name},</p>
      <p>Your registration for ${event.name} has been confirmed. The event will take place at ${event.location} from ${new Date(event.startDate).toLocaleDateString()} to ${new Date(event.endDate).toLocaleDateString()}.</p>
      <p>Join our Discord server for updates: <a href="${event.discordLink}" style="color: #FF2247; text-decoration: none; font-weight: bold;">${event.discordLink}</a></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p style="margin: 0; font-size: 14px;">If you have any questions, feel free to contact us at <a href="mailto:teamhackabyte@gmail.com" style="color: #FF2247;">teamhackabyte@gmail.com</a></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject,
    html,
  });
};

export const sendPasswordResetEmail = async (user, resetUrl) => {
  const subject = 'Password Reset - Hackabyte';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${process.env.NEXTAUTH_URL}/logo.png" alt="Hackabyte Logo" style="max-width: 150px;" />
      </div>
      <h1 style="color: #FF2247; text-align: center;">Password Reset Request</h1>
      <p>Hi ${user.name},</p>
      <p>You requested a password reset. Please click the link below to set a new password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #FF2247; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
      </div>
      <p>This link is valid for 1 hour. If you didn't request this, please ignore this email.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p style="margin: 0; font-size: 14px;">If you have any questions, feel free to contact us at <a href="mailto:teamhackabyte@gmail.com" style="color: #FF2247;">teamhackabyte@gmail.com</a></p>
      </div>
    </div>
  `;

  return sendEmail({
    to: user.email,
    subject,
    html,
  });
};
