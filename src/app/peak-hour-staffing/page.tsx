'use client';

import React from 'react';
import SlideLayout from '@/components/layout/SlideLayout';
import BarChart from '@/components/charts/BarChart';
import LineChart from '@/components/charts/LineChart';
import RecommendationCard from '@/components/cards/RecommendationCard';
import DataTable from '@/components/tables/DataTable';
import { parsePeakHourStaffing } from '@/utils/csvParser';

// This would normally be fetched from an API or parsed from the CSV files
// For now, we're using sample data
const samplePeakHourData = [
  { hour: 9, message_count: 10576, recommended_agents: 4 },
  { hour: 10, message_count: 7656, recommended_agents: 3 },
  { hour: 11, message_count: 6394, recommended_agents: 2 },
  { hour: 12, message_count: 5898, recommended_agents: 2 },
  { hour: 13, message_count: 5867, recommended_agents: 2 },
  { hour: 14, message_count: 5668, recommended_agents: 2 },
  { hour: 15, message_count: 5675, recommended_agents: 2 },
  { hour: 16, message_count: 4532, recommended_agents: 2 },
  { hour: 17, message_count: 3245, recommended_agents: 1 },
  { hour: 18, message_count: 2876, recommended_agents: 1 },
  { hour: 19, message_count: 2134, recommended_agents: 1 },
  { hour: 20, message_count: 1567, recommended_agents: 1 },
  { hour: 21, message_count: 987, recommended_agents: 0 },
  { hour: 22, message_count: 654, recommended_agents: 0 },
  { hour: 23, message_count: 432, recommended_agents: 0 },
  { hour: 0, message_count: 321, recommended_agents: 0 },
  { hour: 1, message_count: 234, recommended_agents: 0 },
  { hour: 2, message_count: 156, recommended_agents: 0 },
  { hour: 3, message_count: 123, recommended_agents: 0 },
  { hour: 4, message_count: 145, recommended_agents: 0 },
  { hour: 5, message_count: 234, recommended_agents: 0 },
  { hour: 6, message_count: 567, recommended_agents: 0 },
  { hour: 7, message_count: 1234, recommended_agents: 1 },
  { hour: 8, message_count: 3456, recommended_agents: 1 },
];

// Sample data for agent efficiency
const agentEfficiencyData = [
  { hour: 9, messages_per_agent: 2644, response_rate: 78.5 },
  { hour: 10, messages_per_agent: 2552, response_rate: 76.2 },
  { hour: 11, messages_per_agent: 3197, response_rate: 74.8 },
  { hour: 12, messages_per_agent: 2949, response_rate: 72.3 },
  { hour: 13, messages_per_agent: 2934, response_rate: 71.5 },
  { hour: 14, messages_per_agent: 2834, response_rate: 70.2 },
  { hour: 15, messages_per_agent: 2838, response_rate: 69.8 },
  { hour: 16, messages_per_agent: 2266, response_rate: 68.5 },
  { hour: 17, messages_per_agent: 3245, response_rate: 67.2 },
  { hour: 18, messages_per_agent: 2876, response_rate: 65.8 },
  { hour: 19, messages_per_agent: 2134, response_rate: 64.3 },
];

export default function PeakHourStaffingPage() {
  return (
    <SlideLayout 
      title="Peak Hour Staffing Model" 
      subtitle="Optimizing agent allocation based on message volume patterns"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Key Insights</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">1</span>
              <span className="text-gray-700">Peak message volume occurs at <strong>9AM (10,576 messages)</strong>, requiring 4 agents</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">2</span>
              <span className="text-gray-700">Secondary peak at 10AM (7,656 messages), requiring 3 agents</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">3</span>
              <span className="text-gray-700">Agent efficiency peaks at 11AM (3,197 messages per agent)</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 mr-3 flex-shrink-0">4</span>
              <span className="text-gray-700">Response rates decline throughout the day, from 78.5% at 9AM to 64.3% by 7PM</span>
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
              <span className="text-gray-700">Allocate 4 agents during 9AM peak hour</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Maintain 3 agents during 10AM secondary peak</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Implement rotating shifts to maintain coverage from 9AM-7PM</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-gray-700">Implement agent incentives for maintaining high response rates in afternoon hours</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mb-8">
        <BarChart
          title="Message Volume by Hour"
          subtitle="Message count distribution across 24 hours with recommended agent allocation"
          data={samplePeakHourData}
          xAxisKey="hour"
          bars={[
            { dataKey: 'message_count', fill: '#3b82f6', name: 'Message Count' },
          ]}
          height={350}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <BarChart
          title="Recommended Agents by Hour"
          subtitle="Optimal agent allocation based on message volume"
          data={samplePeakHourData.filter(d => d.hour >= 7 && d.hour <= 21)}
          xAxisKey="hour"
          bars={[
            { dataKey: 'recommended_agents', fill: '#8b5cf6', name: 'Recommended Agents' },
          ]}
          height={300}
        />
        
        <LineChart
          title="Agent Efficiency Metrics"
          subtitle="Messages per agent and response rate by hour"
          data={agentEfficiencyData}
          xAxisKey="hour"
          lines={[
            { dataKey: 'messages_per_agent', stroke: '#3b82f6', name: 'Messages Per Agent' },
            { dataKey: 'response_rate', stroke: '#10b981', name: 'Response Rate (%)' },
          ]}
          height={300}
        />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Staffing Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecommendationCard
            title="Peak Hour Agent Allocation"
            description="Optimize agent staffing based on hourly message volume data."
            category="agent-allocation"
            impact="high"
            implementation="easy"
            actionItems={[
              "Allocate 4 agents during 9-10AM peak",
              "Maintain 2-3 agents during 11AM-4PM",
              "Reduce to 1 agent during evening hours"
            ]}
          />
          
          <RecommendationCard
            title="Agent Specialization Strategy"
            description="Create specialized agent teams based on lead source and time of day."
            category="agent-allocation"
            impact="medium"
            implementation="medium"
            actionItems={[
              "Assign high-performing agents to peak hours",
              "Create specialized teams for high-value lead sources",
              "Implement performance-based incentives"
            ]}
          />
          
          <RecommendationCard
            title="Response Rate Optimization"
            description="Implement strategies to maintain high response rates throughout the day."
            category="agent-allocation"
            impact="medium"
            implementation="complex"
            actionItems={[
              "Create afternoon response rate incentives",
              "Implement agent rotation to prevent fatigue",
              "Develop automated response templates for common queries"
            ]}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <DataTable
          title="Hourly Staffing Model"
          subtitle="Detailed breakdown of message volume and recommended agent allocation"
          data={samplePeakHourData.filter(d => d.hour >= 7 && d.hour <= 21).map(d => ({
            ...d,
            hour: `${d.hour}:00`,
            efficiency: Math.round(d.message_count / (d.recommended_agents || 1))
          }))}
          columns={[
            { header: 'Hour', accessorKey: 'hour' },
            { header: 'Message Count', accessorKey: 'message_count' },
            { header: 'Recommended Agents', accessorKey: 'recommended_agents' },
            { header: 'Messages Per Agent', accessorKey: 'efficiency' },
          ]}
        />
      </div>
    </SlideLayout>
  );
}
