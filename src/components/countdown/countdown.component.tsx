import { useRef, useState, useEffect } from 'react';

interface TCountdownParams {
  onStart: () => void
}

export function Countdown({
  onStart
}: TCountdownParams) {
  const [ count, setCount ] = useState(5);
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
      <p>Get ready. First question starts in...</p>
      <div className={ count === 1 ? 'count count-red' : 'count'}>{count}</div>
    </div>
  );
}