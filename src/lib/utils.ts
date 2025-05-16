import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TimeRange = "28days" | "6months" | "1year" | "5years" | "all";

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}

export function formatPercent(num: number): string {
  return num.toFixed(2) + "%";
}

export function getTimeRangeLabel(range: TimeRange): string {
  switch (range) {
    case "28days":
      return "28 days";
    case "6months":
      return "6 months";
    case "1year":
      return "1 year";
    case "5years":
      return "5 years";
    case "all":
      return "All time";
    default:
      return "28 days";
  }
}

// Function to generate dates for x-axis
export function generateDateLabels(range: TimeRange): string[] {
  const now = new Date();
  const labels: string[] = [];
  
  let totalLabels = 7;
  let intervalDays = 4;
  
  switch (range) {
    case "28days":
      totalLabels = 7;
      intervalDays = 4;
      break;
    case "6months":
      totalLabels = 6;
      intervalDays = 30;
      break;
    case "1year":
      totalLabels = 6;
      intervalDays = 60;
      break;
    case "5years":
      totalLabels = 5;
      intervalDays = 365;
      break;
    case "all":
      totalLabels = 5;
      intervalDays = 500;
      break;
  }
  
  for (let i = totalLabels - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i * intervalDays);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  
  return labels;
}