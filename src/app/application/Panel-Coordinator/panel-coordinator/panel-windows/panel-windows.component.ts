import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { PanelCoordinatorService } from '../../../../core/services/panel-coordinator.service';
import { PanelWindow } from '../../../../shared/models/panel-window';
import { MatTableDataSource , MatTableModule } from '@angular/material/table';
import { MatSort , MatSortModule } from '@angular/material/sort';
import { MatPaginator , MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-panel-windows',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule,
    MatInputModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, FormsModule],
  templateUrl: './panel-windows.component.html',
  styleUrl: './panel-windows.component.scss'
})
export class PanelWindowsComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['panelWindowName', 'startDate', 'endDate', 'skillSet'];
  dataSource = new MatTableDataSource<PanelWindow>([]);
  searchQuery = '';
  startDateFilter = '';
  endDateFilter = '';
  panelServiceSubscription!: Subscription;


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly panelService: PanelCoordinatorService) { }

  ngOnInit() {
    this.loadPanelWindows();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadPanelWindows() {
    this.panelServiceSubscription = this.panelService.getAllPanelWindows().subscribe({
      next: (data: PanelWindow[]) => {
        this.dataSource.data = data; // Set data correctly
      },
      error: (error) => {
        console.error('Error fetching panel windows:', error);
      }
    });
  }

  applyFilter() {
    const search = this.searchQuery.trim().toLowerCase();
    const fromDate = this.startDateFilter ? new Date(this.startDateFilter) : null;
    const toDate = this.endDateFilter ? new Date(this.endDateFilter) : null;

    this.dataSource.filterPredicate = (data: PanelWindow) => {
      const matchesSearch =
        data.panelWindowName.toLowerCase().includes(search);
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      const dateInRange =
        (!fromDate || startDate >= fromDate) &&
        (!toDate || endDate <= toDate);

      return matchesSearch && dateInRange;
    };

    this.dataSource.filter = '' + Math.random(); // Triggers filter update
  }

  resetFilters() {
    this.searchQuery = '';
    this.startDateFilter = '';
    this.endDateFilter = '';
    this.applyFilter();
  }

  ngOnDestroy() {
    if (this.panelServiceSubscription) {
      this.panelServiceSubscription.unsubscribe();
    }
  }
}
