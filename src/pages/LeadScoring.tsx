
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Users, Building, Calendar, ArrowRight, XCircle } from 'lucide-react';
import { toast } from 'sonner';

type Lead = {
  id: string;
  name: string;
  company: string;
  status: 'hot' | 'warm' | 'cold';
  lastContact: string;
  notes: string;
};

const sampleLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    company: 'Acme Corp',
    status: 'hot',
    lastContact: '2 days ago',
    notes: 'Interested in our enterprise solution. Needs pricing information and case studies.'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'TechGlobal Inc',
    status: 'warm',
    lastContact: '1 week ago',
    notes: 'Currently evaluating multiple solutions. Has concerns about implementation time.'
  },
  {
    id: '3',
    name: 'Michael Chen',
    company: 'Innovate Solutions',
    status: 'warm',
    lastContact: '3 days ago',
    notes: 'Follow-up call scheduled for next week. Requested demo for team members.'
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    company: 'Global Services Ltd',
    status: 'cold',
    lastContact: '3 weeks ago',
    notes: 'Initial interest but no response to follow-ups. May need to reconnect in Q3.'
  },
  {
    id: '5',
    name: 'James Wilson',
    company: 'Strategic Partners',
    status: 'hot',
    lastContact: '1 day ago',
    notes: 'Ready to move forward. Needs contract review by legal team.'
  },
  {
    id: '6',
    name: 'Lisa Taylor',
    company: 'Prime Industries',
    status: 'cold',
    lastContact: '1 month ago',
    notes: 'Budget constraints until next fiscal year. Keep nurturing with content.'
  },
  {
    id: '7',
    name: 'David Kim',
    company: 'Nexus Technologies',
    status: 'warm',
    lastContact: '5 days ago',
    notes: 'Technical evaluation in progress. IT team has additional questions.'
  }
];

const LeadScoring = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleFileUpload = () => {
    setUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast.success("Lead data processed successfully");
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot':
        return 'bg-revbot-hot text-white';
      case 'warm':
        return 'bg-revbot-warm text-white';
      case 'cold':
        return 'bg-revbot-cold text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getLeadCountByStatus = (status: string) => {
    return sampleLeads.filter(lead => lead.status === status).length;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lead Scoring</h1>
        <p className="text-gray-500 mt-2">AI-powered lead prioritization system</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-revbot-hot/90 to-revbot-hot/70 text-white">
          <CardHeader>
            <CardTitle>Hot Leads</CardTitle>
            <CardDescription className="text-white/80">High priority leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{getLeadCountByStatus('hot')}</div>
            <p className="text-sm text-white/80 mt-1">Ready for immediate follow-up</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-revbot-warm/90 to-revbot-warm/70 text-white">
          <CardHeader>
            <CardTitle>Warm Leads</CardTitle>
            <CardDescription className="text-white/80">Medium priority leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{getLeadCountByStatus('warm')}</div>
            <p className="text-sm text-white/80 mt-1">Require nurturing</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-revbot-cold/90 to-revbot-cold/70 text-white">
          <CardHeader>
            <CardTitle>Cold Leads</CardTitle>
            <CardDescription className="text-white/80">Low priority leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{getLeadCountByStatus('cold')}</div>
            <p className="text-sm text-white/80 mt-1">Future opportunities</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lead Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" /> 
              Import Leads CSV
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Leads CSV</DialogTitle>
              <DialogDescription>
                Upload your leads data in CSV format for AI scoring. Required fields: name, company, interaction_notes, last_contact_date.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <div className="mb-3">
                <h3 className="text-md font-medium">Drag and drop your CSV file</h3>
                <p className="text-sm text-gray-500 mt-1">or click to browse</p>
              </div>
              <Button variant="outline">Select File</Button>
            </div>
            {uploading && (
              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center mt-2">Processing lead data: {progress}%</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => {}}>Cancel</Button>
              <Button onClick={handleFileUpload} disabled={uploading}>
                {uploading ? 'Processing...' : 'Upload & Process'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="font-medium border-b pb-2 flex items-center">
            <Badge className={getStatusColor('hot')}>Hot</Badge>
            <span className="ml-2">High Priority Leads</span>
          </h3>
          {sampleLeads
            .filter(lead => lead.status === 'hot')
            .map(lead => (
              <Card key={lead.id} className="bg-white hover:border-revbot-hot cursor-pointer" onClick={() => handleViewLead(lead)}>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{lead.name}</h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Building className="h-3.5 w-3.5 mr-1" />
                        <span>{lead.company}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => {
                      e.stopPropagation();
                      handleViewLead(lead);
                    }}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>Last contact: {lead.lastContact}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>

        <div className="space-y-4">
          <h3 className="font-medium border-b pb-2 flex items-center">
            <Badge className={getStatusColor('warm')}>Warm</Badge>
            <span className="ml-2">Medium Priority Leads</span>
          </h3>
          {sampleLeads
            .filter(lead => lead.status === 'warm')
            .map(lead => (
              <Card key={lead.id} className="bg-white hover:border-revbot-warm cursor-pointer" onClick={() => handleViewLead(lead)}>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{lead.name}</h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Building className="h-3.5 w-3.5 mr-1" />
                        <span>{lead.company}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => {
                      e.stopPropagation();
                      handleViewLead(lead);
                    }}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>Last contact: {lead.lastContact}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>

        <div className="space-y-4">
          <h3 className="font-medium border-b pb-2 flex items-center">
            <Badge className={getStatusColor('cold')}>Cold</Badge>
            <span className="ml-2">Low Priority Leads</span>
          </h3>
          {sampleLeads
            .filter(lead => lead.status === 'cold')
            .map(lead => (
              <Card key={lead.id} className="bg-white hover:border-revbot-cold cursor-pointer" onClick={() => handleViewLead(lead)}>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{lead.name}</h4>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Building className="h-3.5 w-3.5 mr-1" />
                        <span>{lead.company}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => {
                      e.stopPropagation();
                      handleViewLead(lead);
                    }}>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    <span>Last contact: {lead.lastContact}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </div>

      <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent className="sm:max-w-md">
          {selectedLead && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <span>{selectedLead.name}</span>
                  <Badge className={getStatusColor(selectedLead.status)}>
                    {selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1)}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  <span className="font-medium">{selectedLead.company}</span>
                  <span className="text-xs ml-2">Last contacted: {selectedLead.lastContact}</span>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Interaction Notes</h4>
                  <p className="text-sm">{selectedLead.notes}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Recommended Actions</h4>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {selectedLead.status === 'hot' && (
                      <>
                        <li>Schedule a follow-up call within 48 hours</li>
                        <li>Prepare custom proposal based on needs</li>
                        <li>Share relevant case studies</li>
                      </>
                    )}
                    {selectedLead.status === 'warm' && (
                      <>
                        <li>Send follow-up email with additional information</li>
                        <li>Schedule product demo for team</li>
                        <li>Address implementation concerns</li>
                      </>
                    )}
                    {selectedLead.status === 'cold' && (
                      <>
                        <li>Add to nurture email campaign</li>
                        <li>Follow up in 3 months</li>
                        <li>Share relevant industry content periodically</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <Button variant="outline" onClick={() => setSelectedLead(null)}>
                  <XCircle className="h-4 w-4 mr-2" /> Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Users className="h-4 w-4 mr-2" /> Update Score
                  </Button>
                  <Button>
                    <ArrowRight className="h-4 w-4 mr-2" /> Generate Email
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeadScoring;
