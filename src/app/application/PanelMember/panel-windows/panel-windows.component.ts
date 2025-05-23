import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PanelMemberService } from '../../../core/services/panel-member.service';
import { PanelWindow } from '../../../shared/models/panel-window';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panel-windows',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './panel-windows.component.html',
  styleUrl: './panel-windows.component.scss'
})
export class PanelWindowsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['panelWindowName', 'startDate', 'endDate', 'skillSet'];
  dataSource = new MatTableDataSource<PanelWindow>([]);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private subscriptions = new Subscription();

  constructor(private readonly panelService: PanelMemberService) {}

  ngOnInit() {
    this.loadPanelWindows();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadPanelWindows() {
    const sub = this.panelService.getPanelWindows().subscribe({
      next: (data: PanelWindow[]) => {
        this.dataSource.data = data; // ✅ Set data correctly
      },
      error: (error) => {
        console.error('Error fetching panel windows:', error);
      }
    });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // 🔸 Cleanup all active subscriptions
  }
}
