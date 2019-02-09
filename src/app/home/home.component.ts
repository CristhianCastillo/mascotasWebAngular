import { Component, OnInit } from '@angular/core';
import { ScrollTopService } from '@services/scroll-top/scroll-top.service';
import * as HeaderConst from '@constants/header-menu';
import { MessagesUtils} from '@utils/messages-utils';
import { environment } from '@env/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public carousel: any = [
    {
      id: 0,
      imagen: '../../assets/imgs/carousel 1- opt.jpg',
      title: '¿Estas listo para darle una muestra más de amor a tus mascotas?',
      description: '',
      button: 'Ingresa ahora',
      url: HeaderConst.URL_LOGIN
    },
    {
      id: 1,
      imagen: '../../assets/imgs/carousel 2- opt.jpg',
      title: environment['application.name'],
      description: 'Qué mejor manera de conectar a los dueños de las mascotas con los locales que tanto necesitan.',
      button: 'Mirar más',
      url: HeaderConst.URL_REGISTER
    },
    {
      id: 2,
      imagen: '../../assets/imgs/carousel 3- opt.jpg',
      title: 'Has llegar tu negocio de la mejor manera',
      description: 'Llega a aquellos potenciales clientes que tu negocio necesita.',
      button: 'Registrate',
      url: HeaderConst.URL_REGISTER_ADMIN
    }
  ];

  public marketing: any = [
    {
      id: 0,
      imagen: '../../assets/imgs/control.png',
      title: 'No pierdas el control',
      description: 'Si eres dueño de una mascota, puedes controlar de mejor manera todo lo que el/ella necesita.',
      button: 'Ingresa',
      url: '/login'
    },
    {
      id: 1,
      imagen: '../../assets/imgs/organiza.jpg',
      title: 'Administra tu agenda',
      description: 'Ya sea que seas dueño de una mascota o dueño de un local, tienes la oportunidad de llevar la cuenta de las actividades ' +
        'que tu amigo favorito o negocio necesita.',
      button: 'Ingresa',
      url: '/login'
    },
    {
      id: 2,
      imagen: '../../assets/imgs/disfruta.jpg',
      title: 'Disfruta',
      description: 'Aprovecha en lo que más puedas, tienes múltiples posibilidades para administrarte de la mejor manera.',
      button: 'Ingresa',
      url: '/login'
    }
  ];

  public bodyDescription: any = [
    {
      id: 0,
      imagen: '../../assets/imgs/agenda-opt.jpg',
      title: 'Crea una agenda',
      description: 'Ya sea que tengas una mascota bajo tu cuidado o que dirijas tu propio negocio, puedes crear una agenda donde puedas establecer las citas que tu mascota/negocio tiene.',
      textmuted: 'Enserio debes probar esta funcionalidad.'
    },
    {
      id: 1,
      imagen: '../../assets/imgs/suministro-opt.jpg',
      title: 'Administra suministros',
      description: 'Dentro de la aplicación, tu podrás llevar en cuenta todos los suministros/inventario con los que cuentas, así como añadir, modificar o eliminar los que necesites.',
      textmuted: 'Cuentas claras en un solo lugar.'
    },
    {
      id: 2,
      imagen: '../../assets/imgs/perfil-opt.jpg',
      title: 'Crea tu perfil',
      description: 'Tienes tu propio apartado donde ingresar tus datos y los de tus mascotas o de tu local (según sea el caso). Todo al alcance de un click.',
      textmuted: 'Como debe ser siempre.'
    }
  ];
  constructor(private scrollTop: ScrollTopService, private messageService: MessagesUtils) { }

  ngOnInit() {
    this.scrollTop.setScrollTop();
  }

  trackByFn(index, item) {
    return item.id;
  }
}
