
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Copy, RefreshCw, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
};

const templates: EmailTemplate[] = [
  {
    id: 'follow-up',
    name: 'Post-Demo Follow-Up',
    subject: 'Following up on our {{Company}} demo',
    body: `Hi {{Name}},

Thank you for your time during our call today. I enjoyed discussing how our solution can help address your team's needs at {{Company}}.

As promised, here's a quick recap of what we covered:

• Feature A: Solving your primary challenge of {{Challenge}}
• Feature B: Improving efficiency by {{Benefit}}
• Feature C: Saving your team approximately {{Savings}}

I've attached the detailed information about our pricing plans we discussed, along with the case studies from similar companies in your industry.

Would you be available for a follow-up call next week to answer any questions from your team? I'm free Tuesday or Wednesday afternoon.

Looking forward to continuing our conversation!

Best regards,`
  },
  {
    id: 'proposal',
    name: 'Proposal & Next Steps',
    subject: 'Your custom proposal for {{Company}}',
    body: `Hi {{Name}},

I hope this email finds you well. Based on our recent discussions about your needs at {{Company}}, I'm pleased to share a customized proposal for your consideration.

Our recommended solution includes:

1. {{Solution Component A}} - Addressing your key challenge of {{Challenge}}
2. {{Solution Component B}} - Providing {{Benefit}}
3. {{Solution Component C}} - With special implementation support

The investment for this custom package is {{Price}}, which includes the onboarding and training we discussed. As mentioned, we can also offer a {{Discount}} discount if we can finalize the agreement by the end of the quarter.

What would be the best next step to move forward? I'd be happy to schedule a call with your team to review the proposal in detail.

Thank you for considering our solution. I'm confident it will deliver exceptional value for {{Company}}.

Best regards,`
  },
  {
    id: 'objection',
    name: 'Addressing Objections',
    subject: 'Addressing your questions about {{Topic}}',
    body: `Hi {{Name}},

Thank you for sharing your concerns about {{Topic}} during our recent conversation. I appreciate your candid feedback and wanted to address these points directly.

Regarding {{Objection 1}}:
Our solution actually addresses this by {{Explanation}}. Many of our clients initially had similar concerns, but found that {{Evidence}} helped overcome this challenge.

On the topic of {{Objection 2}}:
I completely understand your perspective. To address this, we can {{Solution}}, which has worked well for other companies in your industry.

I've attached a case study from {{Similar Company}} that faced similar challenges and how they overcame them using our platform.

Would you be available for a 15-minute call this week to discuss these points further? I'd like to ensure all your concerns are fully addressed.

Looking forward to your thoughts.

Best regards,`
  },
  {
    id: 'check-in',
    name: 'Nurturing Check-in',
    subject: 'Checking in | Resources for {{Company}}',
    body: `Hi {{Name}},

I hope you've been well since we last connected. I wanted to reach out with some resources that might be valuable based on our previous conversations about {{Topic}} at {{Company}}.

I recently came across this industry report that addresses {{Challenge}} that you mentioned was a priority. I've attached it to this email.

Additionally, we've just released a new feature that specifically helps with {{Benefit}} that I thought might interest you.

Is this still an area your team is focused on? I'd be happy to arrange a brief demonstration of how this could work for {{Company}}.

No pressure at all - just wanted to share these resources that aligned with your goals.

Best regards,`
  }
];

const EmailGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('follow-up');
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [generating, setGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleTemplateChange = (value: string) => {
    setSelectedTemplate(value);
    const template = templates.find(t => t.id === value);
    if (template) {
      setEmailSubject(template.subject);
      setEmailBody(template.body);
    }
  };

  const handleGenerateEmail = () => {
    setGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      let subject = emailSubject;
      let body = emailBody;
      
      // Replace placeholders
      if (recipient) {
        body = body.replace(/{{Name}}/g, recipient);
      }
      
      if (company) {
        subject = subject.replace(/{{Company}}/g, company);
        body = body.replace(/{{Company}}/g, company);
      }
      
      // Add some AI-enhanced content based on the template
      if (selectedTemplate === 'follow-up') {
        body = body.replace(/{{Challenge}}/g, 'reducing response times');
        body = body.replace(/{{Benefit}}/g, '32% on average');
        body = body.replace(/{{Savings}}/g, '15 hours per week');
      } else if (selectedTemplate === 'proposal') {
        body = body.replace(/{{Solution Component A}}/g, 'Premium Analytics Platform');
        body = body.replace(/{{Solution Component B}}/g, 'Team Collaboration Tools');
        body = body.replace(/{{Solution Component C}}/g, 'API Integration Package');
        body = body.replace(/{{Challenge}}/g, 'data visibility');
        body = body.replace(/{{Benefit}}/g, 'real-time insights across departments');
        body = body.replace(/{{Price}}/g, '$2,499/month');
        body = body.replace(/{{Discount}}/g, '15%');
      } else if (selectedTemplate === 'objection') {
        body = body.replace(/{{Topic}}/g, 'implementation timeline');
        body = body.replace(/{{Objection 1}}/g, 'implementation timeframes');
        body = body.replace(/{{Explanation}}/g, 'offering a phased approach with dedicated support');
        body = body.replace(/{{Evidence}}/g, 'our 14-day quick start program');
        body = body.replace(/{{Objection 2}}/g, 'team training requirements');
        body = body.replace(/{{Solution}}/g, 'provide custom training sessions');
        body = body.replace(/{{Similar Company}}/g, 'InnoTech Solutions');
      } else if (selectedTemplate === 'check-in') {
        body = body.replace(/{{Topic}}/g, 'team productivity tools');
        body = body.replace(/{{Challenge}}/g, 'cross-department collaboration');
        body = body.replace(/{{Benefit}}/g, 'automated workflow management');
      }
      
      // Update with generated content
      setEmailSubject(subject);
      setEmailBody(body);
      setGenerating(false);
      
      toast.success("Email generated successfully");
    }, 2000);
  };

  const handleCopyToClipboard = () => {
    const emailContent = `Subject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
    toast.success("Email copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleUseLeadData = () => {
    // In a real app, this would pull from selected lead data
    setRecipient('John Smith');
    setCompany('Acme Corporation');
    toast.success("Lead data applied");
  };

  const handleUseMeetingSummary = () => {
    // In a real app, this would incorporate meeting summary data
    toast.success("Meeting summary data incorporated");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Follow-Up Email Generator</h1>
        <p className="text-gray-500 mt-2">Create personalized emails for your leads</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Customize your email template</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Template</label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Recipient Name</label>
                <Input 
                  placeholder="e.g., John Smith" 
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input 
                  placeholder="e.g., Acme Corp" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button className="w-full" onClick={handleGenerateEmail} disabled={generating}>
                {generating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Email
                  </>
                )}
              </Button>
              <div className="flex w-full gap-2">
                <Button variant="outline" className="flex-1" onClick={handleUseLeadData}>
                  Use Lead Data
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleUseMeetingSummary}>
                  Use Summary
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Tone</CardTitle>
              <CardDescription>Adjust the style of your message</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="professional">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="friendly">Friendly</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Generated Email</CardTitle>
              <CardDescription>Preview and edit before sending</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input 
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Email subject"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Body</label>
                <Textarea 
                  className="min-h-[400px] font-mono"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  placeholder="Email body will appear here"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={handleGenerateEmail}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button onClick={handleCopyToClipboard}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
