declare module 'react-player' {
  import * as React from 'react';

  export interface ReactPlayerProps {
    url: string | string[];
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    volume?: number;
    muted?: boolean;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    onReady?: () => void;
    onStart?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onBuffer?: () => void;
    onEnded?: () => void;
    onError?: (e: any) => void;
  }

  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}
