export interface Image {
  readonly id: number;

  liked: boolean
}

export interface Album {
  readonly id: number;
  name: string;

  edit?: boolean;
}
