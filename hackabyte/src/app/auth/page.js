'use client';

import BasePageLayout from '@/components/shared/BasePageLayout';
import AuthForm from '@/components/auth/AuthForm';
import Section from '@/components/shared/Section'; 

export default function Auth() {
  return (
    <BasePageLayout>
      <Section containerSize="narrow">
        <AuthForm />
      </Section>
    </BasePageLayout>
  );
}