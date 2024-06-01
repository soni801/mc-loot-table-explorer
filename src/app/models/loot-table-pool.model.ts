import {MinMaxRange} from "./min-max-range.model";
import {PoolEntry} from "./pool-entry.model";

export interface LootTablePool {
  rolls: number | MinMaxRange;
  bonus_rolls: number | MinMaxRange;
  entries: PoolEntry[];
}
