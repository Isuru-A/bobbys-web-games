# Bobby's Web Games

A Vite + React playground that collects a set of casual web games. The first release ships the Memory Game—you memorize a random pattern on a 5x5 grid, then try to recreate it before the timer runs out. Additional titles (Simon Says, Connect Four, Spot the Difference, Tic Tac Toe) are scaffolded with routes and “Coming Soon” placeholders so each game can roll out independently.

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs on Vite’s default port (usually http://localhost:5173). Use the sidebar to pick a game; when you start playing, the layout shifts to give the board the entire screen.

## Building

```bash
npm run build
```

This runs the TypeScript project references and produces a production-ready bundle in `dist/`.

## Project Structure Highlights

- `src/components/Game/MemoryGame` – the complete memory-game implementation (grid, phases, styling).
- `src/components/ComingSoon.tsx` – shared placeholder used by future games.
- `src/context/GameSessionContext.tsx` – tiny state container that hides the sidebar while any game is active.
- `src/App.tsx` – defines the router, lazy sidebar behavior, and layout centering logic.
