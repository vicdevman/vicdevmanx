import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email template for admin notification
const getAdminEmailTemplate = (name: string, email: string, message: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <style>
    /* Modern light mode email template - Full width responsive design */
    /* Force light mode - prevent dark mode color overrides */
    :root {
      color-scheme: light only;
      supported-color-schemes: light;
    }
    
    /* Prevent email clients from changing colors in dark mode */
    @media (prefers-color-scheme: dark) {
      body, table, td, div, p, span, a, h1, h2, h3, h4, h5, h6 {
        color-scheme: light only !important;
      }
      .light-only {
        background-color: #ffffff !important;
        color: #0f172a !important;
      }
      .bg-light {
        background-color: #f8fafc !important;
      }
      .text-dark {
        color: #0f172a !important;
      }
      .text-slate {
        color: #64748b !important;
      }
      .text-blue {
        color: #3b82f6 !important;
      }
      .text-purple {
        color: #8b5cf6 !important;
      }
    }
    
    @media only screen and (max-width: 600px) {
      .mobile-padding { padding: 24px !important; }
      .mobile-text { font-size: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 0; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 100%; background: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
          
          <!-- Accent Bar -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);"></td>
          </tr>
          
          <!-- Header -->
          <tr>
            <td class="mobile-padding" style="padding: 56px 64px 40px; background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 10px 20px; background: #dbeafe; border-radius: 24px; margin-bottom: 20px; border: 1px solid #bfdbfe;">
                      <span style="color: #1e40af; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">📬 New Message</span>
                    </div>
                    <h1 class="mobile-text" style="margin: 0; color: #0f172a; font-size: 36px; font-weight: 800; letter-spacing: -1px; line-height: 1.2;">Contact Form Submission</h1>
                    <p style="margin: 16px 0 0; color: #64748b; font-size: 16px; line-height: 1.6; font-weight: 500;">Someone reached out through your portfolio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding: 48px 64px;">
              
              <!-- Sender Info Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 36px;">
                <tr>
                  <td style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <p style="margin: 0 0 4px; color: #3b82f6; font-size: 12px; text-transform: uppercase; letter-spacing: 1.8px; font-weight: 800;">Sender Details</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0; color: #0f172a; font-size: 22px; font-weight: 700; line-height: 1.3;">${name}</p>
                          <a href="mailto:${email}" style="margin: 10px 0 0; color: #8b5cf6; font-size: 16px; text-decoration: none; display: inline-block; font-weight: 600; transition: color 0.2s;">
                            ${email}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Message Card -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 20px; color: #3b82f6; font-size: 12px; text-transform: uppercase; letter-spacing: 1.8px; font-weight: 800;">Message Content</p>
                    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%); border-left: 5px solid #3b82f6; padding: 32px; border-radius: 16px; border: 2px solid #e0e7ff; border-left: 5px solid #3b82f6;">
                      <p style="margin: 0; color: #1e293b; font-size: 17px; line-height: 1.8; white-space: pre-wrap; font-weight: 500;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- Quick Actions -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 40px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-size: 16px; font-weight: 700; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4); transition: transform 0.2s;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 64px; background: #f8fafc; border-top: 2px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 10px; color: #64748b; font-size: 14px; line-height: 1.6; font-weight: 500;">
                      Sent from your portfolio contact form
                    </p>
                    <p style="margin: 0; color: #94a3b8; font-size: 13px; font-weight: 500;">
                      © 2025 Victor Adeiza. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Email template for user confirmation
const getUserEmailTemplate = (name: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Message Received</title>
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light">
  <style>
    /* Modern light mode email template - Full width responsive design */
    /* Force light mode - prevent dark mode color overrides */
    :root {
      color-scheme: light only;
      supported-color-schemes: light;
    }
    
    /* Prevent email clients from changing colors in dark mode */
    @media (prefers-color-scheme: dark) {
      body, table, td, div, p, span, a, h1, h2, h3, h4, h5, h6 {
        color-scheme: light only !important;
      }
      .light-only {
        background-color: #ffffff !important;
        color: #0f172a !important;
      }
      .bg-light {
        background-color: #f8fafc !important;
      }
      .text-dark {
        color: #0f172a !important;
      }
      .text-slate {
        color: #64748b !important;
      }
      .text-blue {
        color: #3b82f6 !important;
      }
      .text-purple {
        color: #8b5cf6 !important;
      }
    }
    
    @media only screen and (max-width: 600px) {
      .mobile-padding { padding: 24px !important; }
      .mobile-text { font-size: 26px !important; }
      .mobile-icon { width: 60px !important; height: 60px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 0; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 100%; background: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);">
          
          <!-- Accent Bar -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);"></td>
          </tr>
          
          <!-- Header -->
          <tr>
            <td class="mobile-padding" style="padding: 56px 64px 40px; background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%); text-align: center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <!-- Success Icon -->
                    <div class="mobile-icon" style="width: 80px; height: 80px; margin: 0 auto 28px; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h1 class="mobile-text" style="margin: 0; color: #0f172a; font-size: 34px; font-weight: 800; letter-spacing: -1px; line-height: 1.2;">Message Received!</h1>
                    <p style="margin: 18px 0 0; color: #64748b; font-size: 17px; line-height: 1.6; font-weight: 500;">Thanks for reaching out. I'll be in touch soon.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="mobile-padding" style="padding: 48px 64px;">
              <p style="margin: 0 0 24px; color: #1e293b; font-size: 18px; line-height: 1.5; font-weight: 500;">Hi <strong style="color: #8b5cf6;">${name}</strong>,</p>
              
              <p style="margin: 0 0 24px; color: #475569; font-size: 16px; line-height: 1.8; font-weight: 500;">
                I've successfully received your message and truly appreciate you taking the time to reach out. I make it a priority to respond to all inquiries within <strong style="color: #3b82f6;">24-48 hours</strong>.
              </p>
              
              <p style="margin: 0 0 36px; color: #475569; font-size: 16px; line-height: 1.8; font-weight: 500;">
                In the meantime, feel free to explore my latest projects or connect with me on social media.
              </p>
              
              <!-- Info Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 40px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%); border: 2px solid #e0e7ff; border-radius: 16px; padding: 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align: top;">
                          <p style="margin: 0 0 10px; color: #1e40af; font-size: 16px; font-weight: 700; letter-spacing: -0.3px;">What happens next?</p>
                          <p style="margin: 0; color: #475569; font-size: 15px; line-height: 1.7; font-weight: 500;">I'll review your message and get back to you with a detailed response. For urgent matters, feel free to reach out via social media.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Social Links -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-top: 12px;">
                    <p style="margin: 0 0 24px; color: #3b82f6; font-size: 13px; text-transform: uppercase; letter-spacing: 1.8px; font-weight: 800;">Connect With Me</p>
                    <table cellpadding="0" cellspacing="0" style="display: inline-table;">
                      <tr>
                        <td style="padding: 0 12px;">
                          <a href="https://x.com/vicdevmanx" style="display: inline-block; width: 52px; height: 52px; background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%); border: 2px solid #e0e7ff; border-radius: 14px; text-align: center; line-height: 52px; text-decoration: none; transition: all 0.2s;">
                            <span style="color: #8b5cf6; font-size: 22px; font-weight: 700;">𝕏</span>
                          </a>
                        </td>
                        <td style="padding: 0 12px;">
                          <a href="https://linkedin.com/in/victor-adeiza" style="display: inline-block; width: 52px; height: 52px; background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%); border: 2px solid #e0e7ff; border-radius: 14px; text-align: center; line-height: 52px; text-decoration: none; transition: all 0.2s;">
                            <span style="color: #3b82f6; font-size: 22px; font-weight: 700;">in</span>
                          </a>
                        </td>
                        <td style="padding: 0 12px;">
                          <a href="https://github.com/vicdevmanx" style="display: inline-block; width: 52px; height: 52px; background: linear-gradient(135deg, #f0f9ff 0%, #faf5ff 100%); border: 2px solid #e0e7ff; border-radius: 14px; text-align: center; line-height: 52px; text-decoration: none; transition: all 0.2s;">
                            <span style="color: #6366f1; font-size: 22px; font-weight: 700;">GH</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td class="mobile-padding" style="padding: 40px 64px; background: #f8fafc; border-top: 2px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 14px; color: #0f172a; font-size: 18px; font-weight: 700; letter-spacing: -0.3px;">Victor Adeiza</p>
              <p style="margin: 0 0 18px; color: #3b82f6; font-size: 15px; font-weight: 600;">Full-Stack AI Engineer</p>
              <p style="margin: 0; color: #94a3b8; font-size: 13px; font-weight: 500;">
                © 2025 Victor Adeiza. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email to admin
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      html: getAdminEmailTemplate(name, email, message),
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Victor Adeiza" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Thanks for reaching out!',
      html: getUserEmailTemplate(name),
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
