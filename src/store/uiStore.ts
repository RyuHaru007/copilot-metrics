import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TimeRange } from '@/lib/utils';

interface UIState {
  sidebarExpanded: boolean;
  dashboardTimeRange: TimeRange;
  organizationTimeRange: TimeRange;
  languagesTimeRange: TimeRange;
  editorsTimeRange: TimeRange;
  copilotChatTimeRange: TimeRange;
  seatAnalysisTimeRange: TimeRange;
  toggleSidebar: () => void;
  setDashboardTimeRange: (range: TimeRange) => void;
  setOrganizationTimeRange: (range: TimeRange) => void;
  setLanguagesTimeRange: (range: TimeRange) => void;
  setEditorsTimeRange: (range: TimeRange) => void;
  setCopilotChatTimeRange: (range: TimeRange) => void;
  setSeatAnalysisTimeRange: (range: TimeRange) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarExpanded: true,
      dashboardTimeRange: "28days",
      organizationTimeRange: "28days",
      languagesTimeRange: "28days",
      editorsTimeRange: "28days",
      copilotChatTimeRange: "28days",
      seatAnalysisTimeRange: "28days",
      toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
      setDashboardTimeRange: (range) => set({ dashboardTimeRange: range }),
      setOrganizationTimeRange: (range) => set({ organizationTimeRange: range }),
      setLanguagesTimeRange: (range) => set({ languagesTimeRange: range }),
      setEditorsTimeRange: (range) => set({ editorsTimeRange: range }),
      setCopilotChatTimeRange: (range) => set({ copilotChatTimeRange: range }),
      setSeatAnalysisTimeRange: (range) => set({ seatAnalysisTimeRange: range }),
    }),
    {
      name: 'ui-storage',
    }
  )
);