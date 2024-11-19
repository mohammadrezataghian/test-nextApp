export interface Page {
    id: string;
    title: string;
    href: string;
    subMenu?: string[];
  }

export interface MusicTrack {
    cover: string;
    title: string;
    src: string;
    id: string;
  }