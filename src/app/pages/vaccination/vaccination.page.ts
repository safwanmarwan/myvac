import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public state: string;
  public date: string;

  constructor(
    public moc: ModalController,
    public fb: FirebaseService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.state = this.ar.snapshot.paramMap.get('state')
    this.date = this.ar.snapshot.paramMap.get('date')

    var dateFormat = this.date.split('T')[0]
    this.date = dateFormat
    
    console.log(this.state, this.date)
    this.filterStateDate(this.date, this.state);
  }

  async getData() {
    await this.fb.getAllRecords().then((res => {
      this.data = res;
      console.log(this.data)
    }))
  }

  async filterStateDate(date, state) {
    await this.fb.getStateDateRecords(date, state).then(res => {
      this.sd_data = res
      console.log("sd_data",this.sd_data)

      this.vaccine_data.date = this.sd_data.date
      this.vaccine_data.state = this.sd_data.state
      this.vaccine_data.daily_partial = Number(this.sd_data.daily_partial)
      this.vaccine_data.daily_full = Number(this.sd_data.daily_full)
      this.vaccine_data.daily = Number(this.sd_data.daily)
      this.vaccine_data.daily_partial_child = Number(this.sd_data.daily_partial_child)
      this.vaccine_data.daily_full_child = Number(this.sd_data.daily_full_child)
      this.vaccine_data.daily_booster = Number(this.sd_data.daily_booster)
      this.vaccine_data.cumul_partial = Number(this.sd_data.cumul_partial)
      this.vaccine_data.cumul_full = Number(this.sd_data.cumul_full)
      this.vaccine_data.cumul = Number(this.sd_data.cumul)
      this.vaccine_data.cumul_partial_child = Number(this.sd_data.cumul_partial_child)
      this.vaccine_data.cumul_full_child = Number(this.sd_data.cumul_full_child)
      this.vaccine_data.cumul_booster = Number(this.sd_data.cumul_booster)
      this.vaccine_data.pfizer1 = Number(this.sd_data.pfizer1)
      this.vaccine_data.pfizer2 = Number(this.sd_data.pfizer2)
      this.vaccine_data.sinovac1 = Number(this.sd_data.sinovac1)
      this.vaccine_data.sinovac2 = Number(this.sd_data.sinovac2)
      this.vaccine_data.astra1 = Number(this.sd_data.astra1)
      this.vaccine_data.astra2 = Number(this.sd_data.astra2)
      this.vaccine_data.cansino = Number(this.sd_data.cansino)
      this.vaccine_data.pending = Number(this.sd_data.pending)
    
      console.log("filterStateDate(" + date + ", " + state + ")" , this.sd_data)
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
    return await modal.present();
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

}
