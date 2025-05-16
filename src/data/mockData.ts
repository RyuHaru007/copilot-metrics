import { TimeRange } from '@/lib/utils';

// Dashboard data
export interface DashboardData {
  acceptanceRateByCount: number;
  totalSuggestionCount: number;
  acceptanceRateByLines: number;
  totalLinesSuggested: number;
  languageCount: number;
  editorCount: number;
  cumulativeTurns: number;
  cumulativeAcceptances: number;
}

const dashboardData: Record<TimeRange, DashboardData> = {
  "28days": {
    acceptanceRateByCount: 31.36,
    totalSuggestionCount: 21255,
    acceptanceRateByLines: 17.70,
    totalLinesSuggested: 60598,
    languageCount: 15,
    editorCount: 2,
    cumulativeTurns: 2035,
    cumulativeAcceptances: 670
  },
  "6months": {
    acceptanceRateByCount: 33.25,
    totalSuggestionCount: 119370,
    acceptanceRateByLines: 19.45,
    totalLinesSuggested: 342875,
    languageCount: 18,
    editorCount: 2,
    cumulativeTurns: 12546,
    cumulativeAcceptances: 4356
  },
  "1year": {
    acceptanceRateByCount: 34.12,
    totalSuggestionCount: 245890,
    acceptanceRateByLines: 21.30,
    totalLinesSuggested: 723456,
    languageCount: 20,
    editorCount: 2,
    cumulativeTurns: 28950,
    cumulativeAcceptances: 9872
  },
  "5years": {
    acceptanceRateByCount: 35.78,
    totalSuggestionCount: 1234567,
    acceptanceRateByLines: 22.45,
    totalLinesSuggested: 3876543,
    languageCount: 25,
    editorCount: 2,
    cumulativeTurns: 145678,
    cumulativeAcceptances: 52341
  },
  "all": {
    acceptanceRateByCount: 36.25,
    totalSuggestionCount: 1587432,
    acceptanceRateByLines: 23.10,
    totalLinesSuggested: 5234987,
    languageCount: 28,
    editorCount: 2,
    cumulativeTurns: 187654,
    cumulativeAcceptances: 68234
  }
};

export const getDashboardData = (timeRange: TimeRange): DashboardData => {
  return dashboardData[timeRange];
};

// Organization data
export interface OrganizationChartData {
  acceptanceRateByCount: number[];
  suggestionCount: number[];
  acceptanceCount: number[];
  acceptanceRateByLines: number[];
  suggestionLines: number[];
  acceptanceLines: number[];
  activeUsers: number[];
  labels: string[];
}

export const getOrganizationChartData = (timeRange: TimeRange): OrganizationChartData => {
  const data: OrganizationChartData = {
    acceptanceRateByCount: [],
    suggestionCount: [],
    acceptanceCount: [],
    acceptanceRateByLines: [],
    suggestionLines: [],
    acceptanceLines: [],
    activeUsers: [],
    labels: []
  };
  
  // Generate different data based on time range
  let dataPoints = 7;
  
  switch(timeRange) {
    case "28days":
      dataPoints = 7;
      data.labels = ["Apr 1", "Apr 8", "Apr 15", "Apr 22", "Apr 29", "May 5", "May 12"];
      break;
    case "6months":
      dataPoints = 6;
      data.labels = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
      break;
    case "1year":
      dataPoints = 12;
      data.labels = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
      break;
    case "5years":
      dataPoints = 5;
      data.labels = ["2021", "2022", "2023", "2024", "2025"];
      break;
    case "all":
      dataPoints = 6;
      data.labels = ["2020", "2021", "2022", "2023", "2024", "2025"];
      break;
  }
  
  // Generate data with a slight upward trend
  for (let i = 0; i < dataPoints; i++) {
    // Acceptance rate by count (30-36%)
    data.acceptanceRateByCount.push(30 + (i * 0.8) + Math.random() * 2);
    
    // Suggestion count (800-3000)
    const baseSuggestionCount = 800 + (i * 280) + Math.floor(Math.random() * 200);
    data.suggestionCount.push(baseSuggestionCount);
    
    // Acceptance count (based on acceptance rate)
    data.acceptanceCount.push(Math.floor(baseSuggestionCount * (data.acceptanceRateByCount[i] / 100)));
    
    // Acceptance rate by lines (17-23%)
    data.acceptanceRateByLines.push(17 + (i * 0.7) + Math.random() * 2);
    
    // Suggestion lines (2000-8000)
    const baseSuggestionLines = 2000 + (i * 800) + Math.floor(Math.random() * 500);
    data.suggestionLines.push(baseSuggestionLines);
    
    // Acceptance lines (based on acceptance rate by lines)
    data.acceptanceLines.push(Math.floor(baseSuggestionLines * (data.acceptanceRateByLines[i] / 100)));
    
    // Active users (100-900)
    data.activeUsers.push(100 + (i * 120) + Math.floor(Math.random() * 80));
  }
  
  return data;
};

