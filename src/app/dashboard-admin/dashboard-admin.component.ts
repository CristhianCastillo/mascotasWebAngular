import {Component, OnInit} from '@angular/core';
import {ScrollTopService} from '../services/scroll-top.service';
import {Chart} from 'chart.js';
import {DashboardsService} from '../services/dashboards/dashboards.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  public chart1DatosTexto: string[];
  public chart1DatosNumeros: number[];
  public chart2DatosTexto: string[];
  public chart2DatosNumeros: number[];

  public chart1: any = null;
  public chart2: any = null;

  constructor(private scrollTop: ScrollTopService, private service: DashboardsService) {
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    this.service.getCountServices(usuarioAutentificado.id).subscribe(
      (data: any) => {
        console.log(data);
        this.chart1.data.labels = data.servicios;
        this.chart1DatosNumeros = data.numeros;
        for (let i: number = 0; i < this.chart1DatosNumeros.length; i++) {
          console.log(this.getRandomColorHex());
          this.chart1.data.datasets[0].data.push(this.chart1DatosNumeros[i]);
          this.chart1.data.datasets[0].backgroundColor.push(this.getRandomColorHex());
        }
        this.chart1.update();
      },
      (error) => {
        console.error(error);
      }
    );

    this.service.getCountQualify(usuarioAutentificado.id).subscribe(
      (data: any) => {
        console.log(data);
        this.chart2.data.labels = data.servicios;
        this.chart2DatosNumeros = data.numeros;
        for (let i: number = 0; i < this.chart2DatosNumeros.length; i++) {
          console.log(this.getRandomColorHex());
          this.chart2.data.datasets[0].data.push(this.chart2DatosNumeros[i]);
          this.chart2.data.datasets[0].backgroundColor.push(this.getRandomColorHex());
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
          label: 'Solicitudes por servicio',
          backgroundColor: [],
          data: []
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Solicitudes por servicio',
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
          label: 'Calificaciones',
          backgroundColor: [],
          data: []
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Calificaciones',
          fontSize: 25,
          fontStyle: 'bold',
          fontFamily: 'Arial'
        }
      }
    });

  }

  getRandomColorHex(): string {
    var hex = '0123456789ABCDEF',
      color: string = '#';
    for (var i = 1; i <= 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
