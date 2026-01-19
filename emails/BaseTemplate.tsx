import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface BaseTemplateProps {
  preview: string;
  children: React.ReactNode;
}

// Brand colors - Yellow/Navy Electrician Theme
const colors = {
  primary: '#1E3A8A',      // Navy blue
  primaryLight: '#2563EB',
  accent: '#EAB308',       // Yellow
  accentLight: '#FCD34D',
  background: '#F8FAFC',   // Clean white
  foreground: '#334155',   // Dark slate gray
  muted: '#64748B',
  border: '#E2E8F0',
  white: '#FFFFFF',
};

export const BaseTemplate = ({ preview, children }: BaseTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>
              <span style={{ color: colors.white }}>Vind</span>
              <span style={{ color: colors.accent }}>Elektricien</span>
            </Text>
          </Section>

          {/* Content */}
          <Section style={content}>
            {children}
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} VindElektricien.nl
            </Text>
            <Text style={footerLinks}>
              <Link href="https://www.vindelektricien.nl" style={link}>
                Website
              </Link>
              {' • '}
              <Link href="https://www.vindelektricien.nl/contact" style={link}>
                Contact
              </Link>
              {' • '}
              <Link href="https://www.vindelektricien.nl/privacy" style={link}>
                Privacy
              </Link>
            </Text>
            <Text style={footerDisclaimer}>
              Dit is een automatisch bericht van vindelektricien.nl
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: colors.background,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: colors.white,
  margin: '0 auto',
  padding: '0',
  marginBottom: '64px',
  maxWidth: '600px',
  borderRadius: '12px',
  overflow: 'hidden' as const,
  boxShadow: '0 4px 20px rgba(30, 58, 138, 0.08)',
};

const header = {
  background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
  padding: '32px',
  textAlign: 'center' as const,
};

const logoText = {
  fontSize: '24px',
  fontWeight: '700',
  margin: '0',
  fontFamily: 'Georgia, "Times New Roman", serif',
};

const content = {
  padding: '32px',
};

const footer = {
  padding: '24px 32px',
  borderTop: `1px solid ${colors.border}`,
  backgroundColor: colors.background,
  textAlign: 'center' as const,
};

const footerText = {
  color: colors.muted,
  fontSize: '12px',
  margin: '0 0 8px',
};

const footerLinks = {
  color: colors.muted,
  fontSize: '12px',
  margin: '0 0 16px',
};

const link = {
  color: colors.accent,
  textDecoration: 'none',
};

const footerDisclaimer = {
  color: colors.muted,
  fontSize: '11px',
  margin: '0',
  fontStyle: 'italic' as const,
};

export default BaseTemplate;
