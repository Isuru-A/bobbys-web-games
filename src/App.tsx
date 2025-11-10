import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import MemoryGameContainer from './components/Game/MemoryGame/MemoryGameContainer';
import ComingSoon from './components/ComingSoon';
import { useGameSession } from './context/GameSessionContext';
import './css/App.css';

const games = [
  { name: 'Simon Says', path: '/simon-says' },
  { name: 'Memory Game', path: '/memory-game' },
  { name: 'Connect Four', path: '/connect-four' },
  { name: 'Spot The Difference', path: '/spot-the-difference' },
  { name: 'Tic Tac Toe', path: '/tic-tac-toe' },
];

const App = () => {
  const { isGameActive, activeGameName } = useGameSession();
  const mainClassName = `main-content${
    isGameActive ? ' main-content--full' : ''
  }`;

  return (
    <div className="app-container">
      <Sidebar
        games={games}
        activeGameName={isGameActive ? activeGameName : undefined}
        showNav={!isGameActive}
        floating={isGameActive}
      />
      <main className={mainClassName}>
        <Routes>
          <Route path="/" element={<Navigate to="/memory-game" replace />} />
          <Route path="/memory-game" element={<MemoryGameContainer />} />
          {games
            .filter((game) => game.path !== '/memory-game')
            .map((game) => (
              <Route
                key={game.path}
                path={game.path}
                element={<ComingSoon title={game.name} />}
              />
            ))}
          <Route path="*" element={<Navigate to="/memory-game" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
