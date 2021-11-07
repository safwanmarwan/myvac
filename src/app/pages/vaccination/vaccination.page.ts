import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalStateDatePage } from '../modal-state-date/modal-state-date.page';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.page.html',
  styleUrls: ['./vaccination.page.scss'],
})
export class VaccinationPage implements OnInit {

  public vaccine_data: {
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
  } = {
    date: "",
    state: "",
    daily_partial: 0,
    daily_full: 0,
    daily: 0,
    daily_partial_child: 0,
    daily_full_child: 0,
    daily_booster: 0,
    cumul_partial: 0,
    cumul_full: 0,
    cumul: 0,
    cumul_partial_child: 0,
    cumul_full_child: 0,
    cumul_booster: 0,
    pfizer1: 0,
    pfizer2: 0,
    sinovac1: 0,
    sinovac2: 0,
    astra1: 0,
    astra2: 0,
    cansino: 0,
    pending: 0,
  };
  public data: any;
  public test_data: any;
  public all_data: any;
  public sd_data: any;

  constructor(
    public moc: ModalController,
    public fb: FirebaseService
  ) { }

  ngOnInit() {
    // this.getData()
    
    // this.getTestData();

    this.filterStateDate('2021-10-31', 'Malaysia'); // date as of last data

    // this.getFirestoreData();
  }

  // async getTestData() {
  //   let id = '0jUYSkMg6PbSXD5KPP7o'
  //   await this.fb.testRecord(id).then((res: any) => {
  //     this.test_data = res;
  //     console.log(this.test_data)
  //   });
  // }

  async getData() {
    await this.fb.getAllRecords().then((res => {
      this.data = res;
      console.log(this.data)
    }))
  }

  async filterStateDate(date, state) {
    await this.fb.getStateDateRecords(date, state).then(res => {
      this.sd_data = res

      this.vaccine_data.date = this.sd_data.date
      this.vaccine_data.state = this.sd_data.state
      this.vaccine_data.daily_partial = this.sd_data.daily_partial
      this.vaccine_data.daily_full = this.sd_data.daily_full
      this.vaccine_data.daily = this.sd_data.daily
      this.vaccine_data.daily_partial_child = this.sd_data.daily_partial_child
      this.vaccine_data.daily_full_child = this.sd_data.daily_full_child
      this.vaccine_data.daily_booster = this.sd_data.daily_booster
      this.vaccine_data.cumul_partial = this.sd_data.cumul_partial
      this.vaccine_data.cumul_full = this.sd_data.cumul_full
      this.vaccine_data.cumul = this.sd_data.cumul
      this.vaccine_data.cumul_partial_child = this.sd_data.cumul_partial_child
      this.vaccine_data.cumul_full_child = this.sd_data.cumul_full_child
      this.vaccine_data.cumul_booster = this.sd_data.cumul_booster
      this.vaccine_data.pfizer1 = this.sd_data.pfizer1
      this.vaccine_data.pfizer2 = this.sd_data.pfizer2
      this.vaccine_data.sinovac1 = this.sd_data.sinovac1
      this.vaccine_data.sinovac2 = this.sd_data.sinovac2
      this.vaccine_data.astra1 = this.sd_data.astra1
      this.vaccine_data.astra2 = this.sd_data.astra2
      this.vaccine_data.cansino = this.sd_data.cansino
      this.vaccine_data.pending = this.sd_data.pending
    
      console.log("filterStateDate(" + date + ", " + state + ")" , this.sd_data)
    })
  }

  getFirestoreData() {
    this.fb.readAllRecords().then(res => {
      this.all_data = res;
      // console.log(this.all_data)
    })
  }

  async selectStateDate() {
    const modal = await this.moc.create({
      component: ModalStateDatePage,
      backdropDismiss: false,
      componentProps: {
        state: this.vaccine_data.state,
        date: this.vaccine_data.date,
      },
    });

    // modal.onDidDismiss().then((res) => {
    //   this.filterStateDate(this.selected_strategy);
    // });

    return await modal.present();
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
