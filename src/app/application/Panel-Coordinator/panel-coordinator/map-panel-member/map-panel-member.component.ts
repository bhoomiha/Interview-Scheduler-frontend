import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { PanelCoordinatorService } from '../../../../core/services/panel-coordinator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InterviewLevel, MapPanelMembers } from '../../../../shared/models/mapped-panel-members';
import { PanelMembers } from '../../../../shared/models/panelmembers';
import { forkJoin, Subscription } from 'rxjs';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-map-panel-member',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatInputModule, MatPaginatorModule,
    MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatTableModule
  ],
  templateUrl: './map-panel-member.component.html',
  styleUrls: ['./map-panel-member.component.scss']
})
export class MapPanelMemberComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource<PanelMembers>([]);
  displayedColumns: string[] = ['select', 'name', 'email', 'experience', 'skillSet', 'designation', 'level'];

  panelMembers: PanelMembers[] = [];
  searchQuery = '';
  showUnmappedOnly = false;
  selectedLevelFilter = '';
  selectedSkillFilters: string[] = [];
  selectedLevel = '';
  selectedCount = 0;

  skillSearchText = '';

  successMessage = '';
  errorMessage = '';
  sortAscending = true;
  minExperience: number | null = null;
  maxExperience: number | null = null;
  showFilters = false;
  panelServiceSubscription!: Subscription;

  interviewLevels = ['L1', 'L2', 'L3', 'Unmap'];
  Levels = ['L1', 'L2', 'L3'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly panelService: PanelCoordinatorService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadPanelMembers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** Fetch all panel members */
  loadPanelMembers() {
    this.panelServiceSubscription = this.panelService.getAllPanelMembers().subscribe({
      next: (data: PanelMembers[]) => {
        this.panelMembers = data.map(member => ({ ...member, selected: false }));
        this.applyFilters();
        this.cdr.detectChanges();
      },
      error: (error: unknown) => console.error('Error Fetching Panel Members', error)
    });
  }

  getUniqueSkills(): string[] {
    const allSkills = this.panelMembers
      .flatMap(member => member.skillSet?.split(',') || []) // Split each skillSet
      .map(skill => skill.trim())                            // Trim whitespace
      .filter(skill => skill);                               // Remove empty values

    return Array.from(new Set(allSkills)); // Remove duplicates
  }


getFilteredSkills(): string[] {
  const allSkills = this.getUniqueSkills(); // your existing method
  const search = this.skillSearchText.toLowerCase();
  return allSkills.filter(skill => skill.toLowerCase().includes(search));
}




  areAllFilteredSelected(): boolean {
    return this.dataSource.filteredData.every(member => member.selected);
  }

  toggleSelectAllFiltered(event: MatCheckboxChange): void {
    const checked = event.checked;
    this.dataSource.filteredData.forEach(member => member.selected = checked);
    this.onMemberCheckboxChange();
  }

  onMemberCheckboxChange(): void {
    this.updateSelectedCount();
  }

  updateSelectedCount() {
    this.selectedCount = this.panelMembers.filter(member => member.selected).length;
  }



  onSkillSelectionChange(event: { value: string[] }) {
    this.selectedSkillFilters = event.value;
    this.applyFilters();
  }

  /** Apply all filters (search, level, skills, experience, unmapped) */
  applyFilters() {
    let filtered = [...this.panelMembers];

    const query = this.searchQuery.toLowerCase();

    filtered = filtered.filter(member => {
      const matchesSearch = !this.searchQuery ||
        member.name.toLowerCase().includes(query) ||
        member.skillSet.toLowerCase().includes(query) ||
        member.designation.toLowerCase().includes(query);

      const matchesLevel = !this.selectedLevelFilter || member.level === this.selectedLevelFilter;
      const matchesSkills = this.selectedSkillFilters.length === 0 ||
        this.selectedSkillFilters.some(skill =>
          member.skillSet?.split(',').map(s => s.trim()).includes(skill)
        );
      const matchesMinExp = this.minExperience == null || member.experience >= this.minExperience;
      const matchesMaxExp = this.maxExperience == null || member.experience <= this.maxExperience;
      const matchesUnmapped = !this.showUnmappedOnly || !member.level;

      return matchesSearch && matchesLevel && matchesSkills && matchesMinExp && matchesMaxExp && matchesUnmapped;
    });

    filtered.sort((a, b) => this.sortAscending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
    );

    this.dataSource.data = filtered;
  }

  /** Assign level to selected members */
  submitAllocation() {
    const selectedMembers = this.panelMembers.filter(member => member.selected);

    if (selectedMembers.length === 0 || !this.selectedLevel) {
      this.errorMessage = "Please select at least one panel member and a level.";
      this.successMessage = '';
      this.cdr.detectChanges();
      setTimeout(() => {
        this.successMessage = '';
        this.errorMessage = '';
        this.cdr.detectChanges();
      }, 3000);
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    let requests;

    if (this.selectedLevel === 'Unmap') {
      requests = selectedMembers.map(member =>
        this.panelService.unMapPanelMembers(member.name)
      );
    } else {
      requests = selectedMembers.map(member => {
        const mapData: MapPanelMembers = { name: member.name, level: this.selectedLevel as InterviewLevel };
        return this.panelService.mapPanelMembers(mapData);
      });
    }

    forkJoin(requests).subscribe({
      next: () => {
        this.panelMembers = this.panelMembers.map(member => ({
          ...member,
          level: member.selected ? (this.selectedLevel === 'Unmap' ? '' : this.selectedLevel) : member.level,
          selected: false
        }));

        this.successMessage = this.selectedLevel === 'Unmap'
          ? `Successfully unmapped ${selectedMembers.length} panel member(s).`
          : `Successfully mapped ${selectedMembers.length} panel member(s) to ${this.selectedLevel}.`;

        this.applyFilters();
        this.cdr.detectChanges();

        setTimeout(() => {
          this.successMessage = '';
          this.errorMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      },
      error: (error) => {
        console.error('Error Allocating:', error);
        this.errorMessage = `Error: ${error?.error?.errors ?? 'Unknown error'}`;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.errorMessage = '';
          this.cdr.detectChanges();
        }, 3000);
      }
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedSkillFilters = [];
    this.selectedLevelFilter = '';
    this.minExperience = null;
    this.maxExperience = null;
    this.showUnmappedOnly = false;
    this.selectedCount = 0;
    this.applyFilters();
  }

  toggleSortOrder(): void {
    this.sortAscending = !this.sortAscending;
    this.applyFilters();
  }

  ngOnDestroy() {
    if (this.panelServiceSubscription) {
      this.panelServiceSubscription.unsubscribe();
    }
  }
}
