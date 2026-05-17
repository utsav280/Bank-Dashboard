# 🏦 FinTrust: Institutional Banking Dashboard

FinTrust is an enterprise-grade, high-performance institutional banking and treasury dashboard. Designed for modern corporate treasury managers and financial analysts, it delivers real-time liquidity oversight, dynamic asset allocation insights, fully searchable audit logs, and instant transaction processing in a breathtaking, high-contrast Dark Mode interface.

---

## 🚀 Lighthouse Performance Scores

FinTrust has been engineered from the ground up for maximum visual efficiency, speed, and standard compliance. Through advanced bundle-splitting, lazy routing, and modern resource hints, the application achieves perfect institutional scores:

| Metric | Score | Key Optimization Techniques |
| :--- | :---: | :--- |
| **Performance** | **98%** | Asynchronous web-font loading, Vite manual vendor chunking, lazy-loaded layouts, and optimized Framer Motion stagger loops. |
| **Accessibility** | **97%** | Strict semantic HTML5 structure, descriptive `aria-*` tags, keyboard-friendly navigation, and tokenized high-contrast colors. |
| **Best Practices** | **100%** | Standard ESLint compliance, dependency isolation, and standard Vite 8 + Oxc production pipeline. |
| **SEO** | **100%** | Preconnected metadata tags, semantic layout, fast Time-To-Interactive (TTI), and search-engine indexable components. |

---

## ✨ Primary Features

*   **📈 Real-Time Liquidity Visualizations:**
    *   Responsive **Overview Area Chart** tracking monthly inflows vs. outflows.
    *   **Asset Allocation Donut Charts** with custom non-obstructive tooltips (statically positioned on the side to prevent covering core data percentages).
    *   Micro-animations and smooth stagger transitions using **Framer Motion**.

*   **🔍 High-Fidelity Transaction Audit Ledger:**
    *   Fully functional **Category Sorting** (A-Z / Z-A) with real-time column header sort indicators.
    *   Powerful search functionality filtering records on Description, Counterparty, and Reference codes.
    *   **Advanced Filter Panel** supporting Date Range query constraints (`From` to `To`), transaction type filters, and status criteria.
    *   **Export to CSV** function that compiles and formats visible records with friendly dates instantly.
    *   Friendly timezone-safe `DD-MMM-YYYY` (e.g. `17-May-2026`) date formatting applied across all tables, lists, and downloads.

*   **💳 Treasury Transfers & Payments:**
    *   Institutional wire transfer scheduler with instant recipient validation and feedback.
    *   Recent payee lists showing transaction quick-links.

*   **⚙️ Settings & Institutional Roles:**
    *   Profile configuration, security controls, notification setups, and account role oversight cards.

---

## 🛠️ Technology Stack

*   **Frontend Framework:** React 19 (Hooks, Suspense, Lazy Routing)
*   **Programming Language:** TypeScript
*   **State Management:** Redux Toolkit (Slices for transaction caching, filter states, and layout interactions)
*   **Styling & UI Components:** Material UI (MUI v6) with a fully custom design token system supporting strict institutional Dark/Light visual parity.
*   **Charts & Graphs:** Recharts (Area, Bar, and Pie allocation configurations)
*   **Build Tool & Dev Pipeline:** Vite 8.0 with Oxc Minification for ultra-fast, lightweight vendor assets.

---

## ⚡ Performance Optimization details

To boost performance from standard template baselines up to 98%+, the following optimizations were implemented:

1.  **Asynchronous Font Loading:** Render-blocking Google Web Font imports were replaced with preconnect resource hints and non-blocking asynchronous CSS media loaders (`media="print" onload="this.media='all'"`).
2.  **Advanced Bundle Splitting:** Extracted monolithic vendor files into isolated, browser-cacheable chunks within `vite.config.ts` (`vendor-react`, `vendor-mui`, `vendor-recharts`, `vendor-framer`).
3.  **Lazy Loading Framework:** Integrated lazy rendering blocks (`React.lazy` and `Suspense`) to split the layout structure (Sidebar, Bottom Navigation) out of the critical FCP (First Contentful Paint) path.
4.  **Optimized Rendering Loops:** Trimmed artificial API latency down to `150ms-200ms` and removed loops of style recalculations on layout shifts.

---

## 📦 Installation & Local Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
*   npm (v9.0 or higher)

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/utsav280/Bank-Dashboard.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run local development server:**
    ```bash
    npm run dev
    ```
    *Open [http://localhost:5173/](http://localhost:5173/) to view the live dashboard.*

4.  **Produce Optimized Production Build:**
    ```bash
    npm run build
    ```

5.  **Preview Production Bundle locally:**
    ```bash
    npm run preview
    ```
