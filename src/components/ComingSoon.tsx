import { useEffect } from 'react';
import { useGameSession } from '../context/GameSessionContext';
import '../css/ComingSoon.css';

type ComingSoonProps = {
  title: string;
};

const ComingSoon = ({ title }: ComingSoonProps) => {
  const { setSession } = useGameSession();

  useEffect(() => {
    setSession(false);
  }, [setSession]);

  return (
    <div className="coming-soon">
      <h2 className="coming-soon-title">{title}</h2>
      <p className="coming-soon-text">Coming soon.</p>
    </div>
  );
};

export default ComingSoon;
