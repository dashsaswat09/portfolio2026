// In-memory limits. On serverless hosting each instance keeps its own counters, so treat
// these as a speed bump. The real spending ceiling is the provider's own quota.

type Bucket = { minute: number[]; dayStart: number; dayCount: number };

const buckets = new Map<string, Bucket>();
let global = { dayStart: 0, count: 0 };

const DAY = 86_400_000;

export function checkLimit(ip: string): { ok: true } | { ok: false; reason: "visitor" | "daily" } {
  const now = Date.now();
  const perMinute = Number(process.env.AI_LIMIT_PER_MINUTE || 6);
  const perDay = Number(process.env.AI_LIMIT_PER_VISITOR_DAY || 30);
  const globalDay = Number(process.env.AI_LIMIT_GLOBAL_DAY || 300);

  if (now - global.dayStart > DAY) global = { dayStart: now, count: 0 };
  if (global.count >= globalDay) return { ok: false, reason: "daily" };

  let b = buckets.get(ip);
  if (!b || now - b.dayStart > DAY) b = { minute: [], dayStart: now, dayCount: 0 };
  b.minute = b.minute.filter((t) => now - t < 60_000);
  if (b.minute.length >= perMinute || b.dayCount >= perDay) {
    buckets.set(ip, b);
    return { ok: false, reason: "visitor" };
  }
  b.minute.push(now);
  b.dayCount += 1;
  buckets.set(ip, b);
  global.count += 1;

  if (buckets.size > 5000) buckets.clear(); // keep memory bounded
  return { ok: true };
}
