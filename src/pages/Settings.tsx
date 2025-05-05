
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Settings = () => {
  const [apiKey, setApiKey] = useState<string>('sk-••••••••••••••••••••••••••••••');
  const [savingSettings, setSavingSettings] = useState<boolean>(false);

  const handleSaveSettings = () => {
    setSavingSettings(true);
    // Simulate saving settings
    setTimeout(() => {
      setSavingSettings(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-2">Manage your application preferences</p>
      </div>

      <Tabs defaultValue="api">
        <TabsList>
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="integration">Integrations</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Configure your OpenAI API settings for transcription and AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input 
                  id="openai-key" 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..." 
                />
                <p className="text-sm text-gray-500">
                  Your API key is required for transcription and AI analysis features.
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-revbot-primary ml-1 hover:underline">
                    Get your API key
                  </a>
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="gpt-model" className="block">GPT Model</Label>
                    <p className="text-sm text-gray-500">Select model for AI analysis</p>
                  </div>
                  <select id="gpt-model" className="border rounded p-2 bg-white">
                    <option value="gpt-4">GPT-4 (Recommended)</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="whisper-model" className="block">Whisper Model</Label>
                    <p className="text-sm text-gray-500">Select model for transcription</p>
                  </div>
                  <select id="whisper-model" className="border rounded p-2 bg-white">
                    <option value="whisper-1">Whisper-1 (Standard)</option>
                    <option value="whisper-large">Whisper Large</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="usage-stats">Usage Statistics</Label>
                    <p className="text-sm text-gray-500">Track your API usage and costs</p>
                  </div>
                  <Switch id="usage-stats" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={savingSettings}>
                {savingSettings ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Connect with external services and tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3 border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Slack Integration</Label>
                    <p className="text-sm text-gray-500">
                      Send AI summaries to a Slack channel
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>

              <div className="space-y-3 border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Google Sheets</Label>
                    <p className="text-sm text-gray-500">
                      Export lead scoring data to Google Sheets
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>

              <div className="space-y-3 border-b pb-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notion</Label>
                    <p className="text-sm text-gray-500">
                      Export meeting notes and action items to Notion
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">CRM Integration</Label>
                    <p className="text-sm text-gray-500">
                      Connect with Salesforce, HubSpot, or other CRM
                    </p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="RevBot Sales Inc." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Job Title</Label>
                <Input id="role" defaultValue="Sales Executive" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Customize when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive updates and reports via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Browser Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Show notifications in your browser
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Summary Report</Label>
                    <p className="text-sm text-gray-500">
                      Receive a weekly digest of call analytics
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Insights Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Get notified of important patterns detected by AI
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
