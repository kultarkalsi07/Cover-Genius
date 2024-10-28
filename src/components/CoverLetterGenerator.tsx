import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, Check, Sparkles } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { GEMINI_API_KEY, API_URL } from '@/lib/constants';

export function CoverLetterGenerator() {
  const [jobDescription, setJobDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    experience: '',
    skills: ''
  });

  const resultRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePrompt = () => {
    return `Generate a professional cover letter for ${userInfo.name} applying for the following job:

Job Description:
${jobDescription}

Candidate's Skills:
${userInfo.skills}

Relevant Experience:
${userInfo.experience}

Please write a compelling cover letter that highlights the candidate's skills and experience in relation to the job requirements.`;
  };

  const generateWithGemini = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: generatePrompt()
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      setCoverLetter(generatedText);
      
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (err) {
      setError('Failed to generate cover letter. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Generate Your Cover Letter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Your Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={userInfo.name}
                onChange={(e) => setUserInfo(prev => ({...prev, name: e.target.value}))}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">Key Skills</label>
              <textarea
                className="w-full h-24 p-2 border rounded-md"
                value={userInfo.skills}
                onChange={(e) => setUserInfo(prev => ({...prev, skills: e.target.value}))}
                placeholder="List your key skills relevant to the position"
              />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium">Relevant Experience</label>
              <textarea
                className="w-full h-32 p-2 border rounded-md"
                value={userInfo.experience}
                onChange={(e) => setUserInfo(prev => ({...prev, experience: e.target.value}))}
                placeholder="Briefly describe your relevant work experience..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Job Description
            </label>
            <textarea
              className="w-full h-48 p-2 border rounded-md"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={generateWithGemini}
            disabled={!jobDescription.trim() || !userInfo.name || loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!loading && <Sparkles className="mr-2 h-4 w-4" />}
            {loading ? 'Generating...' : 'Generate Cover Letter'}
          </Button>
        </CardContent>
      </Card>

      {coverLetter && (
        <div ref={resultRef} className="w-full max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Generated Cover Letter</CardTitle>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-6 border rounded-md whitespace-pre-wrap bg-gray-50">
                {coverLetter}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}