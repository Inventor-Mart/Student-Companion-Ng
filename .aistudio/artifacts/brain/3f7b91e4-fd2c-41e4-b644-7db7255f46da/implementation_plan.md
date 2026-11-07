# Universal Nigerian Naira (₦) Currency Display & Cross-Platform Font Fallback

Standardize currency display across all platform personas (Growth Partner, Parent, Tutor, School Admin, and Student) using the official Nigerian Naira (`₦`) symbol with comma-separated whole numbers and cross-platform font fallbacks to eliminate missing-glyph boxes (`▯`).

## User Review & Critical Decisions

> [!IMPORTANT]
> The following product decisions were confirmed during clarification:
> - **Symbol Formatting**: Direct Naira (`₦`) symbol rendered with a dedicated cross-platform font fallback (`system-ui, -apple-system, Roboto, 'Segoe UI', Arial, sans-serif`) to prevent tofu boxes (`▯`) on Android, iOS, Windows, and mobile Chrome.
> - **Number Formatting**: Comma-separated whole Naira amounts (e.g., `₦15,000`, `₦1,500`, `₦500`, `₦0`) without trailing decimals across all dashboards, ledgers, and modals.

- **Confirmed Decision 1**: Implement universal `formatNaira`, `<NairaText />`, and `<NairaSign />` components in `src/utils/currency.tsx` with dedicated font isolation so the symbol never inherits fonts lacking glyph U+20A6 (such as `JetBrains Mono`).
- **Confirmed Decision 2**: Audit and standardize every persona in the app (Growth Partner, Parent, Tutor, Admin, Student) to use this uniform representation.

---

## 1. Overview & Core Concept

- **The Problem**: On Android devices (as seen in the user's screenshot), monospace font stacks like `JetBrains Mono` or default system monospace engines lack the Unicode glyph for the Nigerian Naira (`₦` / `U+20A6`). As a result, Android Chrome displays a rectangular missing-glyph tofu box (`▯0`).
- **The Solution**:
  1. Define a font fallback system in `src/index.css` and `index.html` ensuring `Roboto` and system fonts back up custom web fonts.
  2. Provide a lightweight, reusable `<NairaText />` and `<NairaSign />` utility that forces glyph rendering through standard sans-serif system fonts even within monospace stat numbers.
  3. Format all values as whole Naira integers with standard locale grouping (`₦15,000`).

---

## 2. User Experience & Visual Design

- **Growth Partner Persona (`GrowthPartnerPortal.tsx`)**:
  - Primary metric cards: Available Balance (`₦0`), Withdrawn (`₦0`), Lifetime Earnings (`₦0`).
  - Active Referrals Roster: Total Volume (`₦15,000`), Total Commission (`₦1,500`).
  - Audit Ledger: Payment Amount (`₦15,000`), Commission Credited (`+₦1,500`).
  - Test Simulator: Plan prices (`₦15,000`, `₦35,000`, `₦5,000`), custom amount field, expected 10% credit (`₦1,500`).
  - Bank Withdrawal Modal: Available balance reference (`Max: ₦1,000`), amount input label (`Withdrawal Amount (₦)`).
- **Parent Persona (`ParentPortal.tsx`)**:
  - Digital Wallet Balance (`₦35,000`), quick top-up buttons (`₦1,000`, `₦2,500`, `₦5,000`, `₦10,000`), Paystack checkout button, and tutor booking escrow deductions (`-₦3,500`).
- **Tutor Persona (`TutorPortal.tsx`, `TutorDiscovery.tsx`, `TutorMapLocator.tsx`)**:
  - Hourly rate display (`₦3,500 / hr`), available payout balance (`₦...`), funds held in escrow, payout request button.
- **School Admin & Super Admin (`SchoolAdminPortal.tsx`, `SuperAdminPortal.tsx`)**:
  - Tutor hourly rates in user directory (`₦3,000 / hr`), licensing and institutional quotas.
- **Sign-Up Flow (`SignUpPage.tsx`)**:
  - Tutor hourly rate configuration input (`Hourly Rate (₦)`).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Specialized `<NairaText />` Component vs. Inline CSS Classes**
  - *Chosen Approach*: Provide both `src/utils/currency.tsx` (with `<NairaSign />`, `<NairaText />`, and `formatNaira()`) and global CSS utility `.naira-symbol`.
  - *Why*: Enables seamless usage across large numerical displays, small badge metadata, table cells, and string-only alerts or option dropdowns.
  - *Alternatives Considered*: Pure string interpolation (`₦${val}`) was rejected because Android browsers still fail to render `₦` when wrapped in `font-mono`.

- **Decision 2: Global Theme Font Stacks in Tailwind CSS**
  - *Chosen Approach*: Update `src/index.css` to add `Roboto`, `'Segoe UI'`, and `Arial` immediately after `JetBrains Mono` and `Plus Jakarta Sans`.
  - *Why*: Provides automatic secondary fallback at the root stylesheet level for standard string usages.

---

## 4. Technical Architecture & Component Mapping

```
┌────────────────────────────────────────────────────────┐
│                   Currency Subsystem                   │
│                                                        │
│  src/utils/currency.tsx                                │
│  ├─ formatNaira(amount)       -> "₦15,000"             │
│  ├─ <NairaSign />             -> <span font-sans>₦</span>
│  └─ <NairaText amount={val}/> -> <span><NairaSign/>val │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┼───────────────┬────────────────┐
            ▼               ▼               ▼                ▼
    Growth Partner       Parent           Tutor         School Admin
    ───────────────   ─────────────   ─────────────   ───────────────
    - Wallet Card     - Wallet Card   - Hourly Rate   - Directory Fee
    - Ledger Rows     - Top-Up Grid   - Escrow Bal    - Quota Pricing
    - Simulator       - Booking Fee   - Payout Req    - SuperAdmin Tx
```

### Files to Update
1. **`src/utils/currency.tsx`** *(New)*: Core currency utilities and font-safe React components.
2. **`src/index.css`**: Update `--font-mono` and `--font-sans` with robust system fallbacks (`Roboto`, `'Segoe UI'`, `Arial`); add `.naira-symbol` helper.
3. **`src/components/partner/GrowthPartnerPortal.tsx`**: Replace all `₦` occurrences and `font-mono` containers with `<NairaText />` or safe font wrappers.
4. **`src/components/parent/ParentPortal.tsx`**: Update wallet balance, top-up buttons, and transaction rows.
5. **`src/components/tutor/TutorPortal.tsx`** & **`src/components/student/TutorDiscovery.tsx`**: Standardize tutor hourly rates and escrow balances.
6. **`src/components/admin/SuperAdminPortal.tsx`**: Ensure user directory and tutor rates display formatted Naira amounts.
7. **Verification**: Co-execute `compile_applet` and `lint_applet` to confirm 0 errors.
