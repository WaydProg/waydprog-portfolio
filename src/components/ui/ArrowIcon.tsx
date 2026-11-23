const paths = {
  'up-right': 'M4.5 11.5 11.5 4.5M5.5 4.5h6v6',
  right: 'M2.5 8H13M8.5 3.5 13 8l-4.5 4.5',
  down: 'M8 2.5V13M3.5 8.5 8 13l4.5-4.5',
  up: 'M8 13.5V3M3.5 7.5 8 3l4.5 4.5',
} as const;

export type ArrowDirection = keyof typeof paths;

interface ArrowIconProps {
  readonly direction?: ArrowDirection;
  readonly size?: number;
  readonly className?: string;
}

export function ArrowIcon({ direction = 'up-right', size = 16, className }: ArrowIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}