// Languages data
export interface LanguageData {
  name: string;
  acceptedPrompts: number;
  suggestedPrompts: number;
  acceptedLines: number;
  suggestedLines: number;
  acceptanceRateByLines: number;
  color: string;
}

const languageColors = {
  "Java": "#b07219",
  "Go": "#00ADD8",
  "Rust": "#DEA584",
  "XML": "#0060AC",
  "JavaScript": "#F1E05A",
  "TypeScript": "#3178C6",
  "Python": "#3572A5",
  "C#": "#178600",
  "PHP": "#4F5D95",
  "C++": "#F34B7D",
  "Ruby": "#CC342D",
  "Swift": "#F05138",
  "Kotlin": "#A97BFF",
  "Dart": "#00B4AB",
  "Scala": "#DC322F"
};

export const getLanguagesData = (timeRange: TimeRange): LanguageData[] => {
  // Base data for 28 days
  const baseData: LanguageData[] = [
    {
      name: "Java",
      acceptedPrompts: 3254,
      suggestedPrompts: 9876,
      acceptedLines: 8765,
      suggestedLines: 43210,
      acceptanceRateByLines: 20.28,
      color: languageColors["Java"]
    },
    {
      name: "Go",
      acceptedPrompts: 2987,
      suggestedPrompts: 8543,
      acceptedLines: 6543,
      suggestedLines: 32456,
      acceptanceRateByLines: 20.16,
      color: languageColors["Go"]
    },
    {
      name: "Rust",
      acceptedPrompts: 2621,
      suggestedPrompts: 7654,
      acceptedLines: 5432,
      suggestedLines: 29876,
      acceptanceRateByLines: 18.18,
      color: languageColors["Rust"]
    },
    {
      name: "XML",
      acceptedPrompts: 2345,
      suggestedPrompts: 7123,
      acceptedLines: 4321,
      suggestedLines: 25432,
      acceptanceRateByLines: 16.99,
      color: languageColors["XML"]
    },
    {
      name: "JavaScript",
      acceptedPrompts: 2123,
      suggestedPrompts: 6789,
      acceptedLines: 3987,
      suggestedLines: 23456,
      acceptanceRateByLines: 17.00,
      color: languageColors["JavaScript"]
    },
    {
      name: "TypeScript",
      acceptedPrompts: 1987,
      suggestedPrompts: 6234,
      acceptedLines: 3654,
      suggestedLines: 21098,
      acceptanceRateByLines: 17.32,
      color: languageColors["TypeScript"]
    },
    {
      name: "Python",
      acceptedPrompts: 1876,
      suggestedPrompts: 5432,
      acceptedLines: 3210,
      suggestedLines: 19876,
      acceptanceRateByLines: 16.15,
      color: languageColors["Python"]
    },
    {
      name: "C#",
      acceptedPrompts: 1654,
      suggestedPrompts: 4987,
      acceptedLines: 2987,
      suggestedLines: 18765,
      acceptanceRateByLines: 15.92,
      color: languageColors["C#"]
    },
    {
      name: "PHP",
      acceptedPrompts: 1432,
      suggestedPrompts: 4321,
      acceptedLines: 2654,
      suggestedLines: 17890,
      acceptanceRateByLines: 14.84,
      color: languageColors["PHP"]
    },
    {
      name: "C++",
      acceptedPrompts: 1321,
      suggestedPrompts: 3987,
      acceptedLines: 2345,
      suggestedLines: 16543,
      acceptanceRateByLines: 14.17,
      color: languageColors["C++"]
    },
    {
      name: "Ruby",
      acceptedPrompts: 1210,
      suggestedPrompts: 3654,
      acceptedLines: 2123,
      suggestedLines: 15432,
      acceptanceRateByLines: 13.76,
      color: languageColors["Ruby"]
    },
    {
      name: "Swift",
      acceptedPrompts: 1098,
      suggestedPrompts: 3210,
      acceptedLines: 1987,
      suggestedLines: 14321,
      acceptanceRateByLines: 13.87,
      color: languageColors["Swift"]
    },
    {
      name: "Kotlin",
      acceptedPrompts: 987,
      suggestedPrompts: 2987,
      acceptedLines: 1876,
      suggestedLines: 13987,
      acceptanceRateByLines: 13.41,
      color: languageColors["Kotlin"]
    },
    {
      name: "Dart",
      acceptedPrompts: 876,
      suggestedPrompts: 2765,
      acceptedLines: 1654,
      suggestedLines: 12876,
      acceptanceRateByLines: 12.85,
      color: languageColors["Dart"]
    },
    {
      name: "Scala",
      acceptedPrompts: 765,
      suggestedPrompts: 2432,
      acceptedLines: 1432,
      suggestedLines: 11987,
      acceptanceRateByLines: 11.95,
      color: languageColors["Scala"]
    }
  ];

  // Scale data based on time range
  const multipliers: Record<TimeRange, number> = {
    "28days": 1,
    "6months": 5.5,
    "1year": 12,
    "5years": 55,
    "all": 70
  };

  const multiplier = multipliers[timeRange];
  
  return baseData.map(lang => ({
    ...lang,
    acceptedPrompts: Math.floor(lang.acceptedPrompts * multiplier),
    suggestedPrompts: Math.floor(lang.suggestedPrompts * multiplier),
    acceptedLines: Math.floor(lang.acceptedLines * multiplier),
    suggestedLines: Math.floor(lang.suggestedLines * multiplier),
    // Slightly increase acceptance rate over time to show improvement
    acceptanceRateByLines: lang.acceptanceRateByLines * (1 + (multiplier - 1) * 0.03)
  }));
};

