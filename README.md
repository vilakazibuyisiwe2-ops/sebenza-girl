# Sebenza Girl

**Services at your fingertips.**

Sebenza Girl is a service-exchange marketplace connecting verified, women-led service providers with clients across South Africa — booked, paid, and released safely through the platform.

Founded by **Buyisiwe Vilakazi**.

---

## About

Sebenza Girl exists to give feminine service workers a safe, professional space to list their work and get paid — and to give clients confidence that the person they're booking is who they say they are. Every account is verified before it can book or list.

## Categories

- Manicure & Salon
- Massage Therapy
- Content Creators
- Catering
- Counselling
- Writing Gigs
- Virtual Gigs

## How it works

1. **Sign up** — client or provider, 18+ only.
2. **Verify** — upload a government ID (and qualification proof, where relevant).
3. **Book & pay in** — the client's payment is held by Sebenza Girl, not sent straight to the provider.
4. **Job done** — both sides confirm completion.
5. **Payment released** — an admin reviews and releases the payout, minus the platform fee.

## Fees & payouts

- **Platform fee:** 15% per transaction.
- **Minimum withdrawal:** R200.
- Payments are currently in ZAR, with USD support planned.

## Tech stack

- Static HTML, CSS, and vanilla JavaScript (no framework/build step required).
- Every page shares `styles.css` and `script.js`.
- No backend yet — forms currently validate and confirm on the front end only. Verification, payments, and payouts need a real backend + payment gateway before launch.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home |
| `services.html` | All categories |
| `manicure.html`, `massage.html`, `content-creators.html`, `catering.html`, `counselling.html`, `writing-gigs.html`, `virtual-gigs.html` | Category pages |
| `register.html` | Sign up (client/provider) |
| `verify-documents.html` | ID/document upload |
| `wallet.html` | Balance, withdrawals, transaction history |
| `admin-dashboard.html` | Verification review, payment release |

## Roadmap

- [ ] Backend + database for accounts, bookings, and documents
- [ ] Payment gateway integration with escrow-style holding
- [ ] Real ID verification workflow
- [ ] `terms.html`, `privacy.html`, `contact.html`
- [ ] Legal review before public launch

## Status

In active development. Not yet live.
