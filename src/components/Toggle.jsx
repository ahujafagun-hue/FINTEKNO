import { useCallback, useState } from 'react';

export default function Toggle({ defaultOn = true }) {
  const [on, setOn] = useState(defaultOn);

  const flip = useCallback(() => setOn((v) => !v), []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        flip();
      }
    },
    [flip],
  );

  return (
    <div
      className={`toggle ${on ? 'on' : 'off'}`}
      role="switch"
      aria-checked={on}
      tabIndex={0}
      onClick={flip}
      onKeyDown={onKeyDown}
    >
      <div className="toggle-k" />
    </div>
  );
}
