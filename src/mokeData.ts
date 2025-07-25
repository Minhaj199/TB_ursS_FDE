import {type AnalyticsData } from "./types"; 

export const mockAnalyticsData: AnalyticsData = {
  dailyClicks: [
    { date: '2024-01-15', clicks: 12 },
    { date: '2024-01-16', clicks: 8 },
    { date: '2024-01-17', clicks: 15 },
    { date: '2024-01-18', clicks: 22 },
    { date: '2024-01-19', clicks: 18 },
    { date: '2024-01-20', clicks: 25 },
    { date: '2024-01-21', clicks: 30 }
  ],
  geoData: [
    { country: 'USA', clicks: 45, color: '#8884d8' },
    { country: 'UK', clicks: 25, color: '#82ca9d' },
    { country: 'Canada', clicks: 15, color: '#ffc658' },
    { country: 'Others', clicks: 15, color: '#ff7c7c' }
  ]
};