import { Component, OnInit } from '@angular/core';
import { registery } from 'src/app/core';

@Component({
  selector: 'app-registrylist',
  templateUrl: './registrylist.component.html',
  styleUrls: ['./registrylist.component.scss']
})
export class RegistrylistComponent implements OnInit {
  registeryList: registery[] = [];
  newlyAddedRegistery: registery = {
    address: "",
    image: "",
    isNew: true,
    note: "",
    price: "",
    title: ""
  }

  constructor() { }

  ngOnInit() {
  }


  addNewWish(){
    this.registeryList.push(this.newlyAddedRegistery);
  }


}
