import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registrylist',
  templateUrl: './registrylist.component.html',
  styleUrls: ['./registrylist.component.scss']
})
export class RegistrylistComponent implements OnInit {
  private window: any = window;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
