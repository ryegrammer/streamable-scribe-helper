import { describe, it, expect, vi } from 'vitest'
import { initCamera, startPreview } from './cameraUtils'

// Mock Capacitor Camera
vi.mock('@capacitor/camera', () => ({
  Camera: {
    checkPermissions: vi.fn(),
    requestPermissions: vi.fn(),
    getPhoto: vi.fn(),
  },
  CameraResultType: {
    Uri: 'uri',
  },
  CameraSource: {
    Camera: 'camera',
  },
}))

describe('cameraUtils', () => {
  describe('initCamera', () => {
    it('should return true when camera permissions are granted', async () => {
      const { Camera } = await import('@capacitor/camera')
      vi.mocked(Camera.checkPermissions).mockResolvedValue({ camera: 'granted' })

      const result = await initCamera()
      expect(result).toBe(true)
    })

    it('should request permissions when not granted', async () => {
      const { Camera } = await import('@capacitor/camera')
      vi.mocked(Camera.checkPermissions).mockResolvedValue({ camera: 'denied' })
      vi.mocked(Camera.requestPermissions).mockResolvedValue({ camera: 'granted' })

      const result = await initCamera()
      expect(Camera.requestPermissions).toHaveBeenCalled()
      expect(result).toBe(true)
    })

    it('should return false on error', async () => {
      const { Camera } = await import('@capacitor/camera')
      vi.mocked(Camera.checkPermissions).mockRejectedValue(new Error('Camera error'))

      const result = await initCamera()
      expect(result).toBe(false)
    })
  })

  describe('startPreview', () => {
    it('should return webPath from camera photo', async () => {
      const { Camera } = await import('@capacitor/camera')
      const mockWebPath = 'blob:http://localhost/test'
      vi.mocked(Camera.getPhoto).mockResolvedValue({ webPath: mockWebPath })

      const result = await startPreview()
      expect(result).toBe(mockWebPath)
    })

    it('should throw error when camera fails', async () => {
      const { Camera } = await import('@capacitor/camera')
      vi.mocked(Camera.getPhoto).mockRejectedValue(new Error('Camera failed'))

      await expect(startPreview()).rejects.toThrow('Camera failed')
    })
  })
})