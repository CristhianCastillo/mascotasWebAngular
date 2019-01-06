import { Component, OnInit } from '@angular/core';
import { ScrollTopService } from '../services/scroll-top/scroll-top.service';
import { Chart } from 'chart.js';
import { DashboardsService } from '../services/dashboards/dashboards.service';
import { environment } from '@env/environment';
import * as LoginConst from '../constants/login';
import { CommonUtils } from '../utils/common-utils';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  public chart1DatosNumeros: number[];
  public chart2DatosNumeros: number[];
  public chart1: any = null;
  public chart2: any = null;
  public propiedades: any;

  constructor(private scrollTop: ScrollTopService, private service: DashboardsService) {
    this.propiedades = environment.components.dashboard;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    this.service.getCountServices(usuarioAutentificado.id).subscribe(
      (data: any) => {
        this.chart1.data.labels = data.servicios;
        this.chart1DatosNumeros = data.numeros;
        for (let i: number = 0; i < this.chart1DatosNumeros.length; i++) {
          this.chart1.data.datasets[0].data.push(this.chart1DatosNumeros[i]);
          this.chart1.data.datasets[0].backgroundColor.push(CommonUtils.getRandomColorHex());
        }
        this.chart1.update();
      },
      (error) => {
        console.error(error);
      }
    );

    this.service.getCountQualify(usuarioAutentificado.id).subscribe(
      (data: any) => {
        this.chart2.data.labels = data.servicios;
        this.chart2DatosNumeros = data.numeros;
        for (let i: number = 0; i < this.chart2DatosNumeros.length; i++) {
          this.chart2.data.datasets[0].data.push(this.chart2DatosNumeros[i]);
          this.chart2.data.datasets[0].backgroundColor.push(CommonUtils.getRandomColorHex());
        }
        this.chart2.update();
      },
      (error) => {
        console.error(error);
      }
    );

    this.chart1 = new Chart('pie-chart-1', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: this.propiedades['chart.solicitudes.servicio'],
          backgroundColor: [],
          data: []
        }]
      },
      options: {
        title: {
          display: true,
          text: this.propiedades['chart.solicitudes.servicio'],
          fontSize: 25,
          fontStyle: 'bold',
          fontFamily: 'Arial'
        }
      }
    });

    this.chart2 = new Chart('pie-chart-2', {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          label: this.propiedades['chart.calificaciones'],
          backgroundColor: [],
          data: []
        }]
      },
      options: {
        title: {
          display: true,
          text: this.propiedades['chart.calificaciones'],
          fontSize: 25,
          fontStyle: 'bold',
          fontFamily: 'Arial'
        }
      }
    });
  }
}
