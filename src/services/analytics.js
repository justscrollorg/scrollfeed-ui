import { v4 as uuidv4 } from 'uuid';

class AnalyticsService {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.baseUrl = '/analytics-api/api/v1';
    this.isEnabled = true;
    this.queue = [];
    this.lastPageEntry = Date.now();
    this.isTracking = false;
  }

  getOrCreateSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  getUserMetadata() {
    return {
      user_agent: navigator.userAgent,
      language: navigator.language || navigator.userLanguage,
      screen_width: window.screen.width,
      screen_height: window.screen.height,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || '',
    };
  }

  async sendEvent(eventData) {
    if (!this.isEnabled) return;

    const payload = {
      session_id: this.sessionId,
      ...this.getUserMetadata(),
      ...eventData,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${this.baseUrl}/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn('Analytics event failed to send:', response.status);
      }
    } catch (error) {
      console.warn('Analytics error:', error);
      // Queue the event for retry
      this.queue.push(payload);
    }
  }

  // Track page visit
  trackVisit(page = window.location.pathname) {
    if (this.isTracking) return;
    this.isTracking = true;
    
    this.sendEvent({
      event_type: 'visit',
      page,
      title: document.title,
      url: window.location.href,
    });

    this.lastPageEntry = Date.now();
  }

  // Track page view (navigation within SPA)
  trackPageView(page = window.location.pathname) {
    const timeOnPreviousPage = Date.now() - this.lastPageEntry;
    
    this.sendEvent({
      event_type: 'pageview',
      page,
      title: document.title,
      url: window.location.href,
      time_on_page: Math.floor(timeOnPreviousPage / 1000), // in seconds
      scroll_depth: this.getScrollDepth(),
    });

    this.lastPageEntry = Date.now();
  }

  // Track page exit
  trackExit(page = window.location.pathname) {
    const timeOnPage = Date.now() - this.lastPageEntry;
    
    this.sendEvent({
      event_type: 'exit',
      page,
      title: document.title,
      url: window.location.href,
      time_on_page: Math.floor(timeOnPage / 1000), // in seconds
      scroll_depth: this.getScrollDepth(),
    });
  }

  getScrollDepth() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (documentHeight <= 0) return 100;
    
    return Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
  }

  // Initialize analytics tracking
  init() {
    // Track initial page visit
    this.trackVisit();

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackExit();
    });

    // Track scroll depth (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // This could be used for real-time scroll tracking if needed
      }, 250);
    });

    // Track tab visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackExit();
      } else {
        this.trackPageView();
      }
    });

    // Retry queued events periodically
    setInterval(() => {
      if (this.queue.length > 0) {
        const event = this.queue.shift();
        this.sendEvent(event);
      }
    }, 30000); // retry every 30 seconds
  }

  // Disable analytics (for privacy compliance)
  disable() {
    this.isEnabled = false;
  }

  // Enable analytics
  enable() {
    this.isEnabled = true;
  }
}

// Create singleton instance
const analytics = new AnalyticsService();

export default analytics;
