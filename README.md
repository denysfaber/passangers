# Passenger List App

A simple React + TypeScript app (built with Vite) that manages a list of passengers.

## Setup

```bash
npm install
npm run dev
```

## Approach

- Fetches 5 passengers from [Random User API](https://randomuser.me/) on initial load
- "Show more" appends 5 more passengers per click (paginated API calls)
- Users can add passengers locally via a text input + submit button
- State is managed with `useState` and `useEffect` only — no external libraries
- Loading and error states are handled inline

