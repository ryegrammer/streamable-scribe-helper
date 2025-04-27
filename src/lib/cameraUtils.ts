
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const initCamera = async () => {
  try {
    // Request camera permissions
    const permission = await Camera.checkPermissions();
    if (permission.camera !== 'granted') {
      await Camera.requestPermissions();
    }
    return true;
  } catch (error) {
    console.error('Camera initialization error:', error);
    return false;
  }
};

export const startPreview = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: false,
      presentationStyle: 'fullscreen',
    });
    
    return image.webPath;
  } catch (error) {
    console.error('Camera preview error:', error);
    throw error;
  }
};

export const captureVideo = async () => {
  // Note: Video capture will be implemented in future Capacitor versions
  // For now, we'll need to use a custom native plugin or WebRTC
  console.warn('Video capture not yet implemented');
};
