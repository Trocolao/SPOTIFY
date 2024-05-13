import { Component, OnInit } from '@angular/core';
import { CancionService } from '../cancion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cancion } from '../cancion';
import { FormGroup, FormControl, Validators} from '@angular/forms';
     
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
      
  id!: number;
  cancion!: Cancion;
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public cancionService: CancionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['cancionId'];
    this.cancionService.find(this.id).subscribe((data: Cancion)=>{
      this.cancion = data;
    }); 
      
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      genero: new FormControl('', Validators.required),
      artista: new FormControl('', Validators.required),

    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.cancionService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Cancion updated successfully!');
         this.router.navigateByUrl('cancion/index');
    })
  }
   
}