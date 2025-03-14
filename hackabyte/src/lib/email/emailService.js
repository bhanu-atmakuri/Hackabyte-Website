/**
 * Email Service Module
 * 
 * Provides functionality for sending various types of transactional emails
 * including account verification, password resets, and event confirmations.
 */

import nodemailer from 'nodemailer';

// Configuration for nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Sends account verification email
 * @param {string} to - Recipient email address
 * @param {string} name - Recipient name
 * @param {string} token - Verification token
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
export async function sendVerificationEmail(to, name, token) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`;
  
  const mailOptions = {
    from: `"Hackabyte" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verify Your Hackabyte Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #FF2247; text-align: center;">Welcome to Hackabyte!</h1>
        <p>Hello ${name},</p>
        <p>Thank you for creating an account with Hackabyte! Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #FF2247; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email Address</a>
        </div>
        <p>If you didn't create this account, you can safely ignore this email.</p>
        <p>Best regards,<br>The Hackabyte Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

/**
 * Sends password reset email
 * @param {string} to - Recipient email address
 * @param {string} name - Recipient name
 * @param {string} token - Password reset token
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
export async function sendPasswordResetEmail(to, name, token) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  
  const mailOptions = {
    from: `"Hackabyte" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset Your Hackabyte Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #FF2247; text-align: center;">Reset Your Password</h1>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. Click the button below to choose a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #FF2247; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>Best regards,<br>The Hackabyte Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
}

/**
 * Sends event registration confirmation email
 * @param {string} to - Recipient email address
 * @param {string} name - Recipient name
 * @param {Object} eventDetails - Details about the event
 * @param {Object} registrationDetails - Details about the registration
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
export async function sendEventRegistrationEmail(to, name, eventDetails, registrationDetails) {
  const mailOptions = {
    from: `"Hackabyte" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Registration Confirmed: ${eventDetails.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h1 style="color: #FF2247; text-align: center;">Registration Confirmed!</h1>
        <p>Hello ${name},</p>
        <p>Thank you for registering for ${eventDetails.title}! Your registration has been confirmed.</p>
        
        <div style="background-color: #f8f8f8; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <h2 style="color: #FF2247; margin-top: 0;">Event Details</h2>
          <p><strong>Event:</strong> ${eventDetails.title}</p>
          <p><strong>Date:</strong> ${eventDetails.date}</p>
          <p><strong>Location:</strong> ${eventDetails.location}</p>
        </div>
        
        <div style="background-color: #f8f8f8; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <h2 style="color: #FF2247; margin-top: 0;">Registration Details</h2>
          <p><strong>Team Preference:</strong> ${registrationDetails.teamPreference}</p>
          ${registrationDetails.teamName ? `<p><strong>Team Name:</strong> ${registrationDetails.teamName}</p>` : ''}
          ${registrationDetails.teamMembers ? `<p><strong>Team Members:</strong> ${registrationDetails.teamMembers}</p>` : ''}
          ${registrationDetails.dietaryRestrictions ? `<p><strong>Dietary Restrictions:</strong> ${registrationDetails.dietaryRestrictions}</p>` : ''}
        </div>
        
        <p>We look forward to seeing you at the event! If you have any questions, please contact us at teamhackabyte@gmail.com.</p>
        <p>Best regards,<br>The Hackabyte Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending event registration email:', error);
    return false;
  }
}
