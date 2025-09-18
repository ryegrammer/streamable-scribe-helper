
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Settings, Video, VideoOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { initPiCamera, startPiCameraStream, stopPiCameraStream, getCameraStatus } from '@/lib/piCameraUtils';

interface StreamingSectionProps {
  onRecordingChange?: (isRecording: boolean) => void;
}

const StreamingSection: React.FC<StreamingSectionProps> = ({ onRecordingChange }) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [streamQuality, setStreamQuality] = useState<'auto' | 'high' | 'medium' | 'low'>('auto');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    const setupCamera = async () => {
      const initialized = await initPiCamera();
      if (!initialized) {
        toast({
          title: "Pi Camera Error",
          description: "Failed to initialize Pi camera. Check connection and permissions.",
          variant: "destructive"
        });
      }
    };

    setupCamera();
  }, [toast]);

  const toggleStream = async () => {
    if (isStreaming) {
      // Stop streaming
      setIsLoading(true);
      try {
        await stopPiCameraStream();
        setConnectionStatus('disconnected');
        setIsLoading(false);
        setIsStreaming(false);

        if (isRecording) {
          setIsRecording(false);
          onRecordingChange?.(false);
          toast({
            title: "Recording stopped",
            description: "Your recording has been saved",
          });
        }
      } catch (error) {
        console.error('Failed to disconnect:', error);
        toast({
          title: "Connection error",
          description: "Failed to disconnect Pi camera stream",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    } else {
      // Start streaming
      setIsLoading(true);
      setConnectionStatus('connecting');

      try {
        if (videoRef.current) {
          const streamUrl = await startPiCameraStream(videoRef.current, streamQuality);
          if (streamUrl) {
            setConnectionStatus('connected');
            setIsLoading(false);
            setIsStreaming(true);

            toast({
              title: "Pi Camera connected",
              description: `Stream started (${streamQuality} quality)`,
            });
          } else {
            throw new Error('Failed to get stream URL');
          }
        } else {
          throw new Error('Video element not found');
        }
      } catch (error) {
        console.error('Failed to connect:', error);
        toast({
          title: "Connection error",
          description: "Failed to start Pi camera stream",
          variant: "destructive"
        });
        setConnectionStatus('disconnected');
        setIsLoading(false);
      }
    }
  };

  const toggleRecording = () => {
    if (!isStreaming) return;
    
    setIsRecording(!isRecording);
    onRecordingChange?.(!isRecording);
    
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording 
        ? "Your recording has been saved" 
        : "Recording educational content from stream",
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isStreaming) {
        // No need for disconnectFromStream since we're just updating UI state
        setIsStreaming(false);
      }
    };
  }, [isStreaming]);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl glass-panel overflow-hidden">
      {/* Video Stream Container */}
      <div className="aspect-video bg-black/90 w-full relative">
        {!isStreaming ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
            <VideoOff className="size-16 mb-2 text-white/50" />
            <h3 className="text-xl font-medium">Stream Disconnected</h3>
            <p className="text-white/70 max-w-md text-center">
              Connect to your Raspberry Pi 5 to start streaming and recording educational content
            </p>
            <Button 
              className="mt-4 font-medium"
              onClick={toggleStream}
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect to Pi'}
            </Button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              muted
              playsInline
              autoPlay
              loop
              controls
              poster="/placeholder.svg"
            />
            
            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-destructive/90 text-destructive-foreground rounded-full text-sm animate-pulse-subtle">
                <div className="size-2 rounded-full bg-destructive-foreground"></div>
                Recording
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Controls */}
      <div className="p-4 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={!isStreaming || isLoading}
            onClick={toggleRecording}
            className={cn(
              "transition-all",
              isRecording && "text-destructive border-destructive/30"
            )}
          >
            {isRecording ? <Pause className="size-5" /> : <Play className="size-5" />}
          </Button>
          
          <div className="flex flex-col">
            <h3 className="font-medium">Raspberry Pi Stream</h3>
            <p className="text-xs text-muted-foreground">
              {connectionStatus === 'connected' 
                ? `Connected (${streamQuality})` 
                : connectionStatus === 'connecting' 
                  ? 'Connecting...' 
                  : 'Disconnected'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            className="px-3 py-2 rounded-md text-sm bg-background border border-border"
            value={streamQuality}
            onChange={(e) => setStreamQuality(e.target.value as 'auto' | 'high' | 'medium' | 'low')}
            disabled={isStreaming || isLoading}
          >
            <option value="auto">Auto Quality</option>
            <option value="high">High Quality</option>
            <option value="medium">Medium Quality</option>
            <option value="low">Low Quality</option>
          </select>
          
          <Button
            variant={isStreaming ? "destructive" : "default"}
            onClick={toggleStream}
            disabled={isLoading}
            className="font-medium"
          >
            {isLoading 
              ? 'Processing...' 
              : isStreaming 
                ? 'Disconnect' 
                : 'Connect'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StreamingSection;
