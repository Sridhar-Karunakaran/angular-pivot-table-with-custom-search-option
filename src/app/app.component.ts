import { Component, ViewChild } from '@angular/core';
import { PivotViewComponent, IDataOptions, PivotViewAllModule, PivotFieldListAllModule, Operators } from '@syncfusion/ej2-angular-pivotview';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { pivotData } from './data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PivotViewAllModule, PivotFieldListAllModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('pivotview') pivotview!: PivotViewComponent;
  public selectedField: string = 'Country';
  public condition: Operators  = 'Contains';
  public searchTerm: string = '';
  public dataSourceSettings: IDataOptions = {
    dataSource: pivotData,
    expandAll: false,
    allowLabelFilter: true,
    columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
    filters: [],
    filterSettings: []
  };

  // Apply search filter directly to the Pivot Table's dataSourceSettings
  applySearch(): void {
    if (this.searchTerm.trim()) {
      this.pivotview.dataSourceSettings.filterSettings = [{
        name: this.selectedField,
        type: 'Label',
        condition: this.condition,
        value1: this.searchTerm
      }];
    } else {
      this.pivotview.dataSourceSettings.filterSettings = [];
    }
  }
}
