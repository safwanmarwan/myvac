import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalStateDatePage } from './modal-state-date.page';

const routes: Routes = [
  {
    path: '',
    component: ModalStateDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalStateDatePageRoutingModule {}
