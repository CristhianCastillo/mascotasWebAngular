import { Component, OnInit } from '@angular/core';
import { NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ScrollTopService } from '@services/scroll-top/scroll-top.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HourConvert } from '@models/HourConvert';
import { EstablishmentService } from '@services/establishment/establishment.service';
import { AgendaService } from '@services/agenda/agenda.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Establecimiento } from '@models/Establecimiento';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as CommonConst from '@constants/common';
import { EnumHorarios } from '@constants/common';
import * as LoginConst from '@constants/login';
import { EnumUtils } from '@utils/enum-utils';
import { DateUtils } from '@utils/date-utils';
import { MessagesUtils } from '@utils/messages-utils';
import { ValidationsUtils } from '@utils/validations-utils';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css']
})
export class EstablishmentsComponent implements OnInit {

  public services: any;
  public establecimiento: Observable<Establecimiento>;
  public idEstablecimiento: string;
  public dropdownSettings = {};
  public establishmentForm: FormGroup;

  public horaInicial: HourConvert;
  public horaFinal: HourConvert;
  public selectedFile: File;
  public imagen: any;
  public convertImage: any;

  public propiedades: any;
  public buttons: any;
  public listaHorarios: any;
  public variables: any;

  constructor(public config: NgbModalConfig, private messageService: MessagesUtils, private scrollTop: ScrollTopService,
              private formBuilder: FormBuilder, private establishmentService: EstablishmentService,
              private agendaService: AgendaService, public _DomSanitizer: DomSanitizer) {
    config.backdrop = 'static';
    this.selectedFile = null;
    this.idEstablecimiento = '';
    this.imagen = '';
    this.propiedades = environment.components.establishments;
    this.buttons = environment.common.buttons;
    this.variables = environment;
    this.listaHorarios = EnumUtils.convertKeys(EnumHorarios);
    this.convertImage = CommonConst.IMAGEN_CONVERT_BASE_64;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    this.establishmentForm = this.formBuilder.group({
      imagen: ['test'],
      nombre: ['', Validators.required],
      telefono: [''],
      direccion: [''],
      email: [''],
      paginaWeb: [''],
      servicios: ['', Validators.required],
      horarios: [''],
      horaInicial: [''],
      horaFinal: [''],
      descripcion: ['', Validators.required]
    });

    this.establecimiento = this.establishmentService.getEstablishment(usuarioAutentificado.id).pipe(
      tap(estable =>
        this.establishmentForm.patchValue(estable))
    );

    let horaInicialStr: string;
    let horaFinalStr: string;
    this.establecimiento.subscribe(
      (result: any) => {
        console.log(result);
        if(result.code === CommonConst.SUCCESS_CODE){
          result = result.result;
          this.idEstablecimiento = result.id;
          this.imagen = result.imagen;
          horaInicialStr = result.horaInicial;
          horaFinalStr = result.horaFinal;

          this.establishmentForm = this.formBuilder.group({
            imagen: ['test'],
            nombre: [result.nombre, Validators.required],
            telefono: [result.telefono],
            direccion: [result.direccion],
            email: [result.email],
            paginaWeb: [result.paginaWeb],
            servicios: [result.servicios, Validators.required],
            horarios: [result.horarios],
            horaInicial: [result.horaInicial],
            horaFinal: [result.horaFinal],
            descripcion: [result.descripcion, Validators.required]
          });

          // if(horaInicialStr != null && horaInicialStr != ''){
          //   let horaInicialPartes: string[] = horaInicialStr.split(':');
          //   this.horaInicial = new HourConvert();
          //   this.horaInicial.hour = Number(horaInicialPartes[0]);
          //   this.horaInicial.minute = Number(horaInicialPartes[1]);
          // }
          //
          // if(horaFinalStr != null && horaFinalStr != ''){
          //   let horaFinalPartes: string[] = horaFinalStr.split(':');
          //   this.horaFinal = new HourConvert();
          //   this.horaFinal.hour = Number(horaFinalPartes[0]);
          //   this.horaFinal.minute = Number(horaFinalPartes[1]);
          // }
        } else {
          this.messageService.showMessageError(null, result.description);
        }
      }, (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );

    this.agendaService.getServicesTypeOwner().subscribe(
      (result: any ) => {
        if(result.code === CommonConst.SUCCESS_CODE){
          this.services = result.result;
        } else {
          this.messageService.showMessageError(null, result.description);
        }
      }, (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );

    this.dropdownSettings = {
      singleSelection: false,
      //idField: 'id',
      //textField: 'nombre',
      selectAllText: this.propiedades['select.all.select'],
      unSelectAllText: this.propiedades['select.all.unselect'],
      searchPlaceholderText: this.propiedades['select.search'],
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  trackByFn(index, item) {
    return item.id;
  }

  isValidCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.establishmentForm);
  }

  isValidInput(field: string){
    return ValidationsUtils.isValidInput(field, this.establishmentForm);
  }

  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
    if(this.selectedFile != null) {
      if((this.selectedFile.type === CommonConst.IMAGE_JPEG_TYPE || this.selectedFile.type === CommonConst.IMAGE_PNG_TYPE)
        && this.selectedFile.size <= 10000) {
        let reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          this.imagen = reader.result.split(',')[1];
        };
      } else {
        this.imagen = '';
      }
    }
  }

  getData() {
    if(this.establishmentForm.valid) {
      const horaInicial = this.establishmentForm.value['horaInicial'];
      const horaFinal = this.establishmentForm.value['horaFinal'];
      console.log(horaInicial);
      // let fechaIni: string;
      // let fechaFin: string;
      // if(horaInicial != null && horaInicial != ''){
      //   fechaIni = DateUtils.hourConvertToDateString(horaInicial);
      // } else {
      //   fechaIni = '';
      // }
      //
      // if(horaFinal != null && horaFinal != ''){
      //   fechaFin = DateUtils.hourConvertToDateString(horaFinal);
      // } else {
      //   fechaFin = '';
      // }

      const establecimiento = {
        imagen: this.imagen,
        nombre: this.establishmentForm.value['nombre'],
        telefono: this.establishmentForm.value['telefono'],
        direccion: this.establishmentForm.value['direccion'],
        email: this.establishmentForm.value['email'],
        paginaWeb: this.establishmentForm.value['paginaWeb'],
        servicios: this.establishmentForm.value['servicios'],
        horarios: this.establishmentForm.value['horarios'],
        // horaInicial: fechaIni,
        // horaFinal: fechaFin,
        horaInicial: this.establishmentForm.value['horaInicial'],
        horaFinal: this.establishmentForm.value['horaFinal'],
        descripcion: this.establishmentForm.value['descripcion']
      };
      this.updateEstablishment(establecimiento);
    } else {
      ValidationsUtils.validateAllFormFields(this.establishmentForm);
    }
  }

  updateEstablishment(establecimiento) {
    this.establishmentService.updateEstablishment(this.idEstablecimiento, establecimiento).subscribe(
      (result: any ) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.messageService.showMessageSucces(this.propiedades['update.message.title'], this.propiedades['update.message.correct']);
        } else {
          this.messageService.showMessageError(this.propiedades['update.message.title'], this.propiedades['update.message.incorrect']);
        }
      }, (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );
  }
}
