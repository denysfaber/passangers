import { useState, useEffect } from "react";
import type { Passenger, RandomUserResponse } from "./types";
import "./App.css";

const API_URL = "https://randomuser.me/api/?results=5&seed=passenger-list";

function fetchPassengers(page: number): Promise<Passenger[]> {
  return fetch(`${API_URL}&page=${page}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch passengers (status ${res.status})`);
      }
      return res.json() as Promise<RandomUserResponse>;
    })
    .then((data) =>
      data.results.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
      })),
    );
}
const MIN_PASSENGERS_PER_PAGE = 5;

function App() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    let ignore = false;
    fetchPassengers(page)
      .then((fetched) => {
        if (ignore) return;
        setPassengers((prev) => [...prev, ...fetched]);

        if (fetched.length < MIN_PASSENGERS_PER_PAGE) {
          setHasMore(false);
        }
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, [page]);

  function handleShowMore() {
    setError(null);
    setLoading(true);
    setPage((prev) => prev + 1);
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const newPassenger: Passenger = {
      id: crypto.randomUUID(),
      name: name.trim(),
    };
    setPassengers((prev) => [...prev, newPassenger]);
    setName("");
  }

  return (
    <div className="app">
      <h1>Passenger List</h1>

      <form className="add-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Passenger name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={name.trim() === ""}>
          Submit
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <ul className="passenger-list">
        {passengers.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      {loading && <p className="loading">Loading...</p>}

      <button
        className="show-more"
        onClick={handleShowMore}
        disabled={loading || !hasMore}
      >
        {hasMore ? "Show more" : "No more passengers"}
      </button>
    </div>
  );
}

export default App;
