/**
 * Currency, Date and Percentage formatters for ProjectDrishti
 */

export function formatCrores(amountInCrores: number): string {
  if (isNaN(amountInCrores)) return '₹0 Cr';
  if (amountInCrores >= 100000) {
    return `₹${(amountInCrores / 100000).toFixed(2)} Lakh Cr`;
  }
  return `₹${amountInCrores.toLocaleString('en-IN')} Cr`;
}

export function formatCompactCrores(amountInCrores: number): string {
  if (isNaN(amountInCrores)) return '₹0 Cr';
  if (amountInCrores >= 100000) {
    return `₹${(amountInCrores / 100000).toFixed(1)}L Cr`;
  }
  if (amountInCrores >= 1000) {
    return `₹${(amountInCrores / 1000).toFixed(1)}k Cr`;
  }
  return `₹${amountInCrores} Cr`;
}

export function formatDate(dateString: string): string {
  if (!dateString) return '-';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function getStatusColor(status: string): { bg: string; text: string; border: string; dot: string } {
  switch (status) {
    case 'On Track':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' };
    case 'Delayed':
      return { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', dot: 'bg-amber-500' };
    case 'At Risk':
      return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-600' };
    case 'Completed':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-600' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' };
  }
}

export function getRiskColor(risk: string): { bg: string; text: string; border: string } {
  switch (risk) {
    case 'Critical':
      return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
    case 'High':
      return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' };
    case 'Medium':
      return { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' };
    case 'Low':
      return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' };
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' };
  }
}
