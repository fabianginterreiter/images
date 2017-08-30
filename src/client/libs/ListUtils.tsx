import {PersistedObject} from "../types";

export function find<T extends PersistedObject>(list: T[], id: number): T {
  for (let index = 0; index < list.length; index++) {
    if (list[index].id === id) {
      return list[index];
    }
  }

  return null;
}
