import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../modal-out-message/modal-out-message.component';
import { ScrollTopService } from '../services/scroll-top.service';
import {Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {HourConvert} from '../models/HourConvert';
import { EstablishmentService } from '../services/establishment/establishment.service';
import { AgendaService } from '../services/agenda/agenda.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Establecimiento } from '../models/Establecimiento';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

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

  constructor(public config: NgbModalConfig, private modalService: NgbModal, private scrollTop: ScrollTopService,
              private formBuilder: FormBuilder, private establishmentService: EstablishmentService,
              private agendaService: AgendaService, public _DomSanitizer: DomSanitizer) {
    config.backdrop = 'static';
    this.selectedFile = null;
    this.idEstablecimiento = '';
    this.imagen = '';
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
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
      tap(estable => this.establishmentForm.patchValue(estable))
    );

    let horaInicialStr: string;
    let horaFinalStr: string;
    this.establecimiento.subscribe(
      (result: any) => {
        console.log(result);
        this.idEstablecimiento = result.id;
        this.imagen = result.imagen;
        horaInicialStr = result.horaInicial;
        horaFinalStr = result.horaFinal;

        if(horaInicialStr != null && horaInicialStr != ''){
          let horaInicialPartes: string[] = horaInicialStr.split(':');
          console.log(horaInicialStr);
          this.horaInicial = new HourConvert();
          this.horaInicial.hour = Number(horaInicialPartes[0]);
          this.horaInicial.minute = Number(horaInicialPartes[1]);
          //this.establishmentForm.setValue({horaInicial: this.horaInicial});
        }

        if(horaFinalStr != null && horaFinalStr != ''){
          let horaFinalPartes: string[] = horaFinalStr.split(':');
          console.log(horaFinalStr);
          this.horaFinal = new HourConvert();
          this.horaFinal.hour = Number(horaFinalPartes[0]);
          this.horaFinal.minute = Number(horaFinalPartes[1]);
          console.log(this.horaFinal);
          //this.establishmentForm.controls['horaFinal'].patchValue(this.horaFinal);
        }
      }
    );

    this.agendaService.getServicesTypeOwner().subscribe(
      (result: any ) => {
        this.services = result;
      },
      (error) => {
        console.error(error);
      }
    );

    this.dropdownSettings = {
      singleSelection: false,
      //idField: 'id',
      //textField: 'nombre',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Desmarcar Todos',
      searchPlaceholderText: 'Buscar',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }

  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    if(this.selectedFile != null){
      if((this.selectedFile.type === 'image/jpeg' || this.selectedFile.type === 'image/png')&& this.selectedFile.size <= 10000){
        let reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          this.imagen = reader.result.split(',')[1];
        };
      }else {
        this.imagen = '';
      }
    }
  }

  getData(){
    const horaInicial = this.establishmentForm.value['horaInicial'];
    const horaFinal = this.establishmentForm.value['horaFinal'];
    let fechaInicialDate: Date;
    let fechaFinalDate: Date;
    let fechaIni: string;
    let fechaFin: string;
    console.log(horaInicial);
    if(horaInicial != null && horaInicial != ''){
      console.log("Aqui dentro11111111111111111111111111");
      fechaInicialDate = new Date(Date.UTC(2000, 2, 2, horaInicial.hour, horaInicial.minute, 0, 0));
      fechaIni = fechaInicialDate.toISOString().slice(11, 16);
    } else {
      fechaIni = '';
    }

    if(horaFinal != null && horaFinal != ''){
      fechaFinalDate = new Date(Date.UTC(2000, 2, 2, horaFinal.hour, horaFinal.minute, 0, 0));
      fechaFin = fechaFinalDate.toISOString().slice(11, 16);
    } else {
      fechaFin = '';
    }

    const establecimiento = {
      imagen: this.imagen,
      nombre: this.establishmentForm.value['nombre'],
      telefono: this.establishmentForm.value['telefono'],
      direccion: this.establishmentForm.value['direccion'],
      email: this.establishmentForm.value['correo'],
      paginaWeb: this.establishmentForm.value['paginaWeb'],
      servicios: this.establishmentForm.value['servicios'],
      horarios: this.establishmentForm.value['horarios'],
      horaInicial: fechaIni,
      horaFinal: fechaFin,
      descripcion: this.establishmentForm.value['descripcion']
    }
    console.log(establecimiento);
    this.updateEstablishment(establecimiento);
  }

  updateEstablishment(establecimiento){
    console.log(establecimiento);
    console.log(this.idEstablecimiento);
    this.establishmentService.updateEstablishment(this.idEstablecimiento, establecimiento).subscribe(
      (result: any ) => {
        console.log(result);
        if (result.status) {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Actualizar Establecimiento";
          modalRef.componentInstance.contenidoMensaje = "Los datos de tu establecimiento se han actualizado correctamente.";
        } else {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Actualizar Establecimiento";
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido actualizar el establecimiento.';
        }
      }
    );
  }
}
