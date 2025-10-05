import { useState, type FC } from 'react';

import { Button } from '@/components/ui/button';

const App: FC = () => {
  const [tripCount, setTripCount] = useState<number>(0);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl bg-card p-10 text-center shadow-xl shadow-slate-900/10">
        <h1 className="text-3xl font-semibold tracking-tight">Vacations Manager</h1>
        <p className="text-base text-muted-foreground">
          Start planning your next getaway with React&nbsp;19.
        </p>
        <Button
          type="button"
          className="rounded-full px-6"
          onClick={() => setTripCount((value) => value + 1)}
        >
          Planned trips: {tripCount}
        </Button>
      </div>
    </main>
  );
};

export default App;
