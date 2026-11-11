
import { useEffect, useState } from 'react';
import './App.css';

interface HealthResponse {
  status: string;
  application: string;
  version: string;
  timestamp: string;
}

function App() {
  const [health, setHealth] =
    useState<HealthResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkApiHealth() {
      try {
        const response = await fetch(
          'http://localhost:5080/api/health'
        );

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data: HealthResponse = await response.json();

        setHealth(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong'
        );
      } finally {
        setLoading(false);
      }
    }

    checkApiHealth();
  }, []);

  return (
    <main className="container">
      <h1>ServiceFlow</h1>

      <p className="subtitle">
        Service business management, simplified.
      </p>

      <section className="status-card">
        <h2>Backend Connection</h2>

        {loading && <p>Checking API connection...</p>}

        {error && (
          <p className="error">
            Connection failed: {error}
          </p>
        )}

        {health && (
          <>
            <p className="success">
              API Status: {health.status}
            </p>

            <p>Application: {health.application}</p>
            <p>Version: {health.version}</p>

            <p>
              Last checked:{' '}
              {new Date(health.timestamp).toLocaleString()}
            </p>
          </>
        )}
      </section>
    </main>
  );
}

export default App;