import { useState, type FC } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const App: FC = () => {
  const [tripCount, setTripCount] = useState<number>(0);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Vacations Manager</CardTitle>
          <CardDescription>
            Start planning your next getaway with React&nbsp;19.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            type="button"
            className="rounded-full px-6"
            onClick={() => setTripCount((value) => value + 1)}
          >
            Planned trips: {tripCount}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default App;
