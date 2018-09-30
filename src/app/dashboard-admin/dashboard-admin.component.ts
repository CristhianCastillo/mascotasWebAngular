import { Component, OnInit } from '@angular/core';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private scrollTop: ScrollTopService) { }

  ngOnInit() {
    this.scrollTop.setScrollTop();
  }
}
