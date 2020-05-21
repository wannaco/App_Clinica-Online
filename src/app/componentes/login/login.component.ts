import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { Usuario } from 'src/app/clases/Usuario';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  public usuario: Usuario;
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  medicos: Array<Usuario>;
  pacientes: Array<Usuario>;

  constructor(private servicioPacientes: PacientesService,
              private servicioMedicos: MedicosService,
              private route: ActivatedRoute, private router: Router) 
  {
    this.usuario = new Usuario();  
  }

  ngOnInit(): void {
    // Traer al administrador tambien
    this.medicos  = this.servicioPacientes.leer();
    this.pacientes = this.servicioMedicos.leer();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor.';
    }

    return this.email.hasError('email') ? 'No es un mail válido.' : '';
  }

  login(){
    // Implementar JWT
    let usuarios: Array<Usuario> = new Array<Usuario>();
    usuarios = usuarios.concat(this.medicos).concat(this.pacientes);
    
    this.usuario = usuarios.find((usuario)=> this.usuario.email === usuario.email && 
                              this.usuario.clave === usuario.clave);
    console.log(`Nombre de usuario: ${this.usuario.nombre}`);
    MiservicioService.iniciarSesion(this.usuario);
    this.router.navigate(["home"]);
  }
}
