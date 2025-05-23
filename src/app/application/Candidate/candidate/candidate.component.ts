import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../core/services/interview.service';
import { Interview } from '../../../shared/models/interview';
import { User } from '../../../shared/models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CandidateComponent implements OnInit {
  interviews: Interview[] = [];
  filteredInterviews: Interview[] = [];
  showProfile = false;
  activeTab: 'upcoming' | 'past' = 'upcoming';
  sortColumn: keyof Interview = 'date';
  sortDirection: 'asc' | 'desc' = 'asc';
  isPopupOpen = false;
  candidate: User | null = null;

  constructor(
    private interviewService: InterviewService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getCandidateInterviews();
  }

  getCandidateInterviews(): void {
    this.interviewService.getInterviewsByCandidateId().subscribe(
      (data) => {
        this.interviews = data;
        this.filterInterviews();
      },
      (error) => {
        console.error(' Error fetching interviews', error);
      }
    );
  }

  filterInterviews(): void {
    const currentDate = new Date();
    this.filteredInterviews = this.interviews.filter((interview) => {
      const interviewDate = new Date(interview.date);
      return this.activeTab === 'upcoming'
        ? interviewDate >= currentDate
        : interviewDate < currentDate;
    });
    this.sortFilteredInterviews();
  }

  sortFilteredInterviews(): void {
    this.filteredInterviews.sort((a, b) => {
      const aValue = this.getSortableValue(a);
      const bValue = this.getSortableValue(b);

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }
  switchTab(tab: 'upcoming' | 'past'): void {
    this.activeTab = tab;
    this.filterInterviews();
  }
  sortByPanelMember(): void {
    this.sortColumn = 'panelMemberName';
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortFilteredInterviews();
  }
  sortByDate(): void {
    this.sortColumn = 'date';
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortFilteredInterviews();
  }
  getSortableValue(interview: Interview): string | number {
    if (this.sortColumn === 'date') return new Date(interview.date).getTime();
    return interview[this.sortColumn] ?? '';
  }
}
