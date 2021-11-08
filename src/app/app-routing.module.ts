import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  // {
  //   path: 'vaccination',
  //   loadChildren: () => import('./pages/vaccination/vaccination.module').then( m => m.VaccinationPageModule)
  // },
  {
    path: 'vaccination/:state/:date',
    loadChildren: () => import('./pages/vaccination/vaccination.module').then( m => m.VaccinationPageModule)
  },
  {
    path: 'modal-state-date',
    loadChildren: () => import('./pages/modal-state-date/modal-state-date.module').then( m => m.ModalStateDatePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
