
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowRight, Download, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

type SummarySection = {
  title: string;
  content: string[];
};

type MeetingSummary = {
  id: string;
  title: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  keyPoints: SummarySection;
  objections: SummarySection;
  actionItems: SummarySection;
};

const sampleSummaries: MeetingSummary[] = [
  {
    id: '1',
    title: 'Acme Corp - Product Demo',
    date: 'Today',
    sentiment: 'positive',
    keyPoints: {
      title: 'Key Points',
      content: [
        'Client is interested in our enterprise plan',
        'Team of 150+ employees would use the platform',
        'Currently using a competitor solution with limited features',
        'ROI is their primary concern'
      ]
    },
    objections: {
      title: 'Customer Objections',
      content: [
        'Concerned about the implementation timeline',
        'Needs assurance on seamless data migration',
        'Budget approval needed from finance department',
        'Questions about security compliance'
      ]
    },
    actionItems: {
      title: 'Action Items',
      content: [
        'Send detailed implementation timeline by Friday',
        'Schedule technical call with their IT team',
        'Provide case studies for similar size companies',
        'Prepare ROI projection based on their team size'
      ]
    }
  },
  {
    id: '2',
    title: 'TechSolutions Inc - Follow-up Call',
    date: 'Yesterday',
    sentiment: 'neutral',
    keyPoints: {
      title: 'Key Points',
      content: [
        'Discussing renewal options for current plan',
        'Interested in additional user licenses',
        'Asked about new reporting features',
        'Wants to explore enterprise-level support'
      ]
    },
    objections: {
      title: 'Customer Objections',
      content: [
        'Price increase concerns',
        'Some team members found the UI challenging',
        'Integration with their CRM has occasional issues',
        'Missing certain export functionality'
      ]
    },
    actionItems: {
      title: 'Action Items',
      content: [
        'Prepare custom renewal pricing options',
        'Schedule training session for team members',
        'Connect with technical team about CRM integration',
        'Share product roadmap for export features'
      ]
    }
  }
];

const MeetingSummaries = () => {
  const [selectedSummary, setSelectedSummary] = useState<MeetingSummary | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const handleViewSummary = (summary: MeetingSummary) => {
    setSelectedSummary(summary);
  };

  const handleAnalyzeNew = () => {
    setAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Positive</Badge>;
      case 'neutral':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Neutral</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Negative</Badge>;
      default:
        return null;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="h-5 w-5 text-green-600" />;
      case 'negative':
        return <ThumbsDown className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meeting Summaries</h1>
        <p className="text-gray-500 mt-2">AI-generated summaries of your sales calls</p>
      </div>

      <Tabs defaultValue={selectedSummary ? "view" : "all"}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Summaries</TabsTrigger>
            <TabsTrigger value="view" disabled={!selectedSummary}>View Summary</TabsTrigger>
          </TabsList>
          <Button onClick={handleAnalyzeNew} disabled={analyzing}>
            {analyzing ? (
              <>Analyzing <div className="ml-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div></>
            ) : (
              <>Analyze New Call</>
            )}
          </Button>
        </div>

        {analyzing && (
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center mt-2">Analyzing call content: {progress}%</p>
          </div>
        )}

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sampleSummaries.map((summary) => (
              <Card key={summary.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{summary.title}</CardTitle>
                      <CardDescription>{summary.date}</CardDescription>
                    </div>
                    {getSentimentBadge(summary.sentiment)}
                  </div>
                </CardHeader>
                <CardContent className="pb-0">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Points:</h4>
                    <ul className="text-sm pl-5 list-disc">
                      {summary.keyPoints.content.slice(0, 2).map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                      {summary.keyPoints.content.length > 2 && (
                        <li className="text-gray-500">+{summary.keyPoints.content.length - 2} more</li>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button variant="ghost" size="sm" className="ml-auto" onClick={() => handleViewSummary(summary)}>
                    View Details <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="view" className="mt-6">
          {selectedSummary && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{selectedSummary.title}</CardTitle>
                    <CardDescription>{selectedSummary.date}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getSentimentBadge(selectedSummary.sentiment)}
                    {getSentimentIcon(selectedSummary.sentiment)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{selectedSummary.keyPoints.title}</h3>
                      <ul className="space-y-2">
                        {selectedSummary.keyPoints.content.map((point, index) => (
                          <li key={index} className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{selectedSummary.objections.title}</h3>
                      <ul className="space-y-2">
                        {selectedSummary.objections.content.map((objection, index) => (
                          <li key={index} className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                            <span className="text-sm">{objection}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{selectedSummary.actionItems.title}</h3>
                      <ul className="space-y-2">
                        {selectedSummary.actionItems.content.map((action, index) => (
                          <li key={index} className="flex items-start gap-2 bg-gray-50 p-2 rounded-md">
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" onClick={() => setSelectedSummary(null)}>
                    Back to All Summaries
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" /> Generate Email
                    </Button>
                    <Button>
                      <Download className="h-4 w-4 mr-2" /> Download Summary
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MeetingSummaries;
