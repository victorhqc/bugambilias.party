import { isProduction } from './env';

export const GA_TRACKING_ID = 'UA-77111108-3';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (!isProduction()) {
    console.log({
      config: {
        page_path: url,
      },
    });

    return;
  }

  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: EventArgs) => {
  if (!isProduction()) {
    console.log({
      event: {
        event_category: category,
        event_label: label,
        value,
      },
    });

    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

type EventArgs = {
  action: string;
  category: string;
  label: string;
  value?: string;
};
