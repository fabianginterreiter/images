export interface Person {
  readonly id: number;

  name: string;

  _pivot_top: number;
  _pivot_left: number;
  _pivot_width: number;
  _pivot_height: number;
}

export interface Tag {
  readonly id: number;

  name: string;

  edit?: boolean;
}

export interface Image {
  readonly id: number;

  liked: boolean;
  persons: Person[];
  tags: Tag[];
  path: string;
  title: string;
  filename: string;

  width: number;
  height: number;
  date: Date;

  year: number;
  month: number;
  day: number;

  displayWidth: number;
  displayHeight: number;
}

export interface Album {
  readonly id: number;
  name: string;

  edit?: boolean;
}

export interface User {
  readonly id: number;
  name: string;
}

export interface ExtendedFile extends File {
  image: Image;
  complete: boolean;
  started: boolean;
  error: boolean;
  process: number;
}
