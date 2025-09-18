import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from './use-mobile'

// Mock window.matchMedia
const mockMatchMedia = vi.fn()
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
})

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1024, // Default desktop width
})

describe('useIsMobile', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Default mock implementation
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return false for desktop screen sizes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })

  it('should return true for mobile screen sizes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 375, // Mobile width
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('should return false for tablet screen sizes (768px)', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 768,
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it('should return true for screens just below mobile breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767,
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('should set up media query listener', () => {
    renderHook(() => useIsMobile())

    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should clean up media query listener on unmount', () => {
    const { unmount } = renderHook(() => useIsMobile())

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('should respond to window resize events', () => {
    let changeCallback: (() => void) | undefined

    mockAddEventListener.mockImplementation((event, callback) => {
      if (event === 'change') {
        changeCallback = callback
      }
    })

    // Start with desktop
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    })

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)

    // Simulate resize to mobile
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 375,
      })

      if (changeCallback) {
        changeCallback()
      }
    })

    expect(result.current).toBe(true)
  })

  it('should use correct mobile breakpoint constant', () => {
    renderHook(() => useIsMobile())

    // The hook should use 768 as breakpoint, so max-width should be 767px
    expect(mockMatchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })

  it('should handle edge cases around breakpoint', () => {
    // Test exactly at breakpoint (768px should be desktop)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 768,
    })

    const { result: result768 } = renderHook(() => useIsMobile())
    expect(result768.current).toBe(false)

    // Test just below breakpoint (767px should be mobile)
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767,
    })

    const { result: result767 } = renderHook(() => useIsMobile())
    expect(result767.current).toBe(true)
  })

  it('should return boolean even when initially undefined', () => {
    const { result } = renderHook(() => useIsMobile())

    // The hook should always return a boolean, never undefined
    expect(typeof result.current).toBe('boolean')
  })
})