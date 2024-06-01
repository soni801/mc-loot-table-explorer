import {EntryFunction} from "../entry-function.model";

export interface SetLoreEntryFunction extends EntryFunction {
  lore: string[];
  mode: 'replace_all' | 'replace_section' | 'insert' | 'append';
  // TODO: 'replace_section' and 'insert' have optional arguments, but this is poorly documented
}
