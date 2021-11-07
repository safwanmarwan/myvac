import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
    {name: "Malaysia"},
    {name: "Selangor"},
    {name: "Kuala Lumpur"},
    {name: "Melaka"},
    {name: "Pahang"},
  ];

  constructor(
    private mc: ModalController
  ) {
  }

  ngOnInit() {
  }

  selectStateDate() {
    console.log("Successfully select state " + this.state + " as for " + this.date);
    this.closeModal();
  }

  closeModal() {
    this.mc.dismiss({
      'dismissed': true
    })
  }

}
