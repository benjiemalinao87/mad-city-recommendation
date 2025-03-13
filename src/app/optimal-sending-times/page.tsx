'use client';

import React from 'react';
import SlideLayout from '@/components/layout/SlideLayout';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import RecommendationCard from '@/components/cards/RecommendationCard';
import DataTable from '@/components/tables/DataTable';
import { parseOptimalSendingTimes } from '@/utils/csvParser';

// This would normally be fetched from an API or parsed from the CSV files
// For now, we're using sample data
const sampleOptimalTimesData = [
  { lead_source: 'Exclusive', hour: 9, response_count: 3481 },
  { lead_source: 'Exclusive', hour: 10, response_count: 2876 },
  { lead_source: 'Exclusive', hour: 11, response_count: 2345 },
  { lead_source: 'Exclusive', hour: 12, response_count: 1987 },
  { lead_source: 'Exclusive', hour: 13, response_count: 1765 },
  
  { lead_source: 'Internet', hour: 9, response_count: 4320 },
  { lead_source: 'Internet', hour: 10, response_count: 3245 },
  { lead_source: 'Internet', hour: 11, response_count: 2789 },
  { lead_source: 'Internet', hour: 12, response_count: 2456 },
  { lead_source: 'Internet', hour: 13, response_count: 2345 },
  
  { lead_source: 'Home Advisor', hour: 9, response_count: 127 },
  { lead_source: 'Home Advisor', hour: 10, response_count: 98 },
  { lead_source: 'Home Advisor', hour: 11, response_count: 87 },
  { lead_source: 'Home Advisor', hour: 12, response_count: 76 },
  { lead_source: 'Home Advisor', hour: 13, response_count: 65 },
  
  { lead_source: 'Canvass', hour: 9, response_count: 703 },
  { lead_source: 'Canvass', hour: 10, response_count: 567 },
  { lead_source: 'Canvass', hour: 11, response_count: 432 },
  { lead_source: 'Canvass', hour: 12, response_count: 387 },
  { lead_source: 'Canvass', hour: 13, response_count: 345 },
  
  { lead_source: 'Home Show', hour: 9, response_count: 157 },
  { lead_source: 'Home Show', hour: 10, response_count: 123 },
  { lead_source: 'Home Show', hour: 11, response_count: 98 },
  { lead_source: 'Home Show', hour: 12, response_count: 87 },
  { lead_source: 'Home Show', hour: 13, response_count: 76 },
];

// Sample data for conversion rates
const conversionRateData = [
  { lead_source: 'Exclusive', optimal_hour: 9, response_rate: 32.5, conversion_rate: 12.8 },
  { lead_source: 'Internet', optimal_hour: 9, response_rate: 45.2, conversion_rate: 18.7 },
  { lead_source: 'Home Advisor', optimal_hour: 9, response_rate: 28.7, conversion_rate: 10.2 },
  { lead_source: 'Canvass', optimal_hour: 9, response_rate: 38.9, conversion_rate: 15.4 },
  { lead_source: 'Home Show', optimal_hour: 9, response_rate: 42.3, conversion_rate: 17.6 },
];

// Prepare data for hourly comparison chart
const prepareHourlyComparisonData = () => {
  const hours = [9, 10, 11, 12, 13];
  return hours.map(hour => {
    const hourData = { hour };
    sampleOptimalTimesData
      .filter(d => d.hour === hour)
      .forEach(d => {
        hourData[d.lead_source] = d.response_count;
      });
    return hourData;
  });
};

const hourlyComparisonData = prepareHourlyComparisonData();

