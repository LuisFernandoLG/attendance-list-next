export function getCurrentDateTime() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  
    return formatter.format(now);
}