import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalStateDatePageRoutingModule } from './modal-state-date-routing.module';

import { ModalStateDatePage } from './modal-state-date.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalStateDatePageRoutingModule
  ],
  declarations: [ModalStateDatePage]
})
export class ModalStateDatePageModule {}
