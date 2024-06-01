import {EntryFunction} from "./entry-function.model";

export interface PoolEntry {
  type: string;
  name: string;
  weight: number;
  functions?: EntryFunction[];
}
