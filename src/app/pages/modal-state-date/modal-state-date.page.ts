import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-modal-state-date',
  templateUrl: './modal-state-date.page.html',
  styleUrls: ['./modal-state-date.page.scss'],
})
export class ModalStateDatePage implements OnInit {

  @Input() public state: string;
  @Input() public date: any;

  selected_state: string;
  selected_date: any;
  list_states: any = [
    {name: 'malaysia'},
    {name: 'Johor'},
    {name: 'Kedah'},
    {name: 'Kelantan'},
    {name: 'Melaka'},
    {name: 'Negeri Sembilan'},
    {name: 'Pahang'},
    {name: 'Perak'},
    {name: 'Perlis'},
    {name: 'Pulau Pinang'},
    {name: 'Sabah'},
    {name: 'Sarawak'},
    {name: 'Selangor'},
    {name: 'Terengganu'},
    {name: 'W.P. Kuala Lumpur'},
    {name: 'W.P. Labuan'},
    {name: 'W.P. Putrajaya'}
  ];
  start_date: any;
  end_date: any;

  constructor(
    private fb: FirebaseService,
    private mc: ModalController,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.fb.getFirstEntryDate().then(res => {
      this.start_date = res
    }).then(() => {
      this.fb.getLastEntryDate().then(result => {
        this.end_date = result
      })
    })
    console.log("DATE3", this.start_date, this.end_date)
  }

  selectStateDate() {
    this.date = this.formatDate(this.date)

    console.log("Successfully select state " + this.state + " as for " + this.date);
    this.router.navigate(['../vaccination/' + this.state + '/' + this.date])
    this.closeModal();
  }

  closeModal() {
    this.mc.dismiss({
      'dismissed': true
    })
  }

  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  formatDate(date) {
    var dateFormat = date.split('T')[0]
    return dateFormat
  }

}
