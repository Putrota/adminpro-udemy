import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare let swal: any;


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {


  hospitales: Hospital[] = [];
  cargando: boolean = true;


  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }


  ngOnInit() {

    this.cargarHospitales();

    this._modalUploadService.notificacion
        .subscribe( resp => this.cargarHospitales());

  }


  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales()
      .subscribe( hospitales => {

        this.hospitales = hospitales;
        this.cargando = false;

      });

  }


  buscarHospital( termino: string ) {

    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital( termino)
        .subscribe( (hospitales: Hospital[]) => {

          this.hospitales = hospitales;
          this.cargando = false;

        });
  }


  mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal('hospitales', id);

  }


  guardarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
        .subscribe();

  }


  borrarHospital( hospital: Hospital ) {

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    }).then( borrar => {

      if (borrar) {

        this._hospitalService.borrarHospital(hospital._id)
            .subscribe( borrado => {
              console.log(borrado);
              this.cargarHospitales();
            });

      }

    });

  }


  crearHospital() {

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
          .subscribe( () => this.cargarHospitales() );

    });

  }


}
