import { useRef, useState, useEffect } from 'react';

const COUNTDOWN_SECONDS = 5;

interface TCountdownParams {
  onStart: () => void
}

export function Countdown({
  onStart
}: TCountdownParams) {
  const [ count, setCount ] = useState(COUNTDOWN_SECONDS);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (count && !ref.current) {
      ref.current = setTimeout(() => {
        ref.current = null;
        if (count === 1) onStart();
        else setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  return (
    <div className="countdown">
      <div className={count === 1 ? 'count count-red' : 'count'}>
        <span className="animate-flicker">{count}</span>
      </div>
    </div>
  );
}