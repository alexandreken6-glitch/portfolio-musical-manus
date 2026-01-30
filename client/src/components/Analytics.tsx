import { useEffect } from 'react';
import { useLocation } from 'wouter';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    umami?: any;
  }
}

export default function Analytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page views with Umami (already configured in index.html)
    if ((window as any).umami) {
      (window as any).umami.track('page_view', {
        page: location,
        title: document.title,
      });
    }

    // Track page views with Google Analytics (if available)
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location,
        page_title: document.title,
      });
    }
  }, [location]);

  // Track custom events
  useEffect(() => {
    // Track music collection views
    const handleCollectionClick = (collectionId: string) => {
      if (window.gtag) {
        window.gtag('event', 'view_collection', {
          collection_id: collectionId,
          collection_name: collectionId.replace(/-/g, ' '),
        });
      }
      if ((window as any).umami) {
        (window as any).umami.track('collection_view', {
          collection: collectionId,
        });
      }
    };

    // Track song views
    const handleSongView = (songId: string) => {
      if (window.gtag) {
        window.gtag('event', 'view_song', {
          song_id: songId,
          song_name: songId.replace(/-/g, ' '),
        });
      }
      if ((window as any).umami) {
        (window as any).umami.track('song_view', {
          song: songId,
        });
      }
    };

    // Track social media clicks
    const handleSocialClick = (platform: string) => {
      if (window.gtag) {
        window.gtag('event', 'social_click', {
          platform: platform,
        });
      }
      if ((window as any).umami) {
        (window as any).umami.track('social_click', {
          platform: platform,
        });
      }
    };

    // Make functions available globally
    (window as any).trackCollectionClick = handleCollectionClick;
    (window as any).trackSongView = handleSongView;
    (window as any).trackSocialClick = handleSocialClick;
  }, []);

  return null;
}

// Utility functions for tracking
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
  if ((window as any).umami) {
    (window as any).umami.track(eventName, eventData);
  }
};

export const trackPageView = (pageName: string, pageData?: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      ...pageData,
    });
  }
  if ((window as any).umami) {
    (window as any).umami.track('page_view', {
      page: pageName,
      ...pageData,
    });
  }
};
