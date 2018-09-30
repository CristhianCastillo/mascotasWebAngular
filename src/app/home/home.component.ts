import { Component, OnInit } from '@angular/core';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private scrollTop: ScrollTopService) { }

  ngOnInit() {
    this.scrollTop.setScrollTop();
  }

}
