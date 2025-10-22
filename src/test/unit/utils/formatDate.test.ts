import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { formatDate, formatFullDate } from '@/utils/formatDate'

/**
 * Tests for date formatting utilities
 *
 * Date formatting is notoriously bug-prone due to:
 * - Timezone differences
 * - Off-by-one errors in thresholds
 * - Edge cases (midnight, noon, leap seconds)
 * - Singular/plural grammar
 *
 * We use fake timers to make tests deterministic and fast.
 */
describe('formatDate', () => {
  /**
   * Setup: Mock the current time
   *
   * By freezing time, we can test relative dates consistently.
   * Without this, tests would fail based on when you run them.
   */
  beforeEach(() => {
    // Use fake timers to control time
    vi.useFakeTimers()

    // Set "now" to a specific date: Jan 15, 2024 at 12:00:00 UTC
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'))
  })

  afterEach(() => {
    // Restore real timers
    vi.useRealTimers()
  })

  /**
   * RELATIVE TIME: "X ago" format
   */
  describe('relative time formatting', () => {
    it('should return "just now" for dates less than 1 minute ago', () => {
      // 30 seconds ago
      const dateString = '2024-01-15T11:59:30Z'
      const result = formatDate(dateString)

      expect(result).toBe('just now')
    })

    it('should return "X minutes ago" for dates less than 1 hour', () => {
      // 5 minutes ago
      const dateString = '2024-01-15T11:55:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('5 minutes ago')
    })

    it('should return "X hours ago" for dates less than 24 hours', () => {
      // 3 hours ago
      const dateString = '2024-01-15T09:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('3 hours ago')
    })

    it('should return "X days ago" for dates less than 30 days', () => {
      // 5 days ago
      const dateString = '2024-01-10T12:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('5 days ago')
    })

    it('should return "X months ago" for dates less than 1 year', () => {
      // 3 months ago (Oct 15, 2023)
      const dateString = '2023-10-15T12:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('3 months ago')
    })
  })

  /**
   * ABSOLUTE TIME: "Jan 15, 2024" format
   */
  describe('absolute date formatting', () => {
    it('should return absolute date for dates over 1 year old', () => {
      // 2 years ago (Jan 15, 2022)
      const dateString = '2022-01-15T12:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('Jan 15, 2022')
    })

    it('should format month names correctly', () => {
      // Test different months
      const testCases = [
        { date: '2020-01-15T12:00:00Z', expected: 'Jan 15, 2020' },
        { date: '2020-02-15T12:00:00Z', expected: 'Feb 15, 2020' },
        { date: '2020-03-15T12:00:00Z', expected: 'Mar 15, 2020' },
        { date: '2020-12-25T12:00:00Z', expected: 'Dec 25, 2020' },
      ]

      testCases.forEach(({ date, expected }) => {
        expect(formatDate(date)).toBe(expected)
      })
    })
  })

  /**
   * SINGULAR vs PLURAL: Grammar correctness
   */
  describe('singular and plural formatting', () => {
    it('should use singular "minute" for 1 minute', () => {
      // Exactly 1 minute ago
      const dateString = '2024-01-15T11:59:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('1 minute ago')
      expect(result).not.toContain('minutes') // Should not be plural
    })

    it('should use plural "minutes" for 2+ minutes', () => {
      // 2 minutes ago
      const dateString = '2024-01-15T11:58:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('2 minutes ago')
    })

    it('should use singular "hour" for 1 hour', () => {
      // Exactly 1 hour ago
      const dateString = '2024-01-15T11:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('1 hour ago')
    })

    it('should use plural "hours" for 2+ hours', () => {
      // 2 hours ago
      const dateString = '2024-01-15T10:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('2 hours ago')
    })

    it('should use singular "day" for 1 day', () => {
      // Exactly 1 day ago
      const dateString = '2024-01-14T12:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('1 day ago')
    })

    it('should use singular "month" for 1 month', () => {
      // Exactly 1 month ago (30 days)
      const dateString = '2023-12-16T12:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('1 month ago')
    })
  })

  /**
   * BOUNDARY CONDITIONS: Exactly at thresholds
   */
  describe('boundary conditions', () => {
    it('should format at exactly 59 seconds as "just now"', () => {
      // 59 seconds ago (boundary before 1 minute)
      const dateString = '2024-01-15T11:59:01Z'
      const result = formatDate(dateString)

      expect(result).toBe('just now')
    })

    it('should format at exactly 60 seconds as "1 minute ago"', () => {
      // Exactly 60 seconds = 1 minute
      const dateString = '2024-01-15T11:59:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('1 minute ago')
    })

    it('should format at exactly 59 minutes as minutes', () => {
      // 59 minutes (boundary before 1 hour)
      const dateString = '2024-01-15T11:01:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('59 minutes ago')
    })

    it('should format at exactly 60 minutes as "1 hour ago"', () => {
      // Exactly 60 minutes = 1 hour
      const dateString = '2024-01-15T11:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('1 hour ago')
    })

    it('should format at exactly 23 hours as hours', () => {
      // 23 hours (boundary before 1 day)
      const dateString = '2024-01-14T13:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('23 hours ago')
    })

    it('should format at exactly 24 hours as "1 day ago"', () => {
      // Exactly 24 hours = 1 day
      const dateString = '2024-01-14T12:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('1 day ago')
    })
  })

  /**
   * EDGE CASES: Invalid inputs, future dates
   */
  describe('edge cases', () => {
    it('should handle future dates gracefully', () => {
      // Date in the future (should show negative time or "just now")
      const dateString = '2024-01-20T12:00:00Z'
      const result = formatDate(dateString)

      // Depending on implementation, might show "just now" or negative
      // Just verify it doesn't crash
      expect(result).toBeDefined()
      expect(typeof result).toBe('string')
    })

    it('should handle dates at midnight correctly', () => {
      // Midnight (00:00:00)
      const dateString = '2024-01-15T00:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('12 hours ago')
    })

    it('should handle dates at noon correctly', () => {
      // Noon (12:00:00) - same as "now"
      const dateString = '2024-01-15T12:00:00Z'
      const result = formatDate(dateString)

      expect(result).toBe('just now')
    })
  })
})

