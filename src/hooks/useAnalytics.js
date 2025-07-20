import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import analytics from '../services/analytics';

export const useAnalytics = () => {
  const location = useLocation();
  const previousLocation = useRef();

  useEffect(() => {
    // Initialize analytics on first load
    analytics.init();
  }, []);

  useEffect(() => {
    // Track page changes in SPA
    if (previousLocation.current && previousLocation.current !== location.pathname) {
      analytics.trackPageView(location.pathname);
    }
    previousLocation.current = location.pathname;
  }, [location]);

  return {
    trackEvent: (eventData) => analytics.sendEvent(eventData),
    trackVisit: (page) => analytics.trackVisit(page),
    trackPageView: (page) => analytics.trackPageView(page),
    trackExit: (page) => analytics.trackExit(page),
    disable: () => analytics.disable(),
    enable: () => analytics.enable(),
  };
};