export default function OptimalSendingTimesPage() {
  return (
    <SlideLayout 
      title="Optimal Message Sending Times by Lead Source" 
      subtitle="Analysis of the best times to send messages based on lead source response patterns"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Key Insights</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">1</span>
              <span className="text-gray-700">9AM is the optimal sending time across all lead sources</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">2</span>
              <span className="text-gray-700">Internet leads show highest response count (4,320) and conversion rate (18.7%)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">3</span>
              <span className="text-gray-700">Response rates decline consistently after 9AM across all sources</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">4</span>
              <span className="text-gray-700">Home Show leads have second-highest conversion rate (17.6%) despite lower volume</span>
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
              <span className="text-gray-700">Prioritize 9AM message delivery for all lead sources</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Allocate more resources to Internet and Home Show leads</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Implement staggered sending for high-volume sources</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Create source-specific message templates optimized for morning delivery</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mb-8">
        <BarChart
          title="Response Count by Lead Source at 9AM"
          subtitle="Number of responses for each lead source during optimal hour"
          data={sampleOptimalTimesData.filter(d => d.hour === 9)}
          xAxisKey="lead_source"
          bars={[
            { dataKey: 'response_count', fill: '#3b82f6', name: 'Response Count' },
          ]}
          height={350}
        />
      </div>
      
      <div className="mb-8">
        <LineChart
          title="Hourly Response Patterns by Lead Source"
          subtitle="Response count trends throughout the day by lead source"
          data={hourlyComparisonData}
          xAxisKey="hour"
          lines={[
            { dataKey: 'Exclusive', stroke: '#ef4444', name: 'Exclusive' },
            { dataKey: 'Internet', stroke: '#3b82f6', name: 'Internet' },
            { dataKey: 'Home Advisor', stroke: '#10b981', name: 'Home Advisor' },
            { dataKey: 'Canvass', stroke: '#8b5cf6', name: 'Canvass' },
            { dataKey: 'Home Show', stroke: '#f59e0b', name: 'Home Show' },
          ]}
          height={350}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BarChart
          title="Response Rate by Lead Source"
          subtitle="Percentage of leads responding at optimal hour"
          data={conversionRateData}
          xAxisKey="lead_source"
          bars={[
            { dataKey: 'response_rate', fill: '#10b981', name: 'Response Rate (%)' },
          ]}
          height={300}
        />
        
        <BarChart
          title="Conversion Rate by Lead Source"
          subtitle="Percentage of leads converting to appointments at optimal hour"
          data={conversionRateData}
          xAxisKey="lead_source"
          bars={[
            { dataKey: 'conversion_rate', fill: '#8b5cf6', name: 'Conversion Rate (%)' },
          ]}
          height={300}
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Sending Time Optimization Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecommendationCard
            title="Morning Message Prioritization"
            description="Optimize message delivery during peak morning hours."
            category="message-delivery"
            impact="high"
            implementation="easy"
            actionItems={[
              "Prioritize all messages for 9AM delivery",
              "Implement queue system for high-volume periods",
              "Create pre-scheduled message templates"
            ]}
          />
          
          <RecommendationCard
            title="Source-Based Staggered Sending"
            description="Implement staggered sending schedule based on lead source priority."
            category="message-delivery"
            impact="medium"
            implementation="medium"
            actionItems={[
              "Internet leads: 9:00-9:20AM",
              "Home Show leads: 9:20-9:40AM",
              "Exclusive leads: 9:40-10:00AM"
            ]}
          />
          
          <RecommendationCard
            title="Lead Source Investment Strategy"
            description="Allocate marketing budget based on lead source performance metrics."
            category="marketing-budget"
            impact="high"
            implementation="complex"
            actionItems={[
              "Increase Internet lead acquisition budget by 25%",
              "Expand Home Show participation by 15%",
              "Reallocate 10% of Exclusive budget to higher-performing sources"
            ]}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <DataTable
          title="Lead Source Performance at Optimal Hour"
          subtitle="Comprehensive analysis of lead source performance at 9AM"
          data={conversionRateData}
          columns={[
            { header: 'Lead Source', accessorKey: 'lead_source' },
            { header: 'Optimal Hour', accessorKey: 'optimal_hour' },
            { header: 'Response Rate (%)', accessorKey: 'response_rate' },
            { header: 'Conversion Rate (%)', accessorKey: 'conversion_rate' },
          ]}
        />
      </div>
    </SlideLayout>
  );
}
