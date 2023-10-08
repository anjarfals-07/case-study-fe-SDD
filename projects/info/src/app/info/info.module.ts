import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoRoutingModule } from './info-routing.module';
import { InfoComponent } from './info.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [InfoComponent],
  imports: [CommonModule, InfoRoutingModule, MatCardModule],
})
export class InfoModule {}
