import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  recuerdame: boolean = false;
  email: string;

  auth2: any;


  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    private zone: NgZone
  ) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0) {
      this.recuerdame = true;
    }

  }


  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '631955000050-u5h4kb17ttkgifk83k3rfs9i5v8evkg2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));

    });

  }


  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      // Ejecutamos dentro de una zona
      this.zone.run( () => {
        this._usuarioService.loginGoogle( token )
                            .subscribe( resp => {
                              this.router.navigate(['/dashboard']);
                              // window.location.href = '#/dashboard';
                            });
      });

    });
  }


  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login( usuario, forma.value.recuerdame )
                        .subscribe( correcto => this.router.navigate(['/dashboard']));
    // this.router.navigate(['/dashboard']);

  }


}
