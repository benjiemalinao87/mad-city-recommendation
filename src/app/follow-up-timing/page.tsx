'use client';

import React from 'react';
import SlideLayout from '@/components/layout/SlideLayout';
import HeatMap from '@/components/charts/HeatMap';
import LineChart from '@/components/charts/LineChart';
import RecommendationCard from '@/components/cards/RecommendationCard';
import { parseOptimalFollowUpTiming } from '@/utils/csvParser';

// This would normally be fetched from an API or parsed from the CSV files
// For now, we're using sample data
const sampleFollowUpData = [
  { initial_message_day: 'Monday', response_day: 'Monday', response_count: 28976, avg_response_time: 42.9 },
  { initial_message_day: 'Tuesday', response_day: 'Tuesday', response_count: 25953, avg_response_time: 11.29 },
  { initial_message_day: 'Friday', response_day: 'Friday', response_count: 25167, avg_response_time: 9.48 },
  { initial_message_day: 'Thursday', response_day: 'Thursday', response_count: 24883, avg_response_time: 8.64 },
  { initial_message_day: 'Wednesday', response_day: 'Wednesday', response_count: 23480, avg_response_time: 14.16 },
  { initial_message_day: 'Monday', response_day: 'Tuesday', response_count: 3597, avg_response_time: 80.95 },
  { initial_message_day: 'Tuesday', response_day: 'Wednesday', response_count: 3485, avg_response_time: 75.32 },
  { initial_message_day: 'Thursday', response_day: 'Friday', response_count: 3431, avg_response_time: 80.25 },
  { initial_message_day: 'Wednesday', response_day: 'Thursday', response_count: 3398, avg_response_time: 78.12 },
  { initial_message_day: 'Friday', response_day: 'Saturday', response_count: 2975, avg_response_time: 82.45 },
  { initial_message_day: 'Saturday', response_day: 'Sunday', response_count: 2564, avg_response_time: 86.32 },
  { initial_message_day: 'Sunday', response_day: 'Monday', response_count: 3125, avg_response_time: 85.76 },
];

// Sample data for response time chart
const responseTimeData = [
  { day: 'Monday', same_day: 42.9, next_day: 80.95 },
  { day: 'Tuesday', same_day: 11.29, next_day: 75.32 },
  { day: 'Wednesday', same_day: 14.16, next_day: 78.12 },
  { day: 'Thursday', same_day: 8.64, next_day: 80.25 },
  { day: 'Friday', same_day: 9.48, next_day: 82.45 },
  { day: 'Saturday', same_day: 15.76, next_day: 86.32 },
  { day: 'Sunday', same_day: 18.35, next_day: 85.76 },
];

export default function FollowUpTimingPage() {
  return (
    <SlideLayout 
      title="Optimal Follow-Up Timing" 
      subtitle="Analysis of message response patterns by day of week"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Key Insights</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">1</span>
              <span className="text-gray-700">Highest same-day response volumes occur on <strong>Monday (28,976)</strong>, followed by Tuesday (25,953)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">2</span>
              <span className="text-gray-700">Best cross-day transitions: Monday→Tuesday (3,597) and Thursday→Friday (3,431)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">3</span>
              <span className="text-gray-700">Fastest same-day response times: Thursday (8.64 hrs) and Friday (9.48 hrs)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">4</span>
              <span className="text-gray-700">Monday has highest response volume but longest response time (42.9 hrs)</span>
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
              <span className="text-gray-700">Prioritize Thursday and Friday for time-sensitive messages</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Implement Monday→Tuesday and Thursday→Friday follow-up sequences</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Increase agent allocation on Monday to handle high volume</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Develop specialized messaging for weekend leads (Saturday-Sunday)</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mb-8">
        <HeatMap
          title="Response Count Heatmap by Day"
          subtitle="Number of responses based on initial message day and response day"
          data={sampleFollowUpData}
          height={450}
        />
      </div>
      
      <div className="mb-8">
        <LineChart
          title="Average Response Time by Day"
          subtitle="Comparison of same-day vs. next-day response times (hours)"
          data={responseTimeData}
          xAxisKey="day"
          lines={[
            { dataKey: 'same_day', stroke: '#3b82f6', name: 'Same Day Response Time (hrs)' },
            { dataKey: 'next_day', stroke: '#ef4444', name: 'Next Day Response Time (hrs)' },
          ]}
          height={350}
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Follow-Up Strategy Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecommendationCard
            title="Day-Based Follow-Up Protocol"
            description="Implement day-specific follow-up strategies based on response patterns."
            category="follow-up"
            impact="high"
            implementation="medium"
            actionItems={[
              "Monday messages: follow up Tuesday morning",
              "Thursday messages: follow up Friday morning",
              "Implement 4-hour follow-up for quick responders"
            ]}
          />
          
          <RecommendationCard
            title="Weekend Response Strategy"
            description="Develop specialized approach for weekend messaging and follow-ups."
            category="follow-up"
            impact="medium"
            implementation="easy"
            actionItems={[
              "Send Sunday evening messages for Monday morning visibility",
              "Create weekend-specific templates with longer response expectations",
              "Implement automated follow-up for weekend leads"
            ]}
          />
          
          <RecommendationCard
            title="Response Time Optimization"
            description="Adjust message timing to minimize response times."
            category="follow-up"
            impact="medium"
            implementation="complex"
            actionItems={[
              "Send time-sensitive messages on Thursday/Friday",
              "Implement lead scoring based on day-specific response likelihood",
              "Create urgency indicators for Monday messages"
            ]}
          />
        </div>
      </div>
    </SlideLayout>
  );
}