// Editors data
export interface EditorData {
  name: string;
  acceptedPrompts: number;
  suggestedPrompts: number;
  acceptedLines: number;
  suggestedLines: number;
  acceptanceRateByLines: number;
  color: string;
}

export const getEditorsData = (timeRange: TimeRange): EditorData[] => {
  const multipliers: Record<TimeRange, number> = {
    "28days": 1,
    "6months": 5.5,
    "1year": 12,
    "5years": 55,
    "all": 70
  };

  const multiplier = multipliers[timeRange];

  return [
    {
      name: "VS Code",
      acceptedPrompts: Math.floor(15432 * multiplier),
      suggestedPrompts: Math.floor(45678 * multiplier),
      acceptedLines: Math.floor(32456 * multiplier),
      suggestedLines: Math.floor(187654 * multiplier),
      acceptanceRateByLines: 17.29 * (1 + (multiplier - 1) * 0.02),
      color: "#007ACC"
    },
    {
      name: "JetBrains",
      acceptedPrompts: Math.floor(12345 * multiplier),
      suggestedPrompts: Math.floor(38765 * multiplier),
      acceptedLines: Math.floor(28142 * multiplier),
      suggestedLines: Math.floor(165432 * multiplier),
      acceptanceRateByLines: 17.01 * (1 + (multiplier - 1) * 0.02),
      color: "#000000"
    }
  ];
};

// Copilot Chat data
export interface CopilotChatData {
  acceptanceCount: number[];
  turnsCount: number[];
  activeUsers: number[];
  labels: string[];
}

