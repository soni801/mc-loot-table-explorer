import {Component} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {InvalidFileDialogComponent} from "../invalid-file-dialog/invalid-file-dialog.component";
import {LootTable} from "../models/loot-table.model";
import {LootTablePool} from "../models/loot-table-pool.model";
import {
  MatList,
  MatListItem,
  MatListItemLine,
  MatListItemTitle,
  MatListSubheaderCssMatStyler
} from "@angular/material/list";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {PoolEntry} from "../models/pool-entry.model";
import {LiveAnnouncer} from "@angular/cdk/a11y";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatDivider,
    MatFormField,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInput,
    MatList,
    MatListItem,
    MatListItemLine,
    MatListItemTitle,
    MatListSubheaderCssMatStyler,
    MatMenuModule,
    FormsModule,
    MatAccordion,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef
  ]
})
export class HomeComponent {
  importedFile?: LootTable;
  fileName: string = '';
  pools: LootTablePool[] = [];
  poolDataSources: MatTableDataSource<PoolEntry>[] = [];
  displayedColumns: string[] = ['type', 'name', 'weight', 'functions'];

  constructor(public dialog: MatDialog) {}

  onFileSelected() {
    const inputNode: any = document.querySelector('#import-file-input');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try
        {
          this.importedFile = JSON.parse(e.target.result);

          // Show error if the file doesn't have the 'pools' field (because it would not be a valid loot table)
          if (!this.dataIsLootTable(this.importedFile)) return this.openDialog();

          // Save filename without file extension
          this.fileName = inputNode.files[0].name.replace('.json', '');

          // Add pools
          this.pools = this.importedFile.pools;
          this.pools.forEach(p => this.poolDataSources.push(new MatTableDataSource(p.entries)));
        }
        catch (e)
        {
          // Open error dialog if the file is not JSON
          this.openDialog();
        }
      };

      reader.readAsText(inputNode.files[0]);
    }
  }

  openDialog() {
    this.dialog.open(InvalidFileDialogComponent);
  }

  exportFile() {
    const dataAsString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.importedFile));
    const exportFileAnchor = document.querySelector('#export-file-anchor') as HTMLAnchorElement;

    exportFileAnchor.setAttribute('href', dataAsString);
    exportFileAnchor.setAttribute('download', `${this.fileName}.json`);
    exportFileAnchor.click();
  }

  private dataIsLootTable(data: any): data is LootTable {
    return 'pools' in data;
  }
}
