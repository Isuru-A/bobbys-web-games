import { NavLink } from 'react-router-dom';
import '../../css/layout/Sidebar.css';

type GameNavItem = {
  name: string;
  path: string;
};

type SidebarProps = {
  games: GameNavItem[];
  activeGameName?: string;
  showNav?: boolean;
  floating?: boolean;
};

const Sidebar = ({
  games,
  activeGameName,
  showNav = true,
  floating = false,
}: SidebarProps) => (
  <div className={`sidebar${floating ? ' sidebar--floating' : ''}`}>
    <div className="sidebar-header">
      <h2 className="sidebar-title">Bobby&apos;s Web Games</h2>
      {activeGameName && (
        <span className="sidebar-subtitle">{activeGameName}</span>
      )}
    </div>
    {showNav && (
      <ul className="game-list">
        {games.map((game) => (
          <li key={game.path}>
            <NavLink
              to={game.path}
              className={({ isActive }) =>
                `game-item ${isActive ? 'active' : ''}`
              }
            >
              {game.name}
            </NavLink>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default Sidebar;
