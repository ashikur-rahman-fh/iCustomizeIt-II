'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageShell,
} from '@i-customize-it/shared/ui';

import { MainSiteNavbar } from '@/components/MainSiteNavbar';

export type ComingSoonPageProps = {
  title: string;
  description: string;
};

export function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <PageShell header={<MainSiteNavbar />}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This section is on the way. Check back soon for updates.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
