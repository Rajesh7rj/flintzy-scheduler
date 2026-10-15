function getStartOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatScheduledTime(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatScheduledDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function getQueueDayLabel(
  value: string,
  referenceDate: Date = new Date(),
): string {
  const scheduledDate = getStartOfLocalDay(new Date(value));
  const today = getStartOfLocalDay(referenceDate);
  const tomorrow = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);

  if (scheduledDate.getTime() === today.getTime()) {
    return "Today";
  }

  if (scheduledDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }

  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(scheduledDate);
}

export function getDateTimeLocalValue(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

export function getDefaultScheduleTime(): string {
  const date = new Date();

  date.setHours(date.getHours() + 1, 0, 0, 0);

  return getDateTimeLocalValue(date);
}
