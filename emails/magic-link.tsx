// File: emails/magic-link.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Heading,
} from "@react-email/components";
import * as React from "react";

interface MagicLinkEmailProps {
  url: string;
}

export const MagicLinkEmail = ({ url }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Your sign-in link for Your App</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Sign in to Your App</Heading>
        <Text style={paragraph}>
          Welcome! Click the button below to sign in to your account.
        </Text>
        <Button style={button} href={url}>
          Sign In Securely
        </Button>
        <Text style={paragraph}>
          This link is valid for 10 minutes. If you didn't request this email, you can safely ignore it.
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles for the email
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "8px",
  border: "1px solid #eaeaea",
};

const heading = {
    fontSize: "24px",
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    color: "#333",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "center" as const,
  padding: "0 20px",
  color: "#555",
};

const button = {
  backgroundColor: "#5E50EE",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "200px",
  padding: "14px",
  margin: "24px auto",
};