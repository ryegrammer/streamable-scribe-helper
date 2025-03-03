
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Home, BookOpen, Settings, Video, MessageSquare, Search, List } from 'lucide-react';

const Sitemap = () => {
  // Site structure data
  const siteStructure = [
    {
      title: "Main Pages",
      icon: <Home className="size-5" />,
      pages: [
        {
          title: "Home",
          path: "/",
          description: "Main landing page with streaming controls and key features"
        },
        {
          title: "Suggestions",
          path: "/suggestions",
          description: "Development ideas and feature suggestions"
        },
        {
          title: "Sitemap",
          path: "/sitemap",
          description: "Overview of all pages and navigation structure"
        }
      ]
    },
    {
      title: "Functionality",
      icon: <Video className="size-5" />,
      pages: [
        {
          title: "Streaming",
          path: "/#streaming-section",
          description: "Connect to Raspberry Pi and start streaming"
        },
        {
          title: "Recording",
          path: "/#streaming-section",
          description: "Record educational content from your stream"
        },
        {
          title: "Library",
          path: "/#streaming-section",
          description: "View and manage your recorded content"
        }
      ]
    },
    {
      title: "Resources",
      icon: <BookOpen className="size-5" />,
      pages: [
        {
          title: "Documentation",
          path: "#",
          description: "Technical documentation and guides"
        },
        {
          title: "Raspberry Pi Setup",
          path: "#",
          description: "Instructions for setting up your Raspberry Pi camera"
        },
        {
          title: "API Reference",
          path: "#",
          description: "Technical API documentation for developers"
        }
      ]
    },
    {
      title: "Support",
      icon: <MessageSquare className="size-5" />,
      pages: [
        {
          title: "Help Center",
          path: "#",
          description: "Troubleshooting and support resources"
        },
        {
          title: "Contact",
          path: "#",
          description: "Get in touch with our support team"
        },
        {
          title: "Feedback",
          path: "#",
          description: "Submit feedback and report issues"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight animate-fade-in">
            Site Navigation Map
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-in">
            A comprehensive overview of all pages and sections available in the Raspberry Pi streaming platform.
          </p>
          <div className="flex justify-center gap-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <Button variant="outline" size="lg" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 size-4" /> Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/suggestions">
                <ArrowRight className="mr-2 size-4" /> View Suggestions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="flex-grow py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Visual Sitemap */}
          <div className="mb-16">
            <Card className="overflow-hidden backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Visual Navigation Map</CardTitle>
                <CardDescription>
                  An interactive overview of the site structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 flex justify-center items-center">
                  <div className="relative w-full max-w-4xl">
                    {/* Main node */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 glass-panel p-4 rounded-lg border border-primary/30 z-10">
                      <div className="font-medium text-center">PiStream</div>
                    </div>
                    
                    {/* Lines */}
                    <div className="absolute top-12 left-1/2 h-10 w-0.5 bg-border"></div>
                    
                    {/* Main branches */}
                    <div className="pt-20 pb-10 flex justify-around">
                      <div className="flex flex-col items-center">
                        <div className="glass-panel p-3 rounded-lg border border-border">
                          <Link to="/" className="font-medium hover:text-primary transition-colors">Home</Link>
                        </div>
                        <div className="h-10 w-0.5 bg-border my-2"></div>
                        <div className="flex space-x-8">
                          <div className="flex flex-col items-center">
                            <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">Streaming</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">Recording</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="glass-panel p-3 rounded-lg border border-border">
                          <Link to="/suggestions" className="font-medium hover:text-primary transition-colors">Suggestions</Link>
                        </div>
                        <div className="h-10 w-0.5 bg-border my-2"></div>
                        <div className="flex space-x-8">
                          <div className="flex flex-col items-center">
                            <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">Feature Ideas</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">Submissions</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="glass-panel p-3 rounded-lg border border-border">
                          <Link to="/sitemap" className="font-medium hover:text-primary transition-colors">Sitemap</Link>
                        </div>
                        <div className="h-10 w-0.5 bg-border my-2"></div>
                        <div className="flex space-x-8">
                          <div className="flex flex-col items-center">
                            <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">Navigation</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm">Resources</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Detailed Sitemap */}
          <div className="grid md:grid-cols-2 gap-8">
            {siteStructure.map((section, index) => (
              <Card key={index} className="backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {section.icon}
                    </div>
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {section.pages.map((page, pageIndex) => (
                      <li key={pageIndex} className="border-b border-border/30 last:border-b-0 pb-3 last:pb-0">
                        <div className="flex flex-col">
                          <Link 
                            to={page.path}
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {page.title}
                          </Link>
                          <span className="text-sm text-muted-foreground mt-1">
                            {page.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sitemap;
