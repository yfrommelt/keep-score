export function formatDate(date: Date) {
  return date.toLocaleString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
