import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import { ContactFormEmail } from '@/emails/ContactFormEmail';
import { ContactConfirmationEmail } from '@/emails/ContactConfirmationEmail';

// Initialize Resend only when API key is available (prevents build errors)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Subject label mapping
const subjectLabels: Record<string, string> = {
  general: 'General inquiry',
  information: 'Add/update information',
  partnership: 'Partnership',
  technical: 'Technical issue',
  other: 'Other',
};

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const subjectLabel = subjectLabels[subject] || subject;

    // Render email templates
    const adminEmailHtml = await render(
      ContactFormEmail({
        name,
        email,
        subject,
        subjectLabel,
        message,
      })
    );

    const confirmationEmailHtml = await render(
      ContactConfirmationEmail({
        name,
        subjectLabel,
        message,
      })
    );

    // Plain text version for better deliverability
    const adminEmailText = `
New contact message via Rehab Near Me

From: ${name}
Email: ${email}
Subject: ${subjectLabel}

Message:
${message}

---
This message was sent via the contact form on rehabnearbyme.com
    `.trim();

    // Check if Resend is configured
    if (!resend) {
      console.warn('Resend API key not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email to site owner with tags
    const { error } = await resend.emails.send({
      from: 'Rehab Near Me <noreply@rehabnearbyme.com>',
      to: ['info@rehabnearbyme.com'],
      replyTo: email,
      subject: `[Contact] ${subjectLabel} - ${name}`,
      html: adminEmailHtml,
      text: adminEmailText,
      headers: {
        'List-Unsubscribe': '<https://www.rehabnearbyme.com/unsubscribe>',
      },
      tags: [
        { name: 'platform', value: 'rehabnearbyme' },
        { name: 'type', value: 'contact-form' },
        { name: 'category', value: subject },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Something went wrong while sending your message' },
        { status: 500 }
      );
    }

    // Plain text confirmation
    const confirmationEmailText = `
Dear ${name},

Thank you for your message. We have received your message and will respond as soon as possible.

Subject: ${subjectLabel}

Your message:
${message}

Best regards,
Rehab Near Me

---
This is an automated confirmation. Do not reply to this email.
https://www.rehabnearbyme.com
    `.trim();

    // Send confirmation email to the sender with tags
    await resend.emails.send({
      from: 'Rehab Near Me <noreply@rehabnearbyme.com>',
      to: [email],
      subject: 'Confirmation: Your message has been received',
      html: confirmationEmailHtml,
      text: confirmationEmailText,
      headers: {
        'List-Unsubscribe': '<https://www.rehabnearbyme.com/unsubscribe>',
      },
      tags: [
        { name: 'platform', value: 'rehabnearbyme' },
        { name: 'type', value: 'contact-confirmation' },
        { name: 'category', value: subject },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while processing your message' },
      { status: 500 }
    );
  }
}
