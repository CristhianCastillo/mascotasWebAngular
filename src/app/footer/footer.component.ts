import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public variables: any;
  public propiedades: any;
  public date: any;
  constructor() {
    this.propiedades = environment.components.footer;
    this.variables = environment;
    this.date = new Date().getFullYear();
  }

  ngOnInit() {
  }
}
