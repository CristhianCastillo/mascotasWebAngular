import { Component, OnInit } from '@angular/core';
import { ScrollTopService } from '@services/scroll-top/scroll-top.service';
import { Chart } from 'chart.js';
import { DashboardsService } from '@services/dashboards/dashboards.service';
import { environment } from '@env/environment';
import * as LoginConst from '@constants/login';
import { CommonUtils } from '@utils/common-utils';
import * as CommonConst from '@constants/common';
import { MessagesUtils } from '@utils/messages-utils';

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
  public avisoDashboard: string;
  constructor(private scrollTop: ScrollTopService, private service: DashboardsService, private messageService: MessagesUtils) {
    this.propiedades = environment.components.dashboard;
    this.avisoDashboard = null;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    this.service.getCountServices(usuarioAutentificado.id).subscribe(
      (result: any) => {
        if(result.code === CommonConst.SUCCESS_CODE) {
          this.avisoDashboard = null;
          if(result.result.numeros.length == 0){
            this.avisoDashboard = null;
          } else {
            for(let i = 0; i < result.result.numeros.length; i ++) {
              let temp = result.result.numeros[i];
              if(temp > 0) {
                this.avisoDashboard = '';
              }
            }
          }
          if(this.avisoDashboard) {
            this.chart1.data.labels = result.result.servicios;
            this.chart1DatosNumeros = result.result.numeros;
            for (let i: number = 0; i < this.chart1DatosNumeros.length; i++) {
              this.chart1.data.datasets[0].data.push(this.chart1DatosNumeros[i]);
              this.chart1.data.datasets[0].backgroundColor.push(CommonUtils.getRandomColorHex());
            }
            this.chart1.update();
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
          }
        } else {
          this.messageService.showMessageError(null, result.description);
        }
      },
      (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );

    this.service.getCountQualify(usuarioAutentificado.id).subscribe(
      (result: any) => {
        if(result.code === CommonConst.SUCCESS_CODE) {
          if(!this.avisoDashboard) {
            this.avisoDashboard = null;
            if(result.result.numeros.length == 0){
              this.avisoDashboard = null;
            } else {
              for(let i = 0; i < result.result.numeros.length; i ++) {
                let temp = result.result.numeros[i];
                if(temp > 0) {
                  this.avisoDashboard = '';
                }
              }
            }
          }
          if(this.avisoDashboard) {
            this.chart2.data.labels = result.result.servicios;
            this.chart2DatosNumeros = result.result.numeros;
            for (let i: number = 0; i < this.chart2DatosNumeros.length; i++) {
              this.chart2.data.datasets[0].data.push(this.chart2DatosNumeros[i]);
              this.chart2.data.datasets[0].backgroundColor.push(CommonUtils.getRandomColorHex());
            }
            this.chart2.update();
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
        } else {
          this.messageService.showMessageError(null, result.description);
        }
      },
      (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );
  }
}
