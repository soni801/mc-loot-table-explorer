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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDivider
  ]
})
export class HomeComponent {
  importedFile?: LootTable;

  constructor(public dialog: MatDialog) {}

  onFileSelected() {
    const inputNode: any = document.querySelector('#import-file-input');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try
        {
          this.importedFile = JSON.parse(e.target.result);
        }
        catch (e)
        {
          // Open error dialog if the file is invalid
          this.openDialog();
        }
      };

      reader.readAsText(inputNode.files[0]);

      if (!this.dataIsLootTable(this.importedFile)) this.openDialog();
    }
  }

  openDialog() {
    this.dialog.open(InvalidFileDialogComponent);
  }

  exportFile() {
    const dataAsString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.importedFile));
    const exportFileAnchor = document.querySelector('#export-file-anchor') as HTMLAnchorElement;

    exportFileAnchor.setAttribute('href', dataAsString);
    exportFileAnchor.setAttribute('download', 'loot_table.json');
    exportFileAnchor.click();
  }

  private dataIsLootTable(data: any): data is LootTable {
    return data.pools.size > 0;
  }
}
