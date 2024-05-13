import { Component, OnInit } from '@angular/core';
import { ListaService } from '../lista.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from '../lista';
import { FormGroup, FormControl, Validators} from '@angular/forms';
     
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
      
  id!: number;
  lista!: Lista;
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public listaService: ListaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['listaId'];
    this.listaService.find(this.id).subscribe((data: Lista)=>{
      this.lista = data;
    }); 
      
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      
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
    this.listaService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Lista updated successfully!');
         this.router.navigateByUrl('lista/myindex');
    })
  }
   
}