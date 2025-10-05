import { useState } from 'react';

export default function App() {
  const [tripCount, setTripCount] = useState(0);

  return (
    <main className="app">
      <h1>Vacations Manager</h1>
      <p>Start planning your next getaway with React&nbsp;19.</p>
      <button type="button" onClick={() => setTripCount((value) => value + 1)}>
        Planned trips: {tripCount}
      </button>
    </main>
  );
}
