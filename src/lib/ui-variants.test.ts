import { describe, it, expect } from 'vitest'
import { badgeVariants, buttonVariants, toggleVariants } from './ui-variants'

describe('ui-variants', () => {
  describe('badgeVariants', () => {
    it('should return default variant classes', () => {
      const result = badgeVariants()

      expect(result).toContain('inline-flex')
      expect(result).toContain('items-center')
      expect(result).toContain('rounded-full')
      expect(result).toContain('border')
      expect(result).toContain('bg-primary')
      expect(result).toContain('text-primary-foreground')
    })

    it('should apply secondary variant', () => {
      const result = badgeVariants({ variant: 'secondary' })

      expect(result).toContain('bg-secondary')
      expect(result).toContain('text-secondary-foreground')
      expect(result).not.toContain('bg-primary')
    })

    it('should apply destructive variant', () => {
      const result = badgeVariants({ variant: 'destructive' })

      expect(result).toContain('bg-destructive')
      expect(result).toContain('text-destructive-foreground')
    })

    it('should apply outline variant', () => {
      const result = badgeVariants({ variant: 'outline' })

      expect(result).toContain('text-foreground')
      expect(result).not.toContain('bg-primary')
    })
  })

  describe('buttonVariants', () => {
    it('should return default variant and size classes', () => {
      const result = buttonVariants()

      expect(result).toContain('inline-flex')
      expect(result).toContain('items-center')
      expect(result).toContain('justify-center')
      expect(result).toContain('bg-primary')
      expect(result).toContain('text-primary-foreground')
      expect(result).toContain('h-10')
      expect(result).toContain('px-4')
      expect(result).toContain('py-2')
    })

    it('should apply destructive variant', () => {
      const result = buttonVariants({ variant: 'destructive' })

      expect(result).toContain('bg-destructive')
      expect(result).toContain('text-destructive-foreground')
      expect(result).not.toContain('bg-primary')
    })

    it('should apply outline variant', () => {
      const result = buttonVariants({ variant: 'outline' })

      expect(result).toContain('border')
      expect(result).toContain('border-input')
      expect(result).toContain('bg-background')
    })

    it('should apply secondary variant', () => {
      const result = buttonVariants({ variant: 'secondary' })

      expect(result).toContain('bg-secondary')
      expect(result).toContain('text-secondary-foreground')
    })

    it('should apply ghost variant', () => {
      const result = buttonVariants({ variant: 'ghost' })

      expect(result).toContain('hover:bg-accent')
      expect(result).toContain('hover:text-accent-foreground')
      expect(result).not.toContain('bg-primary')
    })

    it('should apply link variant', () => {
      const result = buttonVariants({ variant: 'link' })

      expect(result).toContain('text-primary')
      expect(result).toContain('underline-offset-4')
      expect(result).toContain('hover:underline')
    })

    it('should apply small size', () => {
      const result = buttonVariants({ size: 'sm' })

      expect(result).toContain('h-9')
      expect(result).toContain('px-3')
      expect(result).not.toContain('h-10')
    })

    it('should apply large size', () => {
      const result = buttonVariants({ size: 'lg' })

      expect(result).toContain('h-11')
      expect(result).toContain('px-8')
    })

    it('should apply icon size', () => {
      const result = buttonVariants({ size: 'icon' })

      expect(result).toContain('h-10')
      expect(result).toContain('w-10')
      expect(result).not.toContain('px-4')
    })

    it('should combine variant and size', () => {
      const result = buttonVariants({ variant: 'outline', size: 'lg' })

      expect(result).toContain('border')
      expect(result).toContain('border-input')
      expect(result).toContain('h-11')
      expect(result).toContain('px-8')
    })
  })

  describe('toggleVariants', () => {
    it('should return default variant and size classes', () => {
      const result = toggleVariants()

      expect(result).toContain('inline-flex')
      expect(result).toContain('items-center')
      expect(result).toContain('justify-center')
      expect(result).toContain('bg-transparent')
      expect(result).toContain('h-10')
      expect(result).toContain('px-3')
    })

    it('should apply outline variant', () => {
      const result = toggleVariants({ variant: 'outline' })

      expect(result).toContain('border')
      expect(result).toContain('border-input')
      expect(result).toContain('bg-transparent')
    })

    it('should apply small size', () => {
      const result = toggleVariants({ size: 'sm' })

      expect(result).toContain('h-9')
      expect(result).toContain('px-2.5')
      expect(result).not.toContain('h-10')
    })

    it('should apply large size', () => {
      const result = toggleVariants({ size: 'lg' })

      expect(result).toContain('h-11')
      expect(result).toContain('px-5')
    })

    it('should combine variant and size', () => {
      const result = toggleVariants({ variant: 'outline', size: 'sm' })

      expect(result).toContain('border')
      expect(result).toContain('border-input')
      expect(result).toContain('h-9')
      expect(result).toContain('px-2.5')
    })

    it('should include accessibility and state classes', () => {
      const result = toggleVariants()

      expect(result).toContain('focus-visible:outline-none')
      expect(result).toContain('focus-visible:ring-2')
      expect(result).toContain('data-[state=on]:bg-accent')
      expect(result).toContain('disabled:pointer-events-none')
      expect(result).toContain('disabled:opacity-50')
    })
  })
})