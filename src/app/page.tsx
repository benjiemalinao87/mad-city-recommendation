'use client';

import React from 'react';
import SlideLayout from '@/components/layout/SlideLayout';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import HeatMap from '@/components/charts/HeatMap';
import RecommendationCard from '@/components/cards/RecommendationCard';

// This would normally be fetched from an API or parsed from the CSV files
// For now, we're using sample data
const sampleFollowUpData = [
  { initial_message_day: 'Monday', response_day: 'Monday', response_count: 28976, avg_response_time: 42.9 },
  { initial_message_day: 'Tuesday', response_day: 'Tuesday', response_count: 25953, avg_response_time: 11.29 },
  { initial_message_day: 'Friday', response_day: 'Friday', response_count: 25167, avg_response_time: 9.48 },
  { initial_message_day: 'Thursday', response_day: 'Thursday', response_count: 24883, avg_response_time: 8.64 },
  { initial_message_day: 'Wednesday', response_day: 'Wednesday', response_count: 23480, avg_response_time: 14.16 },
  { initial_message_day: 'Monday', response_day: 'Tuesday', response_count: 3597, avg_response_time: 80.95 },
  { initial_message_day: 'Thursday', response_day: 'Friday', response_count: 3431, avg_response_time: 80.25 },
];

const samplePeakHourData = [
  { hour: 9, message_count: 10576, recommended_agents: 2 },
  { hour: 10, message_count: 7656, recommended_agents: 2 },
  { hour: 11, message_count: 6394, recommended_agents: 1 },
  { hour: 12, message_count: 5898, recommended_agents: 1 },
  { hour: 13, message_count: 5867, recommended_agents: 1 },
  { hour: 14, message_count: 5668, recommended_agents: 1 },
  { hour: 15, message_count: 5675, recommended_agents: 1 },
];

const sampleLeadSourceData = [
  { lead_source: 'Exclusive', responses: 3481, opt_out_rate: 30.73 },
  { lead_source: 'Internet', responses: 4320, opt_out_rate: 19.20 },
  { lead_source: 'Home Advisor', responses: 127, opt_out_rate: 20.29 },
  { lead_source: 'Canvass', responses: 703, opt_out_rate: 15.45 },
  { lead_source: 'Home Show', responses: 157, opt_out_rate: 12.32 },
];

export default function Home() {
  return (
    <SlideLayout 
      title="Lead Performance Dashboard" 
      subtitle="Data-driven insights and recommendations for optimizing lead management"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Key Insights</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">1</span>
              <span className="text-gray-700">Highest response count on Monday (28,976) but longest response time (42.9 hrs)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">2</span>
              <span className="text-gray-700">Peak message volume at 9AM (10,576) requiring 2 agents</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">3</span>
              <span className="text-gray-700">Internet leads show highest response count (4,320)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">4</span>
              <span className="text-gray-700">Home Show leads have lowest opt-out rate (12.32%)</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Recommendations</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Optimize Monday staffing for faster response times</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Schedule 2 agents for 9-10AM peak hours</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Prioritize Internet leads during peak hours</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Apply Home Show messaging strategy to other sources</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mb-8">
        <BarChart
          title="Response Count by Day"
          subtitle="Number of responses and average response time by day"
          data={sampleFollowUpData.filter(d => d.initial_message_day === d.response_day)}
          xAxisKey="initial_message_day"
          bars={[
            { dataKey: 'response_count', fill: '#3b82f6', name: 'Response Count' },
          ]}
          height={350}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <LineChart
          title="Message Count by Hour"
          subtitle="Hourly message volume and recommended agents"
          data={samplePeakHourData}
          xAxisKey="hour"
          lines={[
            { dataKey: 'message_count', stroke: '#3b82f6', name: 'Message Count' },
          ]}
          height={300}
        />
        
        <BarChart
          title="Lead Source Performance"
          subtitle="Response count and opt-out rate by lead source"
          data={sampleLeadSourceData}
          xAxisKey="lead_source"
          bars={[
            { dataKey: 'responses', fill: '#10b981', name: 'Responses' },
          ]}
          height={300}
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Strategic Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecommendationCard
            title="Monday Optimization"
            description="Improve response times for Monday leads through strategic staffing."
            category="staffing"
            impact="high"
            implementation="medium"
            actionItems={[
              "Increase Monday morning staff by 25%",
              "Implement automated initial responses",
              "Create dedicated Monday response team"
            ]}
          />
          
          <RecommendationCard
            title="Peak Hour Management"
            description="Optimize staffing and processes for 9-10AM peak hours."
            category="operations"
            impact="high"
            implementation="easy"
            actionItems={[
              "Schedule 2 agents for 9-10AM",
              "Prepare response templates",
              "Implement load balancing system"
            ]}
          />
          
          <RecommendationCard
            title="Lead Source Strategy"
            description="Optimize lead handling based on source performance."
            category="marketing"
            impact="medium"
            implementation="complex"
            actionItems={[
              "Prioritize Internet leads",
              "Apply Home Show messaging tactics",
              "Reduce Exclusive lead opt-outs"
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  );
}
