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

// Brand colors - Yellow/Navy Electrician Theme
const colors = {
  primary: '#1E3A8A',
  primaryLight: '#2563EB',
  accent: '#EAB308',
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
    <BaseTemplate preview="Bedankt voor uw bericht - VindElektricien.nl">
      <Heading style={heading}>Bedankt voor uw bericht!</Heading>

      <Text style={greeting}>Beste {name},</Text>

      <Text style={paragraph}>
        Wij hebben uw bericht ontvangen. Ons team zal uw aanvraag bekijken en
        streeft ernaar binnen <strong>1-2 werkdagen</strong> te reageren.
      </Text>

      <Section style={summaryBox}>
        <Text style={summaryTitle}>Samenvatting van uw bericht</Text>

        <Text style={summaryLabel}>Onderwerp</Text>
        <Text style={summaryValue}>{subjectLabel}</Text>

        <Hr style={divider} />

        <Text style={summaryLabel}>Uw bericht</Text>
        <Text style={summaryMessage}>{message}</Text>
      </Section>

      <Hr style={hr} />

      <Text style={paragraph}>
        Heeft u in de tussentijd vragen? Bezoek onze website voor meer informatie
        over elektriciens in Nederland.
      </Text>

      <Text style={signature}>
        Met vriendelijke groet,
        <br />
        <strong>Team VindElektricien.nl</strong>
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
