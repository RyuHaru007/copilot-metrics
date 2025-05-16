import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getDashboardData, getOrganizationChartData, getLanguagesData, getEditorsData, getCopilotChatData, getSeatAnalysisData } from '@/data/mockData';
import { Copy } from 'lucide-react';

const ApiResponse: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  
  const mockData = {
    dashboard: {
      '28days': getDashboardData('28days'),
      '6months': getDashboardData('6months'),
      '1year': getDashboardData('1year'),
      '5years': getDashboardData('5years'),
      'all': getDashboardData('all'),
    },
    organization: {
      '28days': getOrganizationChartData('28days'),
      '6months': getOrganizationChartData('6months'),
      '1year': getOrganizationChartData('1year'),
      '5years': getOrganizationChartData('5years'),
      'all': getOrganizationChartData('all'),
    },
    languages: {
      '28days': getLanguagesData('28days'),
      '6months': getLanguagesData('6months'),
      '1year': getLanguagesData('1year'),
      '5years': getLanguagesData('5years'),
      'all': getLanguagesData('all'),
    },
    editors: {
      '28days': getEditorsData('28days'),
      '6months': getEditorsData('6months'),
      '1year': getEditorsData('1year'),
      '5years': getEditorsData('5years'),
      'all': getEditorsData('all'),
    },
    copilotChat: {
      '28days': getCopilotChatData('28days'),
      '6months': getCopilotChatData('6months'),
      '1year': getCopilotChatData('1year'),
      '5years': getCopilotChatData('5years'),
      'all': getCopilotChatData('all'),
    },
    seatAnalysis: {
      '28days': getSeatAnalysisData('28days'),
      '6months': getSeatAnalysisData('6months'),
      '1year': getSeatAnalysisData('1year'),
      '5years': getSeatAnalysisData('5years'),
      'all': getSeatAnalysisData('all'),
    },
  };
  
  const sections = [
    { id: 'dashboard', title: 'Dashboard Data' },
    { id: 'organization', title: 'Organization Data' },
    { id: 'languages', title: 'Languages Data' },
    { id: 'editors', title: 'Editors Data' },
    { id: 'copilotChat', title: 'Copilot Chat Data' },
    { id: 'seatAnalysis', title: 'Seat Analysis Data' },
  ];
  
  const copyToClipboard = (id: string) => {
    const data = mockData[id as keyof typeof mockData];
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">API Response</h1>
      <p className="text-gray-600">This page contains all the mock data used in the application. You can copy the JSON for each section.</p>
      
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.id} className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">{section.title}</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => copyToClipboard(section.id)}
                className="flex items-center gap-2"
              >
                <Copy size={16} />
                {copied === section.id ? 'Copied!' : 'Copy JSON'}
              </Button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md overflow-auto max-h-72">
              <pre className="text-xs text-gray-800">
                {JSON.stringify(mockData[section.id as keyof typeof mockData], null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiResponse;