import {EntryFunction} from "../entry-function.model";
import {MinMaxRange} from "../min-max-range.model";

export interface SetCountEntryFunction extends EntryFunction {
  count: number | MinMaxRange;
}
