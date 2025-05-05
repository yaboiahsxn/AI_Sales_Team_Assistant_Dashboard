
import React, { useState } from 'react';
import { Upload, FileText, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const CallUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [transcriptionText, setTranscriptionText] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [transcribing, setTranscribing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscriptionText(e.target.value);
  };

  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate file upload
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploading(false);
          simulateTranscription();
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateTranscription = () => {
    setTranscribing(true);
    
    // Simulate transcription delay
    setTimeout(() => {
      setTranscribing(false);
      setTranscriptionText(
        "Sales Rep: Hi there, thanks for joining the call today. I'm excited to show you our new product features.\n\n" +
        "Customer: Thanks for having me. I'm really interested in learning more about your solution.\n\n" +
        "Sales Rep: Great! Our platform can help increase your team's productivity by 30%.\n\n" +
        "Customer: That sounds impressive, but I'm concerned about the implementation timeline.\n\n" +
        "Sales Rep: I understand your concern. Typically our customers are up and running within 2 weeks.\n\n" +
        "Customer: That's good to hear. What about pricing? Is it within our budget constraints?\n\n" +
        "Sales Rep: We have flexible pricing options. I can prepare a custom quote based on your team size.\n\n" +
        "Customer: Perfect. I'd also like to know about the integration with our existing tools.\n\n" +
        "Sales Rep: Absolutely, we have built-in integrations with most major tools, and an API for custom integrations."
      );
      toast.success("Transcription completed");
    }, 3000);
  };

  const handlePasteText = () => {
    toast.success("Ready to process text input");
  };

  const handleDownloadTranscription = () => {
    const element = document.createElement("a");
    const file = new Blob([transcriptionText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "call_transcription.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Transcription downloaded");
  };

  const handleAnalyzeCall = () => {
    if (!transcriptionText) {
      toast.error("Please upload or paste a call transcription first");
      return;
    }
    
    toast.success("Analyzing call content", {
      description: "Redirecting to summary view"
    });
    
    // In a real app, you would navigate to the summary page here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Call Upload & Transcription</h1>
        <p className="text-gray-500 mt-2">Upload call recordings or paste transcripts for analysis</p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upload">Upload Audio/Video</TabsTrigger>
          <TabsTrigger value="paste">Paste Transcription</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Upload Call Recording</CardTitle>
                <CardDescription>
                  Supported formats: MP3, WAV, MP4 (max 200MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  {!file ? (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mb-4" />
                      <div className="mb-4">
                        <h3 className="text-lg font-medium">Drag and drop your file</h3>
                        <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                      </div>
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".mp3,.wav,.mp4"
                        onChange={handleFileChange}
                      />
                      <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                        Select File
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <FileText className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium">{file.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <div className="flex items-center mt-4 gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => setFile(null)}
                        >
                          <X className="h-4 w-4 mr-1" /> Remove
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleUpload}
                          disabled={uploading || transcribing}
                        >
                          <Upload className="h-4 w-4 mr-1" /> Upload & Transcribe
                        </Button>
                      </div>
                      {uploading && (
                        <div className="mt-4 w-full">
                          <Progress value={uploadProgress} className="h-2" />
                          <p className="text-xs text-center mt-2">Uploading: {uploadProgress}%</p>
                        </div>
                      )}
                      {transcribing && (
                        <div className="mt-4">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-revbot-primary border-t-transparent"></div>
                            <span className="text-sm">Transcribing audio...</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Transcription Result</CardTitle>
                  <CardDescription>Transcribed text from your call</CardDescription>
                </div>
                {transcriptionText && (
                  <Button variant="outline" size="sm" onClick={handleDownloadTranscription}>
                    Download
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <Textarea 
                  className="min-h-[300px]" 
                  placeholder="Transcription will appear here..."
                  value={transcriptionText}
                  onChange={handleTextChange}
                  readOnly={transcribing}
                />
              </CardContent>
              {transcriptionText && (
                <CardFooter className="flex justify-end">
                  <Button onClick={handleAnalyzeCall}>
                    Analyze Call Content
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="paste" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paste Call Transcription</CardTitle>
              <CardDescription>
                Paste an existing transcription for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                className="min-h-[300px]" 
                placeholder="Paste your call transcription here..."
                value={transcriptionText}
                onChange={handleTextChange}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePasteText}>
                <Check className="h-4 w-4 mr-1" /> Confirm Text Input
              </Button>
              <Button onClick={handleAnalyzeCall} disabled={!transcriptionText}>
                Analyze Call Content
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CallUpload;
