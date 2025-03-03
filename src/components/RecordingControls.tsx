
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Download, Save, Video } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface RecordingControlsProps {
  isRecording: boolean;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({ isRecording }) => {
  const [recordingName, setRecordingName] = useState('Educational Session');
  const [autoSave, setAutoSave] = useState(true);
  const [quality, setQuality] = useState([720]);
  const [savedRecordings, setSavedRecordings] = useState([
    { id: 1, name: 'Science Lesson 1', date: '2023-06-15', duration: '34:21', size: '720p' },
    { id: 2, name: 'Coding Tutorial', date: '2023-06-12', duration: '45:52', size: '1080p' },
  ]);
  const { toast } = useToast();

  const saveRecording = () => {
    if (!isRecording) {
      const newRecording = {
        id: Date.now(),
        name: recordingName || `Recording ${savedRecordings.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        duration: '00:00',
        size: `${quality[0]}p`
      };
      
      setSavedRecordings([newRecording, ...savedRecordings]);
      
      toast({
        title: "Recording saved",
        description: `"${newRecording.name}" has been saved to your library`
      });
    }
  };

  const downloadRecording = (id: number) => {
    const recording = savedRecordings.find(r => r.id === id);
    if (recording) {
      toast({
        title: "Download started",
        description: `Downloading "${recording.name}"`
      });
    }
  };

  return (
    <div className={cn(
      "w-full max-w-5xl mx-auto rounded-2xl glass-panel overflow-hidden transition-opacity duration-300",
      !isRecording && "opacity-80"
    )}>
      <Tabs defaultValue="settings" className="w-full">
        <div className="px-6 pt-4 border-b border-border/50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Recording Controls</h2>
            {isRecording && (
              <div className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-medium">
                Recording in progress
              </div>
            )}
          </div>
          
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="library">Library</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="settings" className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recording-name">Recording Name</Label>
                <Input
                  id="recording-name"
                  placeholder="Enter recording name"
                  value={recordingName}
                  onChange={(e) => setRecordingName(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="auto-save">Auto Save Recordings</Label>
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Recording Quality</Label>
                  <span className="text-sm">{quality[0]}p</span>
                </div>
                <Slider
                  defaultValue={quality}
                  max={1080}
                  min={360}
                  step={360}
                  onValueChange={setQuality}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={saveRecording} 
                  disabled={isRecording}
                  className="w-full"
                >
                  <Save className="mr-2 size-4" />
                  Save Recording
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          {savedRecordings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Duration</th>
                    <th className="text-left p-4 font-medium">Quality</th>
                    <th className="text-right p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedRecordings.map((recording) => (
                    <tr key={recording.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4 flex items-center gap-2">
                        <Video className="size-4 text-muted-foreground" />
                        {recording.name}
                      </td>
                      <td className="p-4 text-muted-foreground">{recording.date}</td>
                      <td className="p-4 text-muted-foreground">{recording.duration}</td>
                      <td className="p-4 text-muted-foreground">{recording.size}</td>
                      <td className="p-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => downloadRecording(recording.id)}
                        >
                          <Download className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Video className="size-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No recordings found</h3>
              <p className="text-muted-foreground">
                Start recording to create educational content
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecordingControls;
