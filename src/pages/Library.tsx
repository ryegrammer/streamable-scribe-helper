
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';

const Library = () => {
  return (
    <div className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Video Library</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-background/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Video className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Your recorded videos will appear here once the Raspberry Pi integration is complete.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Library;
