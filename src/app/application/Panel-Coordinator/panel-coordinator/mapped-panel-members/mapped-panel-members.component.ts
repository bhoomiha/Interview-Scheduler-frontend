import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MapPanelMembers } from '../../../../shared/models/mapped-panel-members';
import { PanelCoordinatorService } from '../../../../core/services/panel-coordinator.service';
import { MatTableDataSource , MatTableModule } from '@angular/material/table';
import { MatSort , MatSortModule } from '@angular/material/sort';
import { MatPaginator , MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mapped-panel-members',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, FormsModule],
  templateUrl: './mapped-panel-members.component.html',
  styleUrl: './mapped-panel-members.component.scss'
})
export class MappedPanelMembersComponent implements OnInit, AfterViewInit, OnDestroy {
  
  displayedColumns: string[] = ['name', 'level','skill','experience'];
  dataSource = new MatTableDataSource<MapPanelMembers>([]);
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterValue = '';
  panelServiceSubscription!: Subscription;

  constructor(private readonly panelService: PanelCoordinatorService) {}

  ngOnInit() {
    this.loadAllocatedDates();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadAllocatedDates() {
    this.panelServiceSubscription = this.panelService.getAllMappedPanelMembers().subscribe({
      next: (data: MapPanelMembers[]) => {
        this.dataSource.data = data;
      },
      error: (error: unknown) => console.error('Error fetching allocated dates', error)
    });
  }

  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.panelServiceSubscription) {
      this.panelServiceSubscription.unsubscribe();
    }
  }
}
