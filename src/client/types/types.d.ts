export interface PersistedObject {
  readonly id: number;
}

export interface Person extends PersistedObject {
  name: string;
  count?: number;

  _pivot_top?: number;
  _pivot_left?: number;
  _pivot_width?: number;
  _pivot_height?: number;

  top?: number;
  left?: number;
  width?: number;
  height?: number;
}

export interface Tag extends PersistedObject {
  name: string;
  count?: number;
}

export interface Image extends PersistedObject {
  liked: boolean;
  persons: Person[];
  tags: Tag[];
  albums: Album[];
  path: string;
  title: string;
  filename: string;
  deleted: boolean;
  proportion: number;

  width: number;
  height: number;
  date: Date;

  year: number;
  month: number;
  day: number;

  displayWidth: number;
  displayHeight: number;
}

export interface Album extends PersistedObject {
  name: string;
  public: boolean;
}

export interface User extends PersistedObject {
  name: string;
}

export interface ExtendedFile {
  image?: Image;
  complete: boolean;
  started: boolean;
  error: boolean;
  process: number;
  file: File;
  name: string;
}
