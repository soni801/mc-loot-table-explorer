import {EntryFunction} from "../entry-function.model";
import {MinMaxRange} from "../min-max-range.model";

export interface SetDamageEntryFunction extends EntryFunction {
  damage: number | MinMaxRange;
}
