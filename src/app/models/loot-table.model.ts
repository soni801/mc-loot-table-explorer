import {LootTablePool} from "./loot-table-pool.model";

export interface LootTable {
  type: string;
  pools: LootTablePool[];
}
