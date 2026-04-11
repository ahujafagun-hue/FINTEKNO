import { useCallback, useState } from 'react';

export default function TagSel({ children, defaultOn = false, style, className = '' }) {
  const [on, setOn] = useState(defaultOn);

  const toggle = useCallback(() => setOn((v) => !v), []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <span
      className={`tag-sel${on ? ' on' : ''} ${className}`.trim()}
      style={style}
      role="checkbox"
      aria-checked={on}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={onKeyDown}
    >
      {children}
    </span>
  );
}
