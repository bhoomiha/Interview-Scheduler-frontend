import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loadingService.isLoading()" class="spinner-container">
      <div class="spinner-wrapper">
        <div class="spinner"></div>
        <img src="images/logo2.png" alt="Aspire Logo" class="aspire-image">
      </div>
    </div>
  `,
  styles: [
    `
      .spinner-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .spinner-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
      }
      .spinner {
        width: 80px;
        height: 80px;
        border: 5px solid rgba(255, 255, 255, 0.3);
        border-top-color: violet;
        border-radius: 50%;
        position: absolute;
        animation: spin 1s linear infinite;
      }
      .aspire-image {
        width: 40px; /* Adjust image size */
        height: 40px;
        position: absolute;
        z-index: 10;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
  ]
})
export class LoaderComponent {
  constructor(public loadingService: LoadingService) {}
}
