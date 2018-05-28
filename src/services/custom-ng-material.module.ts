import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatInputModule, MatButtonModule, MatSnackBarModule,
  MatToolbarModule, MatGridListModule, MatListModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [BrowserAnimationsModule, MatCardModule, MatInputModule, MatButtonModule, MatSnackBarModule,
    MatToolbarModule, MatGridListModule, MatListModule, MatSelectModule
  ],
  exports: [BrowserAnimationsModule, MatCardModule, MatInputModule, MatButtonModule, MatSnackBarModule,
    MatToolbarModule, MatGridListModule, MatListModule, MatSelectModule
  ],
})
export class CustomNgMaterialModule { }