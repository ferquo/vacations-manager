import { useState, type FC } from 'react';

const App: FC = () => {
  const [tripCount, setTripCount] = useState<number>(0);

  return (
    <main className="app">
      <h1>Vacations Manager</h1>
      <p>Start planning your next getaway with React&nbsp;19.</p>
      <button type="button" onClick={() => setTripCount((value) => value + 1)}>
        Planned trips: {tripCount}
      </button>
    </main>
  );
};

export default App;
