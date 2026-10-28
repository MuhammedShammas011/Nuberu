/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-controls'?: boolean | string;
        'touch-action'?: string;
        'auto-rotate'?: boolean | string;
        'auto-rotate-delay'?: string;
        'rotation-per-second'?: string;
        'shadow-intensity'?: string;
        exposure?: string;
        'environment-image'?: string;
        'camera-orbit'?: string;
        'interaction-prompt'?: string;
        ar?: boolean | string;
        'ar-modes'?: string;
      },
      HTMLElement
    >;
  }
}
