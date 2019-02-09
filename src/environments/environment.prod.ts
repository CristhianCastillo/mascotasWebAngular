declare var require: any;
export const environment = {
  production: true,
  version: 'Versión: ' + require( '../../package.json').version,
  'application.name': 'Mascotas.ga',
  'application.imagen': '../../assets/imgs/logo-nav-mascotas.png',
  'autor.1': 'Cristhian Eduardo Castillo Erazo',
  'autor.2': 'Andres Felipe Ariza Calderon',
  components: {
    agenda: {
      'title': 'Mi Agenda',
      'message.spinner': 'Actualizando Registros...',
      'message.location': 'Ubicación:',
      'message.description': 'Descripción:',
      'message.no.agenda': 'Aun no tienes eventos, agregalos!',
      'url.image.no.agenda': '../../assets/imgs/no-agenda-register.png',
      'label.select.pet': 'Seleccionar Mascota',
      'label.select.pet.invalid': 'Selecciona una mascota',
      'label.name': 'Nombre',
      'label.name.invalid': 'Ingresa un nombre valido',
      'label.location': 'Ubicación',
      'label.location.invalid': 'Ingresa una ubicación valida',
      'label.tipo.evento': 'Tipo Evento',
      'label.tipo.evento.invalid': 'Selecciona un tipo de evento',
      'label.fecha.evento': 'Fecha Evento',
      'label.fecha.evento.invalid': 'Selecciona una fecha',
      'label.hora.evento': 'Hora Evento',
      'label.hora.evento.invalid': 'Selecciona una hora',
      'label.descripcion.evento': 'Descripción Evento',
      'label.descripcion.evento.invalid': 'Ingresa una descripción valida',
      'modal-create': {
        'title': 'Registrar Evento',
        'create.message.title': 'Registrar Evento',
        'create.message.correct': 'Evento registrado correctamente',
        'create.message.incorrect': 'El evento no ha sido registrado'
      },
      'modal-search': {
        'update.message.title': 'Actualizar Evento',
        'update.message.correct': 'Evento actualizado correctamente',
        'update.message.incorrect': 'El evento no se ha podido actualizar',
        'delete.message.title': 'Eliminar Evento',
        'delete.message.correct': 'Evento eliminado correctamente',
        'delete.message.incorrect': 'El evento no se ha podido eliminar'
      }
    },
    dashboard: {
      'chart.solicitudes.servicio': 'Solicitudes por servicio',
      'chart.calificaciones': 'Calificaciones',
      'random.letters': '0123456789ABCDEF',
      'message.no.dashboards': 'Aun no tienes calificaciones!',
      'url.image.no.dashboards': '../../assets/imgs/no-dashboards.png',
    },
    error: {
      'title': 'Upsss! Estamos teniendo problemas',
      'description': 'En estos momentos tu solicitud no puede ser atendida',
      'description.solution': 'Por favor intenta más tarde.',
      'error.imagen': '../../assets/imgs/pet-error.png',
      'error.title.page': 'Error'
    },
    establishments: {
      'title': 'Mi Establecimiento',
      'login': 'Cargando información',
      'description': 'Por favor verifica que tus datos son correctos, así te podrán encontrar mas fácil.',
      'label.seleccionar.foto': 'Seleccionar foto',
      'label.seleccionar.foto.file': 'Seleccionar una imagen...',
      'label.seleccionar.foto.invalid': 'Selecciona una imagen menor a 10 KB',
      'label.establecimiento': 'Nombre Establecimiento',
      'label.establecimiento.invalid': 'Ingresa un nombre valido',
      'label.servicios': 'Servicios',
      'label.servicios.invalid': 'Selecciona al menos un servicio',
      'label.telefono': 'Telefono',
      'label.direccion': 'Dirección',
      'label.horarios': 'Horarios',
      'label.pagina.web': 'Pagina Web',
      'label.correo.electronico': 'Correo Electronico',
      'label.abre': 'Abre a las',
      'label.cierra': 'Cierra a las',
      'label.descripcion': 'Descripción',
      'label.descripcion.invalid': 'Ingresa una descripción valida',
      'select.all.select': 'Seleccionar Todos',
      'select.all.unselect': 'Desmarcar Todos',
      'select.search': 'Buscar',
      'update.message.title': 'Actualizar Establecimieto',
      'update.message.correct': 'Los datos de tu establecimiento se han actualizado correctamente',
      'update.message.incorrect': 'No se ha podido actualizar el establecimiento'
    },
    footer: {
      'url.mobile.app.android': 'https://play.google.com/store',
      'url.modile.app.iso': 'https://www.apple.com/co/ios/app-store/',
      'url.image.google.store': '../../assets/imgs/disponible-android.png',
      'url.image.apple.store': '../../assets/imgs/disponible-app-store.png',
      'terminos.condiciones': 'Terminos y Condiciones de uso',
      'politicas': 'Politicas de privacidad',
      'soporte': 'Soporte',
      'copy.right': 'Copyright \u00A9 {0} MASCOTAS.GA. Todos los derechos reservados.'
    },
    header: {
      'label.menu.home': 'Home',
      'label.menu.login': 'Iniciar Sesión',
      'label.menu.register': 'Registrarse',

      'label.menu.establishment': 'Mi Establecimiento',
      'label.menu.solicitudes.propietario': 'Solicitudes',
      'label.menu.suministros.propietario': 'Suministros',
      'label.menu.estadisticas': 'Estadisticas',

      'label.menu.mascotas.usuario': 'Mis Mascotas',
      'label.menu.agenda.usuario': 'Mi Agenda',
      'label.menu.suministros.usuario': 'Suministros',
      'label.menu.exit': 'Salir'
    },
    home: {
    },
    login: {
      'message.spinner': 'Autentificando...',
      'title': 'Iniciar Sesión',
      'description': 'Por favor ingresa tus datos para entrar',
      'label.nombre.usuario': 'Nombre Usuario',
      'label.nombre.usuario.invalid': 'Ingresa un usuario valido.',
      'label.password': 'Contraseña',
      'label.password.invalid': 'Ingresa una contraseña valida.',
      'label.remember.password': 'Recordar contraseña',
      'label.forgot.password': '¿Olvidaste tu nombre de usuario o contraseña?',
      'label.register': '¿No tienes cuenta? Regístrate',
      'login.message.incorrect': 'Usuario y/o contraseña no validos.'
    },
    captcha: {
      'key': '6LcTZIkUAAAAAPq8N1jf-6q6wGLzW-5HAvNufUn0',
      'size': 'Normal', // -->  Normal, Compact
      'lang': 'es',
      'them': 'Light', // --> Dark, Light
      'type': 'Image', // --> Image, Audio
      'label.captcha.invalid': 'Demuestra que no eres un robot.'
    },
    notfound: {
      'title': 'Esta página ya no existe.',
      'description': 'No pudimos encontrar la página que estabas buscando.',
      'description.solution': 'Por favor intenta más tarde.',
      'error.imagen': '../../assets/imgs/404-error.png',
      'error.title.page': '404 - Not Found'
    },
    pets: {
      'title': 'Lista de Mascotas',
      'message.no.pets': 'Aun no tienes amigos, agregalos!',
      'message.spinner': 'Actualizando...',
      'url.image.no.pets': '../../assets/imgs/no-pets-register.png',
      'label.chosee.photo': 'Seleccionar foto',
      'label.chosee.photo.invalid': 'Selecciona una imagen menor a 10 KB',
      'label.nombre.mascota': 'Nombre Mascota',
      'label.nombre.mascota.invalid': 'Ingresa un nombre valido.',
      'label.tipo.mascota': 'Tipo Mascota',
      'label.tipo.mascota.invalid': 'Selecciona un tipo de mascota.',
      'label.genero': 'Genero',
      'label.genero.invalid': 'Selecciona un genero.',
      'label.fecha.nacimiento': 'Fecha Nacimiento',
      'label.fecha.nacimiento.invalid': 'Selecciona una fecha de nacimiento.',
      'label.raza': 'Raza',
      'label.raza.invalid': 'Ingresa una raza valida.',
      'label.esterilizado': 'Esterilizado',
      'label.esterilizado.invalid': 'Selecciona una opción',
      'label.color': 'Color',
      'label.color.invalid': 'Ingresa un color valido.',
      'label.descripcion': 'Descripción Mascota',
      'label.descripcion.invalid': 'Ingresa una descripción valida.',
      'modal-create': {
        'title': 'Crear Mascota',
        'create.message.title': 'Registrar Mascota',
        'create.message.correct': 'Mascota registrada correctamente',
        'create.message.incorrect': 'La mascota no ha sido registrada'
      },
      'modal-search': {
        'update.message.title': 'Actualizar Mascota',
        'update.message.correct': 'Mascota actualizada correctamente',
        'update.message.incorrect': 'No se ha podido actualizar la mascota',
        'delete.message.title': 'Eliminar Mascotas',
        'delete.message.correct': 'Mascota eliminada correctamente',
        'delete.message.incorrect': 'No se ha podido eliminar la mascota'
      }
    },
    'pets-admin': {
      'message.spinner': 'Actualizando...',
      'title': 'Solicitudes de Clientes',
      'label.fecha.inicial': 'Fecha Inicial',
      'label.fecha.inicial.invalid': 'Selecciona una fecha inicial.',
      'label.fecha.final': 'Fecha Final',
      'label.fecha.final.invalid': 'Selecciona una fecha final.',
      'label.tipo.actividad': 'Tipo Actividad: {0}',
      'label.mensaje': 'Mensaje:',
      'label.respuesta': 'Respondiste:',
      'title.modal': 'Enviar Respuesta',
      'label.enviar.respuesta': 'Enviar respuesta a solicitud de {0}',
      'label.enviar.respuesta.invalid': 'Ingresa un mensaje.',
      'send.message.correct': 'Mensaje enviado correctamente',
      'send.message.incorrect': 'No se ha podido eviar el mensaje.',
      'title.search': 'Upsss!',
      'search.message.incorrect': 'No se puede buscar las solicitudes en este momento.',
      'message.no.solicitudes': 'No se encontraron solicitudes!',
      'url.image.no.solicitudes': '../../assets/imgs/no-request.png',
    },
    register: {
      'description': 'Por favor ingresa algunos datos para crear tu cuenta',
      'label.nombre.usuario': 'Nombre Usuario',
      'label.nombre.usuario.invalid': 'Ingresa un usuario valido.',
      'label.nombres': 'Nombres',
      'label.nombres.invalid': 'Ingresa un nombre valido',
      'label.apellidos': 'Apellidos',
      'label.apellidos.invalid': 'Ingresa al menos un apellido.',
      'label.correo.electronico': 'Correo Electronico',
      'label.correo.electronico.invalid': 'Ingresa un correo valido.',
      'label.establecimiento': 'Establecimiento',
      'label.establecimiento.invalid': 'Ingresa un establecimiento valido.',
      'label.nit.establecimiento': 'Nit Establecimiento',
      'label.nit.establecimiento.invalid': 'Ingresa un nit valido',
      'label.descripcion': 'Descripción',
      'label.descripcion.invalid': 'Ingresa una descripcion valida',
      'label.password': 'Contraseña',
      'label.password.invalid': 'Ingresa una contraseña valida.',
      'label.confirm.password': 'Confirmación Contraseña',
      'label.confirm.password.invalid': 'Ingresa una confirmación valida',
      'label.confirm.password.diferent': 'La confirmación no coincide.',
      'label.terminos.condiciones': 'Declaro que he leido y acepto los Terminos y Condiciones',
      'label.terminos.condiciones.invalid': 'Debes aceptar los terminos y condiciones',
      'link.inicio.sesion': '¿Ya tienes cuenta? Inicia Sesión',
      'register.message.title': 'Registro',
      'register.message.correct': 'Registro exitoso, por favor revisa tu email para confirmar tu cuenta.',
      'alert.message.user.invalid': 'El nombre seleccionado ya esta en uso.',
      'alert.message.email.invalid': 'El email seleccionado ya esta registrado.',
      'alert.message.establecimiento.invalid': 'El nombre del establecimiento ya esta registrado.',
      'alert.message.nit.invalid': 'El nit del establecimiento ya esta registrado.',
      'register.user': {
        'title': 'Registrarse en {0}',
        'button.registro': 'Registrarse como propietario',
        'link.ingresar': '¿Deseas registrarte como propietario?',
      },
      'register.owner': {
        'title': 'Registrarse en {0} como propietario',
        'button.registro': 'Registrarse como usuario',
        'link.ingresar': '¿Deseas registrarte como usuario?',
      }
    },
    supplies: {
      'title': 'Suministros',
      'title.admin': 'Suministros Establecimiento',
      'message.spinner': 'Actualizando...',
      'label.descripcion.precio': 'Precio: {0}',
      'label.descripcion.comentario': 'Comentario: {0}',
      'label.tipo.suministro': 'Tipo Suministro',
      'label.tipo.suministro.invalid': 'Selecciona un tipo.',
      'label.nombre.suministro': 'Nombre Suministro',
      'label.nombre.suministro,invalid': 'Ingresa un nombre valido.',
      'label.cantidad.suministro': 'Cantidad Suministro',
      'label.cantidad.suministro.invalid': 'Ingresa una cantidad valida.',
      'label.unidad.medida': 'Unidad de Medida',
      'label.unidad.medida.invalid': 'Selecciona una unidad',
      'label.fecha.compra': 'Fecha Compra',
      'label.fecha.compra.invalid': 'Ingresa una fecha valida',
      'label.precio': 'Precio',
      'label.precio.invalid': 'Ingresa un precio valido',
      'label.nombre.tienda': 'Nombre Tienda',
      'label.nombre.tienda.invalid': 'Ingresa el nombre de un proveedor valido.',
      'label.comentarios': 'Comentarios',
      'label.comentarios.invalid': 'Ingresa un comentario valido.',
      'message.no.supplies': 'No se encontraron suministros, agregalos!',
      'url.image.no.supplies': '../../assets/imgs/no-supplie-register.png',
      'modal.create' : {
        'title': 'Registrar Suministro',
        'create.message.title': 'Agregar Suministro',
        'create.message.correct': 'Suministro agregado correctamente',
        'create.message.incorrect': 'No se ha podido agregar el producto'
      },
      'modal.search': {
        'update.message.title': 'Actualizar Suministro',
        'update.message.correct': 'Suministro actualizado correctamente',
        'update.message.incorrect': 'No se ha podido actualizar el suministro',
        'delete.message.title': 'Eliminar Suministro',
        'delete.message.correct': 'Suministro eliminado correctamente',
        'delete.message.incorrect': 'No se ha podido eliminar el suministro'
      }
    }
  },
  services: {
    'end.point': 'http://localhost:8080',
    'content.type': 'application/json'
  },
  common: {
    select: {
      "default.option": "Selecciona una opción"
    },
    buttons: {
      'button.create': 'Crear',
      'button.create.count': 'Crear Cuenta',
      'button.search': 'Consultar',
      'button.update': 'Actualizar',
      'button.delete': 'Eliminar',
      'button.login': 'Ingresar',
      'button.ok': 'Aceptar',
      'button.cancel': 'Cancelar',
      'button.close': 'Cerrar',
      'button.view': 'Ver Detalles',
      'button.register': 'Registrar',
      'button.response': 'Responder',
      'button.send': 'Enviar'
    },
    messages: {
      'message.title.default': 'Mascotas.ga',
      'message.body.default': 'Mascotas.ga, el sitio ideal para tus mascotas.',
      correct: {
        'title.common': 'Correcto',
        'message.common': 'Acción completada correctamente!',
        'icon.common': '../../assets/imgs/message-success.png'
      },
      error: {
        'title.common': 'Error',
        'message.common': 'Mascotas.ga pide disculpas, en estos momentos tu solicitud no podra ser atendida.',
        'icon.common': '../../assets/imgs/message-incorrect.png'
      },
      information: {
        'title.common': 'Información',
        'message.common': 'Mensaje de información',
        'icon.common': '../../assets/imgs/message-information.png'
      },
      warning: {
        'title.common': 'Advertencia',
        'message.common': 'Advertencia.',
        'icon.common': '../../assets/imgs/message-warning.png'
      }
    }
  }
};
