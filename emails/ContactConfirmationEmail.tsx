import {
  Heading,
  Hr,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { BaseTemplate } from './BaseTemplate';

interface ContactConfirmationEmailProps {
  name: string;
  subjectLabel: string;
  message: string;
}

// Brand colors - Teal/Coral Healing Theme
const colors = {
  primary: '#0D9488',
  primaryLight: '#14B8A6',
  accent: '#F97316',
  background: '#F8FAFC',
  foreground: '#334155',
  muted: '#64748B',
  border: '#E2E8F0',
};

export const ContactConfirmationEmail = ({
  name,
  subjectLabel,
  message,
}: ContactConfirmationEmailProps) => {
  return (
    <BaseTemplate preview="Thank you for your message - RehabNearMe">
      <Heading style={heading}>Thank you for your message!</Heading>

      <Text style={greeting}>Dear {name},</Text>

      <Text style={paragraph}>
        We have received your message. Our team will review your inquiry and
        aims to respond within <strong>1-2 business days</strong>.
      </Text>

      <Section style={summaryBox}>
        <Text style={summaryTitle}>Summary of your message</Text>

        <Text style={summaryLabel}>Subject</Text>
        <Text style={summaryValue}>{subjectLabel}</Text>

        <Hr style={divider} />

        <Text style={summaryLabel}>Your message</Text>
        <Text style={summaryMessage}>{message}</Text>
      </Section>

      <Hr style={hr} />

      <Text style={paragraph}>
        Have any questions in the meantime? Visit our website for more information
        about treatment centers in the USA.
      </Text>

      <Text style={signature}>
        Best regards,
        <br />
        <strong>Team RehabNearMe</strong>
      </Text>
    </BaseTemplate>
  );
};

// Styles
const heading = {
  color: colors.foreground,
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px',
  fontFamily: 'Georgia, "Times New Roman", serif',
};

const greeting = {
  color: colors.foreground,
  fontSize: '16px',
  margin: '0 0 16px',
};

const paragraph = {
  color: colors.muted,
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 24px',
};

const summaryBox = {
  backgroundColor: colors.background,
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  padding: '20px',
  margin: '0 0 24px',
};

const summaryTitle = {
  color: colors.primary,
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 16px',
};

const summaryLabel = {
  color: colors.accent,
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px',
};

const summaryValue = {
  color: colors.foreground,
  fontSize: '14px',
  margin: '0 0 12px',
};

const summaryMessage = {
  color: colors.foreground,
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const divider = {
  borderColor: colors.border,
  margin: '12px 0',
};

const hr = {
  borderColor: colors.border,
  margin: '24px 0',
};

const signature = {
  color: colors.muted,
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};

export default ContactConfirmationEmail;
