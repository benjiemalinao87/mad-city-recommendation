'use client';

import React from 'react';
import SlideLayout from '@/components/layout/SlideLayout';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import RecommendationCard from '@/components/cards/RecommendationCard';
import DataTable from '@/components/tables/DataTable';
import { parseMessageDelivery } from '@/utils/csvParser';

// This would normally be fetched from an API or parsed from the CSV files
// For now, we're using sample data
const sampleMessageDeliveryData = [
  { lead_source: 'Exclusive', hour: 9, response_count: 3481 },
  { lead_source: 'Internet', hour: 9, response_count: 4320 },
  { lead_source: 'Home Advisor', hour: 9, response_count: 127 },
  { lead_source: 'Canvass', hour: 9, response_count: 703 },
  { lead_source: 'Home Show', hour: 9, response_count: 157 },
  { lead_source: 'Exclusive', hour: 10, response_count: 2876 },
  { lead_source: 'Internet', hour: 10, response_count: 3245 },
  { lead_source: 'Home Advisor', hour: 10, response_count: 98 },
  { lead_source: 'Canvass', hour: 10, response_count: 567 },
  { lead_source: 'Home Show', hour: 10, response_count: 123 },
  { lead_source: 'Exclusive', hour: 11, response_count: 2345 },
  { lead_source: 'Internet', hour: 11, response_count: 2789 },
  { lead_source: 'Home Advisor', hour: 11, response_count: 87 },
  { lead_source: 'Canvass', hour: 11, response_count: 432 },
  { lead_source: 'Home Show', hour: 11, response_count: 98 },
];

// Sample data for response rates
const responseRateData = [
  { lead_source: 'Exclusive', response_rate: 32.5, opt_out_rate: 30.73, avg_response_time: 24.6 },
  { lead_source: 'Internet', response_rate: 45.2, opt_out_rate: 19.20, avg_response_time: 18.3 },
  { lead_source: 'Home Advisor', response_rate: 28.7, opt_out_rate: 20.29, avg_response_time: 22.1 },
  { lead_source: 'Canvass', response_rate: 38.9, opt_out_rate: 15.45, avg_response_time: 16.8 },
  { lead_source: 'Home Show', response_rate: 42.3, opt_out_rate: 12.32, avg_response_time: 14.5 },
];

// Hourly response data for Internet source
const internetHourlyData = [
  { hour: 7, response_count: 1234 },
  { hour: 8, response_count: 2345 },
  { hour: 9, response_count: 4320 },
  { hour: 10, response_count: 3245 },
  { hour: 11, response_count: 2789 },
  { hour: 12, response_count: 2456 },
  { hour: 13, response_count: 2345 },
  { hour: 14, response_count: 2123 },
  { hour: 15, response_count: 1987 },
  { hour: 16, response_count: 1765 },
  { hour: 17, response_count: 1543 },
  { hour: 18, response_count: 1234 },
  { hour: 19, response_count: 987 },
];

export default function MessageDeliveryPage() {
  return (
    <SlideLayout 
      title="Time-Based Message Delivery" 
      subtitle="Analysis of message delivery performance by lead source and hour of day"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Key Insights</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">1</span>
              <span className="text-gray-700">Internet leads have highest response count (4,320) and response rate (45.2%)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">2</span>
              <span className="text-gray-700">Exclusive leads have highest opt-out rate (30.73%) and longest response time (24.6 hrs)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">3</span>
              <span className="text-gray-700">Home Show leads have lowest opt-out rate (12.32%) and fastest response time (14.5 hrs)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">4</span>
              <span className="text-gray-700">9AM is the optimal message delivery time across all lead sources</span>
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
              <span className="text-gray-700">Implement source-specific message delivery schedules</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Create specialized messaging for Exclusive leads to reduce opt-outs</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Prioritize Internet and Home Show leads for best ROI</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Focus message delivery during 9-11AM window for maximum engagement</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mb-8">
        <BarChart
          title="Response Count by Lead Source (9AM)"
          subtitle="Number of responses for each lead source during peak hour"
          data={sampleMessageDeliveryData.filter(d => d.hour === 9)}
          xAxisKey="lead_source"
          bars={[
            { dataKey: 'response_count', fill: '#3b82f6', name: 'Response Count' },
          ]}
          height={350}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BarChart
          title="Response Rate by Lead Source"
          subtitle="Percentage of leads responding by source"
          data={responseRateData}
          xAxisKey="lead_source"
          bars={[
            { dataKey: 'response_rate', fill: '#10b981', name: 'Response Rate (%)' },
          ]}
          height={300}
        />
        
        <BarChart
          title="Opt-Out Rate by Lead Source"
          subtitle="Percentage of leads opting out by source"
          data={responseRateData}
          xAxisKey="lead_source"
          bars={[
            { dataKey: 'opt_out_rate', fill: '#ef4444', name: 'Opt-Out Rate (%)' },
          ]}
          height={300}
        />
      </div>
      
      <div className="mb-8">
        <LineChart
          title="Internet Lead Response by Hour"
          subtitle="Hourly response pattern for Internet leads"
          data={internetHourlyData}
          xAxisKey="hour"
          lines={[
            { dataKey: 'response_count', stroke: '#3b82f6', name: 'Response Count' },
          ]}
          height={350}
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Message Delivery Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecommendationCard
            title="Source-Specific Message Timing"
            description="Implement tailored message delivery schedules based on lead source response patterns."
            category="message-delivery"
            impact="high"
            implementation="medium"
            actionItems={[
              "Schedule Exclusive lead messages for 9-11AM",
              "Distribute Home Advisor messages throughout 9AM-4PM",
              "Implement quiet hours protocol (10PM-7AM)"
            ]}
          />
          
          <RecommendationCard
            title="Exclusive Lead Messaging"
            description="Develop specialized messaging approach for Exclusive leads to reduce opt-outs."
            category="message-delivery"
            impact="high"
            implementation="medium"
            actionItems={[
              "Create value-focused messaging templates",
              "Implement 2-step opt-in confirmation",
              "Develop educational content series"
            ]}
          />
          
          <RecommendationCard
            title="Lead Source Prioritization"
            description="Allocate resources based on lead source performance metrics."
            category="message-delivery"
            impact="medium"
            implementation="easy"
            actionItems={[
              "Prioritize Internet and Home Show leads",
              "Create specialized agent teams by source",
              "Implement source-specific follow-up protocols"
            ]}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <DataTable
          title="Lead Source Performance Metrics"
          subtitle="Comprehensive analysis of response metrics by lead source"
          data={responseRateData}
          columns={[
            { header: 'Lead Source', accessorKey: 'lead_source' },
            { header: 'Response Rate (%)', accessorKey: 'response_rate' },
            { header: 'Opt-Out Rate (%)', accessorKey: 'opt_out_rate' },
            { header: 'Avg Response Time (hrs)', accessorKey: 'avg_response_time' },
          ]}
        />
      </div>
    </SlideLayout>
  );
}
