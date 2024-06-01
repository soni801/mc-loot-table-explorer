import {EntryFunction} from "../entry-function.model";

export interface SetNameEntryFunction extends EntryFunction {
  name: string;
  target?: 'custom_name' | 'item_name';
}