export const getCopilotChatData = (timeRange: TimeRange): CopilotChatData => {
  const data: CopilotChatData = {
    acceptanceCount: [],
    turnsCount: [],
    activeUsers: [],
    labels: []
  };
  
  // Generate different data based on time range
  let dataPoints = 7;
  
  switch(timeRange) {
    case "28days":
      dataPoints = 7;
      data.labels = ["Apr 1", "Apr 8", "Apr 15", "Apr 22", "Apr 29", "May 5", "May 12"];
      break;
    case "6months":
      dataPoints = 6;
      data.labels = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
      break;
    case "1year":
      dataPoints = 12;
      data.labels = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
      break;
    case "5years":
      dataPoints = 5;
      data.labels = ["2021", "2022", "2023", "2024", "2025"];
      break;
    case "all":
      dataPoints = 6;
      data.labels = ["2020", "2021", "2022", "2023", "2024", "2025"];
      break;
  }
  
  // Generate data with a slight upward trend
  for (let i = 0; i < dataPoints; i++) {
    // Turns count (80-300)
    const baseTurnsCount = 80 + (i * 30) + Math.floor(Math.random() * 20);
    data.turnsCount.push(baseTurnsCount);
    
    // Acceptance count (30-40% of turns)
    data.acceptanceCount.push(Math.floor(baseTurnsCount * (0.3 + i * 0.02)));
    
    // Active users (50-350)
    data.activeUsers.push(50 + (i * 40) + Math.floor(Math.random() * 30));
  }
  
  return data;
};

// Seat Analysis data
export interface SeatAnalysisData {
  totalAssigned: number;
  assignedNeverUsed: number;
  noActivityDays: number;
  users: SeatUser[];
}

export interface SeatUser {
  id: number;
  login: string;
  githubId: string;
  assigningTeam: string;
  assignedTime: string;
  lastActivityAt: string;
  lastActivityEditor: string;
}

const timeRangeMultipliers: Record<TimeRange, { assigned: number, neverUsed: number, noActivity: number }> = {
  "28days": { assigned: 2, neverUsed: 0, noActivity: 2 },
  "6months": { assigned: 5, neverUsed: 1, noActivity: 3 },
  "1year": { assigned: 8, neverUsed: 2, noActivity: 4 },
  "5years": { assigned: 15, neverUsed: 3, noActivity: 6 },
  "all": { assigned: 20, neverUsed: 4, noActivity: 8 }
};

export const getSeatAnalysisData = (timeRange: TimeRange): SeatAnalysisData => {
  const multiplier = timeRangeMultipliers[timeRange];

  // Generate users based on the multiplier
  const users: SeatUser[] = [];
  for (let i = 0; i < multiplier.assigned; i++) {
    const isNeverUsed = i < multiplier.neverUsed;
    const isNoActivity = !isNeverUsed && i < multiplier.neverUsed + multiplier.noActivity;
    
    // Calculate dates
    const now = new Date();
    const assignedDate = new Date();
    assignedDate.setDate(now.getDate() - (30 + i * 15));
    
    let lastActivityDate = new Date();
    if (isNeverUsed) {
      lastActivityDate = new Date(0); // Never used
    } else if (isNoActivity) {
      lastActivityDate.setDate(now.getDate() - (8 + i)); // No activity for at least 8 days
    } else {
      lastActivityDate.setDate(now.getDate() - (i % 6)); // Active recently
    }
    
    users.push({
      id: i + 1,
      login: `user${i + 1}`,
      githubId: `github${i + 1}`,
      assigningTeam: ['Engineering', 'Product', 'Design', 'Marketing'][i % 4],
      assignedTime: assignedDate.toISOString().split('T')[0],
      lastActivityAt: isNeverUsed ? 'Never' : lastActivityDate.toISOString().split('T')[0],
      lastActivityEditor: isNeverUsed ? 'N/A' : (i % 2 === 0 ? 'VS Code' : 'JetBrains')
    });
  }

  return {
    totalAssigned: multiplier.assigned,
    assignedNeverUsed: multiplier.neverUsed,
    noActivityDays: multiplier.noActivity,
    users
  };
};