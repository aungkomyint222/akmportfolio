'use client';
import { useEffect } from 'react';
import { trackEvent } from '@/app/utils/analytics';

export default function TrackPageView() {
  useEffect(() => {
    trackEvent({
      action: 'view',
      category: 'page',
      label: 'home_page',
      value: 1
    });
  }, []);

  return null; // This component only handles tracking, no UI needed.
}
