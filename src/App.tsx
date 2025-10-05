import { useMemo, useState, type FC } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  CalendarCheck,
  GanttChart,
  IdCard,
  Settings2,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type NavSection = {
  id: string;
  label: string;
  description: string;
  summary: string;
  notes: string[];
  icon: LucideIcon;
};

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'planner',
    label: 'Planner',
    description: 'Visualise availability and schedule PTO',
    summary:
      'Unified workspace that blends the team availability Gantt view with quick vacation entry and editing, keeping data in sync.',
    notes: [
      'Gantt timeline highlights weekends and country-specific holidays while showing who is off across all joined teams.',
      'Inline PTO form lets members add, edit, or remove their own vacations with automatic allowance deductions.',
      'Changes update both the availability chart and the yearly allowance totals instantly.',
    ],
    icon: GanttChart,
  },
  {
    id: 'teams',
    label: 'Teams',
    description: 'Manage rosters and invite codes',
    summary:
      'Admin-only tools to create teams, review membership, and distribute invite codes for onboarding.',
    notes: [
      'Stores team name, id, and local roster of member ids.',
      'Supports shareable invite codes for self-join flows.',
      'Lays foundation for optional member management enhancements.',
    ],
    icon: Users,
  },
  {
    id: 'members',
    label: 'People',
    description: 'Profiles and allowances',
    summary:
      'Profile management focused on each person’s country, allowance, and cross-team membership.',
    notes: [
      'Keeps a single allowance that spans every team the member joins.',
      'Changing country updates which national holiday calendar applies.',
      'Defaults to 24 annual days with manual adjustments available.',
    ],
    icon: IdCard,
  },
  {
    id: 'settings',
    label: 'Settings',
    description: 'Defaults, holidays, and persistence',
    summary:
      'Global configuration touch-points including holiday calendars, default allowances, and a view into localStorage persistence for the browser-first MVP.',
    notes: [
      'Surfaces defaults such as annual allowance, invite settings, and other global toggles.',
      'Hosts the country-specific holiday libraries that feed the planner and calendar views.',
      'Explains the localStorage data footprint for transparency during the MVP.',
      'Prepares the interface for future backend integrations.',
    ],
    icon: Settings2,
  },
];

const App: FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(NAV_SECTIONS[0].id);

  const activeSection = useMemo(() => {
    return NAV_SECTIONS.find((section) => section.id === activeSectionId) ?? NAV_SECTIONS[0];
  }, [activeSectionId]);

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-72 flex-col border-r bg-background px-4 py-6 lg:flex">
        <div className="flex items-center gap-2 px-2 pb-6">
          <CalendarCheck className="h-6 w-6 text-primary" aria-hidden />
          <span className="text-lg font-semibold">Vacations Manager</span>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {NAV_SECTIONS.map((section) => {
            const isActive = section.id === activeSectionId;

            return (
              <Button
                key={section.id}
                type="button"
                variant={isActive ? 'secondary' : 'ghost'}
                className="h-auto w-full justify-start gap-3 px-3 py-3 text-left"
                onClick={() => setActiveSectionId(section.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <section.icon className="h-5 w-5" aria-hidden />
                <span className="flex flex-col items-start gap-1">
                  <span className="text-sm font-medium leading-none">
                    {section.label}
                  </span>
                </span>
              </Button>
            );
          })}
        </nav>
        <div className="pt-6">
          <Card className="border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">What’s next?</CardTitle>
              <CardDescription>
                Flesh out each section into routed pages and persist workspace
                data into localStorage.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              Sidebar navigation is ready. Hook each item into your routing
              strategy when pages are implemented.
            </CardContent>
          </Card>
        </div>
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="flex h-20 flex-col justify-center border-b bg-background px-6">
          <h1 className="text-2xl font-semibold">{activeSection.label}</h1>
          <p className="text-sm text-muted-foreground">
            {activeSection.description}
          </p>
        </header>
        <section className="flex flex-1 items-center justify-center px-6 py-10">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>{activeSection.summary}</CardTitle>
              <CardDescription>
                Based on the product requirements, plan this area first while the
                rest of the UI scaffolding comes together.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {activeSection.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default App;