/**
 * Tests for formatFullDate (absolute time with hours/minutes)
 */
describe('formatFullDate', () => {
  it('should format date with month, day, year, and time', () => {
    const dateString = '2024-01-15T14:30:00Z'
    const result = formatFullDate(dateString)

    // Should be: "Jan 15, 2024 at 2:30 PM"
    expect(result).toMatch(/Jan 15, 2024 at \d{1,2}:\d{2} [AP]M/)
  })

  it('should handle AM times correctly', () => {
    const dateString = '2024-01-15T09:15:00Z'
    const result = formatFullDate(dateString)

    expect(result).toContain('AM')
    expect(result).not.toContain('PM')
  })

  it('should handle PM times correctly', () => {
    const dateString = '2024-01-15T18:45:00Z'
    const result = formatFullDate(dateString)

    expect(result).toContain('PM')
    expect(result).not.toContain('AM')
  })

  it('should handle midnight (12:00 AM) correctly', () => {
    // Note: formatFullDate uses local timezone, not UTC
    // So we need to test with a date that will be midnight in local time
    const date = new Date('2024-01-15T00:00:00')
    const dateString = date.toISOString()
    const result = formatFullDate(dateString)

    // Midnight should be 12:XX AM, not 0:XX AM
    expect(result).toMatch(/12:\d{2} AM/)
  })

  it('should handle noon (12:00 PM) correctly', () => {
    // Note: formatFullDate uses local timezone, not UTC
    const date = new Date('2024-01-15T12:00:00')
    const dateString = date.toISOString()
    const result = formatFullDate(dateString)

    // Noon should be 12:XX PM, not 0:XX PM
    expect(result).toMatch(/12:\d{2} PM/)
  })

  it('should pad minutes with leading zero when needed', () => {
    const dateString = '2024-01-15T14:05:00Z'
    const result = formatFullDate(dateString)

    // Should be "2:05 PM" not "2:5 PM"
    expect(result).toMatch(/\d{1,2}:05 [AP]M/)
  })

  it('should not pad hours with leading zero', () => {
    // Create a date that will be 9:30 AM in local timezone
    const date = new Date('2024-01-15T09:30:00')
    const dateString = date.toISOString()
    const result = formatFullDate(dateString)

    // Should have single digit hour (9, not 09)
    // Format: "Jan 15, 2024 at 9:30 AM"
    expect(result).toMatch(/at \d{1}:\d{2} [AP]M/)
  })

  it('should format different months correctly', () => {
    const testCases = [
      { date: '2024-02-15T10:00:00Z', month: 'Feb' },
      { date: '2024-03-15T10:00:00Z', month: 'Mar' },
      { date: '2024-12-15T10:00:00Z', month: 'Dec' },
    ]

    testCases.forEach(({ date, month }) => {
      const result = formatFullDate(date)
      expect(result).toContain(month)
    })
  })
})
