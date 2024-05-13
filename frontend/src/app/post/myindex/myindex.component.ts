import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { AuthService } from 'src/app/shared/auth.service';
import { TokenService } from 'src/app/shared/token.service';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-myindex',
  templateUrl: './myindex.component.html',
  styleUrls: ['./myindex.component.css']
})
export class MyindexComponent implements OnInit{
  post: Post[] = [];
  isSignedIn: boolean = false;
  loggedUser: any;


  constructor(public postService:PostService,
    private authService:AuthService,
    private auth:AuthStateService,
    public token: TokenService,
    public router:Router
    ){}

  ngOnInit(): void {
    this.postService.getAllByUser().subscribe((data:Post[])=>{
      this.post = data;
      console.log(this.post);
    });

    this.auth.userAuthState.subscribe((val)=>{
      this.isSignedIn = val;
    });
    this.getUserLogged();
  }

  deletePeticion(id:number){
    this.postService.delete(id).subscribe(res=>{
      this.post = this.post.filter(item => item.id !== id);
    })
  }

  getUserLogged(){
    this.authService.profileUser().subscribe((data)=>{
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
  }
}
