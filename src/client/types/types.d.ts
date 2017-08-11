export interface Person {
  readonly id: number;

  name: string;

  _pivot_top: number;
  _pivot_left: number;
  _pivot_width: number;
  _pivot_height: number;
}

export interface Image {
  readonly id: number;

  liked: boolean;
  persons: Person[];
}

export interface Album {
  readonly id: number;
  name: string;

  edit?: boolean;
}
