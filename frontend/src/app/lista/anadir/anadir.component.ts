import { Component, OnInit } from '@angular/core';
import { ListaService } from '../lista.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from '../lista';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { Cancion } from 'src/app/cancion/cancion';
import { CancionService } from 'src/app/cancion/cancion.service';

@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.css']
})
export class AnadirComponent implements OnInit {

  id!: number;
  lista!: Lista;
  image: string = "";
  isSignedIn:boolean=false;
  loggedUser: any;
  canciones:Cancion []=[];
  private serverURL = "http://localhost:8000/"

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public listaService: ListaService,
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthStateService,
    private authservice:AuthService,
    private cancionService: CancionService
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['listaId'];

    this.listaService.find(this.id).subscribe((data: Lista) => {
      this.lista = data;
      this.image = this.serverURL + this.lista.files[0].file_path;
      console.log(this.image);
    });
    this.cancionService.getAll().subscribe((data: Cancion[])=>{
      this.canciones = data;
      console.log(this.canciones);
    });
  }
  addSongToList(listaId: number, cancionId: number): void {
    this.listaService.addSongToList(listaId, cancionId).subscribe({
      next: (response) => {
        console.log('Canción añadida con éxito', response);
        this.router.navigateByUrl('lista/myindex');
      },
      error: (error) => {
        console.error('Error al eliminar la canción', error);
      }
    });
  } 

}
