
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, ThumbsUp, Video, BookOpen, Globe, MessageSquare, Search, List, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const Suggestions = () => {
  const suggestionCategories = [
    {
      title: "Streaming Enhancements",
      icon: <Video className="size-5" />,
      suggestions: [
        {
          title: "Multi-camera support",
          description: "Add support for multiple Raspberry Pi cameras to switch between different angles.",
          difficulty: "medium",
          impact: "high"
        },
        {
          title: "Video effects",
          description: "Implement real-time video filters and effects for more engaging content.",
          difficulty: "hard",
          impact: "medium"
        },
        {
          title: "Scheduled streaming",
          description: "Enable scheduling of automated streaming sessions for regular content creation.",
          difficulty: "medium",
          impact: "medium"
        }
      ]
    },
    {
      title: "Educational Tools",
      icon: <BookOpen className="size-5" />,
      suggestions: [
        {
          title: "Interactive overlays",
          description: "Add interactive elements and overlays to highlight key educational points.",
          difficulty: "medium",
          impact: "high"
        },
        {
          title: "Content organization",
          description: "Implement tagging and categorization for educational recordings.",
          difficulty: "easy",
          impact: "high"
        },
        {
          title: "Lesson planning",
          description: "Add tools for creating structured educational content with chapters and sections.",
          difficulty: "medium",
          impact: "high"
        }
      ]
    },
    {
      title: "Community Features",
      icon: <Globe className="size-5" />,
      suggestions: [
        {
          title: "Live comments",
          description: "Enable viewers to comment and ask questions during live streams.",
          difficulty: "hard",
          impact: "high"
        },
        {
          title: "Content sharing",
          description: "Add options for sharing recordings to popular platforms and social media.",
          difficulty: "medium",
          impact: "medium"
        },
        {
          title: "Collaborative streaming",
          description: "Allow multiple Raspberry Pi devices to join the same stream for collaborative teaching.",
          difficulty: "hard",
          impact: "medium"
        }
      ]
    },
    {
      title: "Technical Improvements",
      icon: <Settings className="size-5" />,
      suggestions: [
        {
          title: "Performance optimization",
          description: "Optimize streaming for various network conditions and bandwidth limitations.",
          difficulty: "hard",
          impact: "high"
        },
        {
          title: "Advanced configuration",
          description: "Add more advanced settings for camera configuration and stream quality.",
          difficulty: "medium",
          impact: "medium"
        },
        {
          title: "Mobile app",
          description: "Develop a companion mobile app for controlling the Raspberry Pi camera remotely.",
          difficulty: "hard",
          impact: "high"
        }
      ]
    }
  ];

  // Helper function to get badge color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'hard':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // Helper function to get badge color based on impact
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'medium':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight animate-fade-in">
            Development Suggestions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-in">
            Explore potential features and improvements for the Raspberry Pi streaming platform.
            These suggestions can enhance your educational content creation.
          </p>
          <div className="flex justify-center gap-4 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <Button variant="outline" size="lg" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 size-4" /> Back to Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/sitemap">
                <List className="mr-2 size-4" /> View Sitemap
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Suggestions Content */}
      <section className="flex-grow py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {suggestionCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {category.suggestions.map((suggestion, suggIndex) => (
                    <Card key={suggIndex} className="backdrop-blur-sm border-border/50 hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary" className={getDifficultyColor(suggestion.difficulty)}>
                            {suggestion.difficulty}
                          </Badge>
                          <Badge variant="secondary" className={getImpactColor(suggestion.impact)}>
                            {suggestion.impact} impact
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm text-muted-foreground">
                          {suggestion.description}
                        </CardDescription>
                        <div className="mt-4 flex justify-end">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="size-4 mr-2" /> Vote
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Suggestion Form */}
          <div className="mt-16 max-w-2xl mx-auto">
            <Card className="backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Submit Your Suggestion</CardTitle>
                <CardDescription>
                  Have an idea for improving the Raspberry Pi streaming platform? Share it with us!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Suggestion Title
                    </label>
                    <input
                      id="title"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Enter your suggestion title"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Describe your suggestion in detail..."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button>
                      Submit Suggestion
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Suggestions;
