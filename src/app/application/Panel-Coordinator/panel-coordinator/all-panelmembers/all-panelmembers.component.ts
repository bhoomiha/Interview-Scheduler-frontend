import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { PanelCoordinatorService } from '../../../../core/services/panel-coordinator.service';
import { MatTableDataSource , MatTableModule } from '@angular/material/table';
import { MatSort , MatSortModule } from '@angular/material/sort';
import { MatPaginator , MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PanelMembers } from '../../../../shared/models/panelmembers';

@Component({
  selector: 'app-all-panelmembers',
  standalone: true,
  imports: [CommonModule,
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    FormsModule],
  templateUrl: './all-panelmembers.component.html',
  styleUrl: './all-panelmembers.component.scss'
})
export class AllPanelMembersComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'email', 'experience', 'skill', 'designation'];
  dataSource = new MatTableDataSource<PanelMembers>([]);
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterValue = '';
   panelServiceSubscription!: Subscription;

  constructor(private readonly panelService: PanelCoordinatorService) {}

  ngOnInit() {
    this.loadPanelMembers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadPanelMembers() {
   this.panelServiceSubscription = this.panelService.getAllPanelMembers().subscribe({
      next: (data: PanelMembers[]) => {
        this.dataSource.data = data;
      },
      error: (error: string) => console.error('Error Fetching Panel Members', error)
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
