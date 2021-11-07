import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalStateDatePage } from '../modal-state-date/modal-state-date.page';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.page.html',
  styleUrls: ['./vaccination.page.scss'],
})
export class VaccinationPage implements OnInit {

  vaccine_data: {
    date: any;
    state: string;
    daily_partial: number;
    daily_full: number;
    daily: number;
    daily_partial_child: number;
    daily_full_child: number;
    daily_booster: number;
    cumul_partial: number;
    cumul_full: number;
    cumul: number;
    cumul_partial_child: number;
    cumul_full_child: number;
    cumul_booster: number;
    pfizer1: number;
    pfizer2: number;
    sinovac1: number;
    sinovac2: number;
    astra1: number;
    astra2: number;
    cansino: number;
    pending: number;
  }

  constructor(
    public moc: ModalController
  ) { }

  ngOnInit() {
  }

  async selectStateDate() {
    const modal = await this.moc.create({
      component: ModalStateDatePage,
      backdropDismiss: false,
      componentProps: {
        // state: this.vaccine_data.state,
        // date: this.vaccine_data.date,
      },
    });

    // modal.onDidDismiss().then((res) => {
    //   this.updateViewedStrategy(this.selected_strategy);
    // });

    return await modal.present();
  }

}
