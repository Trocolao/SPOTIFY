import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { ListaService } from '../lista.service';
import { Lista } from '../lista';

@Component({
  selector: 'app-myindex',
  templateUrl: './myindex.component.html',
  styleUrls: ['./myindex.component.css']
})
export class MyindexComponent implements OnInit{
  listas: Lista[] = [];
  isSignedIn: boolean = false;
  loggedUser: any;


  constructor(public listaService:ListaService,
    private authService:AuthService,
    private auth:AuthStateService,
    public token: TokenService,
    public router:Router
    ){}

  ngOnInit(): void {
    this.listaService.getAllByUser().subscribe((data:Lista[])=>{
      this.listas = data;
      console.log(this.listas);
    });

    this.auth.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
    });
    this.getUserLogged();
  }

  deletePost(id:number){
    this.listaService.delete(id).subscribe(res => {
         this.listas = this.listas.filter(item => item.id !== id);
         console.log('Lista deleted successfully!');
    })
  }

  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
