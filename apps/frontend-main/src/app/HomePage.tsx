'use client';

import { getHello } from '@i-customize-it/shared/api/hello';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ErrorState,
  LoadingState,
  Navbar,
  PageShell,
} from '@i-customize-it/shared/ui';
import { useApi } from '@i-customize-it/shared/hooks/useApi';
import { BrandLogo } from '@/components/BrandLogo';

export function HomePage() {
  const { state, reload } = useApi(() => getHello());
  const isLoading = state.status === 'loading';

  return (
    <PageShell
      header={
        <Navbar
          appName="iCustomizeIt"
          logo={<BrandLogo />}
          items={[
            { label: 'Home', href: '/', active: true },
            { label: 'Dashboard', href: '/dashboard' },
          ]}
        />
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Shared UI</CardTitle>
            <CardDescription>
              iCustomizeIt Default — muted and professional. Rebrand via{' '}
              <code className="font-mono text-xs text-muted-foreground">theme.css</code> tokens.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert
              variant="warning"
              title="Maintenance notice"
              description="Some features may be temporarily unavailable."
            />
            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="md">
                Continue
              </Button>
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button variant="outline" size="sm">
                Outline
              </Button>
              <Button variant="success" size="sm">
                Success
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backend connection</CardTitle>
            <CardDescription>
              Calls the Django API through{' '}
              <code className="font-mono text-xs">@i-customize-it/shared/api</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              type="button"
              onClick={() => void reload()}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {isLoading ? 'Loading hello...' : 'Reload hello'}
            </Button>

            {state.status === 'loading' || state.status === 'idle' ? <LoadingState /> : null}
            {state.status === 'error' ? <ErrorState message={state.error} /> : null}
            {state.status === 'success' ? (
              <p data-testid="hello-message" className="text-sm text-foreground">
                {state.data.message}
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
