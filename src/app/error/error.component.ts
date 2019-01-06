import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public propiedades: any;
  constructor() {
    this.propiedades = environment.components.error;
  }

  ngOnInit() {
  }
}
