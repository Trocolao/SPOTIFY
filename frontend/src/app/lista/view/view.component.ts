import { Component, OnInit } from '@angular/core';
import { ListaService } from '../lista.service';
import { AuthService } from 'src/app/shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from '../lista';
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  lista!: Lista;
  image: string = "";
  isSignedIn:boolean=false;
  loggedUser: any;

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
    private authservice:AuthService
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
      console.log(this.lista);
      this.image = this.serverURL + this.lista.files[0].file_path;
      console.log(this.image)
    });
   
    this.auth.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
    });
    this.getUserLogged();
  }

  getUserLogged(){
    this.authservice.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
  deleteSongFromList(listaId: number, cancionId: number): void {
    this.listaService.deleteSongFromList(listaId, cancionId).subscribe({
      next: (response) => {
        console.log('Canción eliminada con éxito', response);
        this.router.navigateByUrl('lista/myindex');

      },
      error: (error) => {
        console.error('Error al eliminar la canción', error);
      }
    });
  }
  
  

}
