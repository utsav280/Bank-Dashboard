/**
 * Formats a date string into "DD-MMM-YYYY" format (e.g. 17-May-2026).
 * Handles standard ISO date format YYYY-MM-DD in a timezone-safe manner.
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  // Try splitting by hyphen first for YYYY-MM-DD format (timezone-safe parsing)
  const parts = dateString.split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    // Strip any trailing time info if it has it (e.g. YYYY-MM-DDTHH:mm:ss)
    const dayPart = parts[2].split('T')[0];
    const day = dayPart.padStart(2, '0');
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[monthIndex];
    if (month) {
      return `${day}-${month}-${year}`;
    }
  }

  // Fallback for other standard/non-standard formats
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  const day = String(date.getDate()).padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}
