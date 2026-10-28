const f = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
export const formatCurrency = (n) => f.format(Number(n) || 0);
