import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ModalStateDatePage } from '../modal-state-date/modal-state-date.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public summary_data: {
    date: any;
    state: string;
    cumul_partial: number;
    cumul_full: number;
    cumul: number;
    cumul_booster: number;
    cumul_johor: number;
    cumul_kedah: number;
    cumul_kelantan: number;
    cumul_melaka: number;
    cumul_negeri_sembilan: number;
    cumul_pahang: number;
    cumul_perak: number;
    cumul_perlis: number;
    cumul_pulau_pinang: number;
    cumul_sabah: number;
    cumul_sarawak: number;
    cumul_selangor: number;
    cumul_terengganu: number;
    cumul_kuala_lumpur: number;
    cumul_labuan: number;
    cumul_putrajaya: number;
  } = {
    date: "",
    state: "",
    cumul_partial: 0,
    cumul_full: 0,
    cumul: 0,
    cumul_booster: 0,
    cumul_johor: 0,
    cumul_kedah: 0,
    cumul_kelantan: 0,
    cumul_melaka: 0,
    cumul_negeri_sembilan: 0,
    cumul_pahang: 0,
    cumul_perak: 0,
    cumul_perlis: 0,
    cumul_pulau_pinang: 0,
    cumul_sabah: 0,
    cumul_sarawak: 0,
    cumul_selangor: 0,
    cumul_terengganu: 0,
    cumul_kuala_lumpur: 0,
    cumul_labuan: 0,
    cumul_putrajaya: 0
  };
  public first_date: any;
  public latest_date: any;
  public sd_data: any;
  public state: string;
  public date: string;

  constructor(
    public moc: ModalController,
    public fb: FirebaseService
  ) { }

  ngOnInit() {
    this.latestDate();
  }

  async latestDate() {
    await this.fb.getFirstEntryDate().then(res => {
      this.first_date = res
    })
    await this.fb.getLastEntryDate().then(res => {
      this.latest_date = res
    }).then(() => {
      this.filterState('malaysia');
      this.fb.getDateRecord(this.latest_date).then(res => {
        this.summary_data.cumul_johor = Number(res[`johor`])
        this.summary_data.cumul_kedah = Number(res[`kedah`])
        this.summary_data.cumul_kelantan = Number(res[`kelantan`])
        this.summary_data.cumul_melaka = Number(res[`melaka`])
        this.summary_data.cumul_negeri_sembilan = Number(res[`negeri_sembilan`])
        this.summary_data.cumul_pahang = Number(res[`pahang`])
        this.summary_data.cumul_perak = Number(res[`perak`])
        this.summary_data.cumul_perlis = Number(res[`perlis`])
        this.summary_data.cumul_pulau_pinang = Number(res[`pulau_pinang`])
        this.summary_data.cumul_sabah = Number(res[`sabah`])
        this.summary_data.cumul_sarawak = Number(res[`sarawak`])
        this.summary_data.cumul_selangor = Number(res[`selangor`])
        this.summary_data.cumul_terengganu = Number(res[`terengganu`])
        this.summary_data.cumul_kuala_lumpur = Number(res[`kuala_lumpur`])
        this.summary_data.cumul_labuan = Number(res[`labuan`])
        this.summary_data.cumul_putrajaya = Number(res[`putrajaya`])
      })
    })
    console.log("DATE2", this.first_date, this.latest_date)
  }

  async filterState(state) {
    await this.fb.getStateDateRecords(this.latest_date, state).then(res => {
      this.sd_data = res

      this.summary_data.date = this.sd_data.date
      this.summary_data.state = this.sd_data.state
      this.summary_data.cumul_partial = this.sd_data.cumul_partial
      this.summary_data.cumul_full = this.sd_data.cumul_full
      this.summary_data.cumul = this.sd_data.cumul
      this.summary_data.cumul_booster = this.sd_data.cumul_booster
    
      console.log("filterStateDate(" + this.latest_date + ", " + state + ")" , this.sd_data)
    })
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  async selectStateDate() {
    console.log("HOMEPAGE", this.summary_data.state)
    console.log(this.summary_data.date)
    const modal = await this.moc.create({
      component: ModalStateDatePage,
      backdropDismiss: false,
      componentProps: {
        state: this.summary_data.state,
        date: this.summary_data.date,
      },
    });
    return await modal.present();
  }

  formatDate(date) {
    var dateFormat = date.split('T')[0]
    return dateFormat
  }

}
