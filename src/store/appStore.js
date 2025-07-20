import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Global app state store
export const useAppStore = create(
  persist(
    (set, get) => ({
      // Theme state
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // Region state
      selectedRegion: 'US',
      setSelectedRegion: (region) => set({ selectedRegion: region }),

      // User preferences
      preferences: {
        pageSize: 20,
        enableAnimations: true,
        enableNotifications: false,
      },
      updatePreferences: (newPrefs) => 
        set((state) => ({
          preferences: { ...state.preferences, ...newPrefs }
        })),

      // Navigation state
      activeTab: null,
      setActiveTab: (tab) => set({ activeTab: tab }),

      // Search state
      recentSearches: [],
      addRecentSearch: (search) => 
        set((state) => ({
          recentSearches: [
            search,
            ...state.recentSearches.filter(s => s !== search).slice(0, 9)
          ]
        })),
      clearRecentSearches: () => set({ recentSearches: [] }),

      // Error state
      globalError: null,
      setGlobalError: (error) => set({ globalError: error }),
      clearGlobalError: () => set({ globalError: null }),

      // Loading state
      globalLoading: false,
      setGlobalLoading: (loading) => set({ globalLoading: loading }),
    }),
    {
      name: 'justscroll-app-state',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        selectedRegion: state.selectedRegion,
        preferences: state.preferences,
        recentSearches: state.recentSearches,
      }),
    }
  )
);

// Region-specific state store
export const useRegionStore = create((set, get) => ({
  // Cached active tabs per region
  activeTabsByRegion: {},
  setActiveTabForRegion: (region, tabId) =>
    set((state) => ({
      activeTabsByRegion: {
        ...state.activeTabsByRegion,
        [region]: tabId,
      },
    })),
  getActiveTabForRegion: (region) => get().activeTabsByRegion[region],

  // Region metadata
  regionMetadata: {},
  setRegionMetadata: (region, metadata) =>
    set((state) => ({
      regionMetadata: {
        ...state.regionMetadata,
        [region]: metadata,
      },
    })),
}));
