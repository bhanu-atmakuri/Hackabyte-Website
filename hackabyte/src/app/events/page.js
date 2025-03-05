'use client';

import BasePageLayout from '@/components/shared/BasePageLayout';
import EventsHero from '@/components/events/EventsHero';
import FeaturedEvent from '@/components/events/FeaturedEvent';
import UpcomingEventsList from '@/components/events/UpcomingEventsList';
import EventsCalendar from '@/components/events/EventsCalendar';
import EventsRegistration from '@/components/events/EventsRegistration';

export default function Events() {
  return (
    <BasePageLayout>
      <EventsHero />
      <FeaturedEvent />
      <UpcomingEventsList />
      <EventsCalendar />
      <EventsRegistration />
    </BasePageLayout>
  );
}