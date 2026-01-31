import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getExpiryStatus } from './helpers';

describe('getExpiryStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns null for undefined expiry date', () => {
    expect(getExpiryStatus(undefined)).toBe(null);
  });

  it('returns "expired" for past dates', () => {
    expect(getExpiryStatus('2025-01-14')).toBe('expired');
    expect(getExpiryStatus('2025-01-01')).toBe('expired');
  });

  it('returns "expiring-soon" for dates within 3 days', () => {
    expect(getExpiryStatus('2025-01-15')).toBe('expiring-soon'); // today
    expect(getExpiryStatus('2025-01-16')).toBe('expiring-soon'); // 1 day
    expect(getExpiryStatus('2025-01-17')).toBe('expiring-soon'); // 2 days
    expect(getExpiryStatus('2025-01-18')).toBe('expiring-soon'); // 3 days
  });

  it('returns "ok" for dates beyond 3 days', () => {
    expect(getExpiryStatus('2025-01-19')).toBe('ok'); // 4 days
    expect(getExpiryStatus('2025-02-15')).toBe('ok'); // 1 month
  });
});
