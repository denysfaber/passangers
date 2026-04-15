# Passenger List App

A simple React + TypeScript app (built with Vite) that manages a list of passengers.

## Setup

```bash
npm install
npm run dev
```

## Approach

- Fetches 5 passengers from [Random User API](https://randomuser.me/) on initial load
- "Show more" increments page state, which triggers a `useEffect` to fetch and append the next page
- Users can add passengers locally via a text input + submit button
- State is managed with `useState` and `useEffect` only — no external libraries
- "Show more" disables when loading or when no more results are available
- Loading and error states are handled inline
