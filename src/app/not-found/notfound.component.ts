import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  public propiedades: any;
  constructor() {
    this.propiedades = environment.components.notfound;
  }

  ngOnInit() {
  }

}
