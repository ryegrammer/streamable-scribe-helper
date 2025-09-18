import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('utils', () => {
  describe('cn (className utility)', () => {
    it('should combine class names correctly', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden')
      expect(result).toBe('base conditional')
    })

    it('should merge conflicting Tailwind classes', () => {
      // twMerge should resolve conflicts, keeping the last one
      const result = cn('p-4', 'p-8')
      expect(result).toBe('p-8')
    })

    it('should handle objects with boolean values', () => {
      const result = cn({
        'active': true,
        'inactive': false,
        'visible': true
      })
      expect(result).toBe('active visible')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle empty and undefined values', () => {
      const result = cn('base', '', undefined, null, 'end')
      expect(result).toBe('base end')
    })

    it('should handle complex Tailwind merge scenarios', () => {
      // Test common Tailwind conflicts
      const result = cn(
        'bg-red-500 text-white p-4',
        'bg-blue-500 m-2'
      )
      expect(result).toBe('text-white p-4 bg-blue-500 m-2')
    })

    it('should handle responsive and state variants', () => {
      const result = cn(
        'text-sm md:text-lg',
        'hover:bg-blue-500',
        'focus:ring-2'
      )
      expect(result).toBe('text-sm md:text-lg hover:bg-blue-500 focus:ring-2')
    })

    it('should work with no arguments', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle complex real-world scenarios', () => {
      const isActive = true
      const isDisabled = false
      const size = 'lg'

      const result = cn(
        'inline-flex items-center justify-center',
        'rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': !isDisabled,
          'bg-gray-300 text-gray-500': isDisabled,
          'ring-2 ring-primary': isActive
        },
        size === 'sm' && 'h-9 px-3 text-sm',
        size === 'lg' && 'h-11 px-8',
        size === 'default' && 'h-10 px-4 py-2'
      )

      expect(result).toContain('inline-flex')
      expect(result).toContain('bg-primary')
      expect(result).toContain('ring-2 ring-primary')
      expect(result).toContain('h-11 px-8')
      expect(result).not.toContain('bg-gray-300')
    })
  })
})