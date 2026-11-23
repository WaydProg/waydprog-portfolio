import './Kicker.css';

interface KickerProps {
  readonly children: string;
}

export function Kicker({ children }: KickerProps) {
  return <p className="kicker mono">{children}</p>;
}
