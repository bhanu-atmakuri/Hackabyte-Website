'use client';

import BasePageLayout from '@/components/shared/BasePageLayout';
import HackathonsHero from '@/components/events/hackathons/HackathonsHero';
import UpcomingHackathons from '@/components/events/hackathons/UpcomingHackathons';
import HackathonInfo from '@/components/events/hackathons/HackathonInfo';
import HackathonPrizes from '@/components/events/hackathons/HackathonPrizes';
import HackathonRules from '@/components/events/hackathons/HackathonRules';

export default function Hackathons() {
  return (
    <BasePageLayout>
      <HackathonsHero />
      <UpcomingHackathons />
      <HackathonInfo />
      <HackathonPrizes />
      <HackathonRules />
    </BasePageLayout>
  );
}