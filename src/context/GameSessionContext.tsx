import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';

type GameSessionState = {
  isGameActive: boolean;
  activeGameName?: string;
};

type GameSessionContextValue = GameSessionState & {
  setSession: (isActive: boolean, gameName?: string) => void;
};

const GameSessionContext = createContext<GameSessionContextValue | undefined>(
  undefined,
);

export const GameSessionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<GameSessionState>({
    isGameActive: false,
  });

  const setSession = useCallback((isActive: boolean, gameName?: string) => {
    setState({
      isGameActive: isActive,
      activeGameName: isActive ? gameName : undefined,
    });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setSession,
    }),
    [state, setSession],
  );

  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  );
};

export const useGameSession = () => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error('useGameSession must be used within GameSessionProvider');
  }
  return context;
};
