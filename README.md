# Morrow Café Campaign

A mobile-first campaign landing page for Morrow Café,
Sector 104, Noida.

## Live Demo

YOUR_DEPLOYED_URL

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## Features

- Mobile-first responsive design
- ₹150 offer claim flow
- Client-side validation
- Loading state
- Error state
- Success state
- Claim-code generation
- Copy-to-clipboard
- Keyboard accessible form
- Reduced-motion support

## API

This project currently uses a mock API on the frontend for demo purposes. The claim flow is simulated in the client and does not represent a production backend contract.

Example mock endpoint:

POST /api/claim

Request:

{
  "name": "Rahul Sharma",
  "phone": "9876543210"
}

Mock response:

{
  "success": true,
  "claimCode": "MORROW-7F2K",
  "message": "Your offer has been claimed."
}

In production, this should be replaced by a real server-side API with validation, duplicate-claim protection, rate limiting, and secure persistence.

## Product Decisions

### Above the fold

I prioritized the offer, café identity, value proposition,
and claim form because the primary goal is to communicate
the campaign and allow the user to claim it without
unnecessary navigation or scrolling.

### Production Concerns

#### Duplicate Claims

The backend should associate claims with a normalized
phone number and campaign ID and enforce the campaign's
claim policy server-side.

#### Spam / Abuse

Production requests should use server-side rate limiting,
request validation and appropriate abuse detection.

#### API Failures

The client should show a clear retryable error state.
Production infrastructure should also monitor API failures
and latency.

## Performance

Images were optimized and served in appropriate dimensions.
The page avoids unnecessary dependencies and client-side
JavaScript.

## Accessibility

The form uses semantic labels, visible focus states,
ARIA error associations, live status messaging and
reduced-motion support.