export type TxStatus = 'Completed' | 'Pending' | 'Failed' | 'Flagged' | 'Processing';
export type TxType = 'credit' | 'debit';
export type TxCategory =
  | 'Equities'
  | 'Treasury'
  | 'Operational'
  | 'Payroll'
  | 'Infrastructure'
  | 'Tax'
  | 'Compliance'
  | 'Metals';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  reference: string;
  category: TxCategory;
  amount: number;
  type: TxType;
  status: TxStatus;
  accountId: string;
  counterparty: string;
}

const descriptions: [string, TxCategory, TxType, TxStatus][] = [
  ['Capital One Equity Disbursement', 'Equities', 'debit', 'Flagged'],
  ['Yield Management Deposit', 'Treasury', 'credit', 'Completed'],
  ['SWIFT Inward: Deutsche Bank', 'Operational', 'credit', 'Processing'],
  ['Vanguard Equities Fund - Dividends', 'Equities', 'credit', 'Completed'],
  ['AWS Cloud Infrastructure', 'Infrastructure', 'debit', 'Completed'],
  ['Metropolitan Properties Lease', 'Operational', 'debit', 'Completed'],
  ['Payroll Disbursement – Oct', 'Payroll', 'debit', 'Completed'],
  ['TDS Filing Q2', 'Tax', 'debit', 'Completed'],
  ['Gold ETF Redemption', 'Metals', 'credit', 'Completed'],
  ['SEBI Compliance Fee', 'Compliance', 'debit', 'Completed'],
  ['RBI Repo Rate Settlement', 'Treasury', 'credit', 'Completed'],
  ['HDFC Securities Transfer', 'Equities', 'debit', 'Pending'],
  ['NSE Derivatives Settlement', 'Equities', 'credit', 'Completed'],
  ['Azure Enterprise License', 'Infrastructure', 'debit', 'Completed'],
  ['Salary Advance – Finance Team', 'Payroll', 'debit', 'Pending'],
  ['GST Input Credit', 'Tax', 'credit', 'Completed'],
  ['Silver Futures Rollover', 'Metals', 'debit', 'Processing'],
  ['SWIFT Outward: Barclays London', 'Operational', 'debit', 'Completed'],
  ['Mutual Fund SIP – ICICI Pru', 'Equities', 'debit', 'Completed'],
  ['Fixed Deposit Maturity Credit', 'Treasury', 'credit', 'Completed'],
  ['Kotak Securities Brokerage', 'Equities', 'debit', 'Completed'],
  ['SBI Mutual Fund Redemption', 'Treasury', 'credit', 'Completed'],
  ['Reliance Industries Dividend', 'Equities', 'credit', 'Completed'],
  ['Office Utilities Payment', 'Operational', 'debit', 'Completed'],
  ['Annual Insurance Premium', 'Compliance', 'debit', 'Pending'],
  ['Infosys Ltd Stock Purchase', 'Equities', 'debit', 'Processing'],
  ['NTPC Bond Coupon', 'Treasury', 'credit', 'Completed'],
  ['L&T Finance EMI', 'Infrastructure', 'debit', 'Completed'],
  ['Axis Bank FD Interest', 'Treasury', 'credit', 'Completed'],
  ['Tata Consultancy Services Payout', 'Payroll', 'debit', 'Completed'],
];

const counterparties = [
  'Capital One', 'Deutsche Bank', 'Vanguard Fund', 'AWS', 'HDFC Securities',
  'NSE Clearing', 'SEBI', 'RBI', 'Barclays', 'ICICI Prudential',
  'Axis Bank', 'Kotak Securities', 'SBI Mutual Fund', 'Reliance Industries',
  'Tata Consultancy', 'Infosys Ltd', 'NTPC Limited', 'L&T Finance',
];

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genRef() {
  return `RTX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
}

function dateOffset(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

const statuses: TxStatus[] = ['Completed', 'Pending', 'Failed', 'Processing'];
const accounts = ['acc1', 'acc2', 'acc3'];

// Seeded shuffle: use a deterministic but diverse ordering of description indices
// so the first page shows a rich mix of transaction types
function buildShuffledIndices(count: number, poolSize: number): number[] {
  const indices: number[] = [];
  // Prime-step iteration ensures no back-to-back repeats from the same index
  const step = 7; // co-prime with 30
  let cursor = 0;
  for (let i = 0; i < count; i++) {
    indices.push(cursor % poolSize);
    cursor += step;
  }
  return indices;
}

const shuffledDescIdx = buildShuffledIndices(1000, descriptions.length);

export const MOCK_TRANSACTIONS: Transaction[] = Array.from({ length: 1000 }, (_, i) => {
  const descIdx = shuffledDescIdx[i];
  const base = descriptions[descIdx];
  const isOverride = i % 17 === 0;
  const status: TxStatus = isOverride
    ? 'Flagged'
    : i % 3 === 0
    ? 'Completed'
    : statuses[i % statuses.length];

  const amounts = [450000, 120045025, 8932000, 12450000, 248000, 75000, 1248900, 340000, 96000, 2100000];
  const amount = amounts[i % amounts.length] + randomBetween(-50000, 50000);

  return {
    id: `tx-${i + 1}`,
    date: dateOffset(i % 180),
    description: base[0],
    reference: genRef(),
    category: base[1],
    amount,
    type: base[2],
    status,
    accountId: accounts[i % 3],
    counterparty: counterparties[(i + descIdx) % counterparties.length],
  };
});
