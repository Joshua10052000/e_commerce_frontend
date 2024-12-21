function formatCents(cents: number) {
  const numberFormatter = new Intl.NumberFormat("en-EN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const dollar = Math.round(cents) / 100;

  return numberFormatter.format(dollar);
}

export { formatCents };
