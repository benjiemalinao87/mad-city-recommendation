import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface OptimalFollowUpTiming {
  initial_message_day: string;
  response_day: string;
  response_count: number;
  avg_response_time: number;
}

export interface PeakHourStaffing {
  hour: number;
  message_count: number;
  recommended_agents: number;
}

export interface MessageDelivery {
  lead_source: string;
  hour_of_day: number;
  response_count: number;
}

export const parseOptimalFollowUpTiming = (): OptimalFollowUpTiming[] => {
  const filePath = path.join(process.cwd(), 'src/data/optimal follow-up timing .csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    cast: (value, context) => {
      if (context.column === 'response_count') {
        return parseInt(value.replace(/,/g, ''));
      }
      if (context.column === 'avg_response_time') {
        return parseFloat(value);
      }
      return value;
    }
  });
  
  return records;
};

export const parsePeakHourStaffing = (): PeakHourStaffing[] => {
  const filePath = path.join(process.cwd(), 'src/data/Peak Hour Staffing Model.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    cast: (value, context) => {
      if (context.column === 'hour') {
        return parseInt(value);
      }
      if (context.column === 'message_count') {
        return parseInt(value.replace(/,/g, ''));
      }
      if (context.column === 'recommended_agents') {
        return parseInt(value);
      }
      return value;
    }
  });
  
  return records;
};

export const parseMessageDelivery = (): MessageDelivery[] => {
  const filePath = path.join(process.cwd(), 'src/data/Time-Based Message Delivery.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    cast: (value, context) => {
      if (context.column === 'hour_of_day') {
        return parseInt(value);
      }
      if (context.column === 'response_count') {
        return parseInt(value.replace(/,/g, ''));
      }
      return value;
    }
  });
  
  return records;
};

export const parseOptimalMessageSendingTimes = (): MessageDelivery[] => {
  const filePath = path.join(process.cwd(), 'src/data/optimal message sending times by lead source.csv');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    cast: (value, context) => {
      if (context.column === 'hour_of_day') {
        return parseInt(value);
      }
      if (context.column === 'response_count') {
        return parseInt(value.replace(/,/g, ''));
      }
      return value;
    }
  });
  
  return records;
};
