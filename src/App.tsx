import { FileText, Mail, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CoverLetterGenerator } from '@/components/CoverLetterGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CoverGenius</span>
            </div>
            <Button variant="outline" className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Create Perfect Cover Letters with <span className="text-blue-600">AI</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Generate tailored cover letters in seconds using advanced AI. Stand out from the crowd and land your dream job.
            </p>
          </div>
        </div>
      </div>

      {/* Main Generator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CoverLetterGenerator />

        {/* How It Works Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Paste Job Description</h3>
              <p className="text-gray-600">Simply paste the job description you're applying for</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">Our AI analyzes the requirements and your experience</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Your Letter</h3>
              <p className="text-gray-600">Receive a perfectly tailored cover letter instantly</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                text: "Got an interview at my dream company thanks to the cover letter generated here!"
              },
              {
                name: "Michael Chen",
                role: "Marketing Manager",
                text: "The AI perfectly captured my experience and matched it to the job requirements."
              },
              {
                name: "Emily Davis",
                role: "Product Designer",
                text: "Saved me hours of writing and editing. The quality is impressive!"
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">CoverGenius</h3>
              <p className="text-sm">AI-powered cover letter generator helping job seekers land their dream roles.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <p className="text-sm">Email: covergeniuss@gmail.com</p>
              <p className="text-sm">Contact for any feedback or question</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>Made by solo guy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Disclaimer</h3>
              <p className="text-sm">The AI-generated cover letters are meant to be used as a starting point. We recommend reviewing and personalizing the content before sending.</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © {new Date().getFullYear()} CoverGenius. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;