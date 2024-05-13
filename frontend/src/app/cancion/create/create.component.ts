import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { CancionService } from '../cancion.service';
     
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
    
  form!: FormGroup;
  audioSrc: string='';
  selectedAudio!: any;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public cancionService: CancionService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      artista: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
    });

    // this.postService.getAllCategorias().subscribe((data:any)=>{
    //   this.categorias = data.categorias;
    // })
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
  // submit(){
  //   console.log(this.form.value);
  //   this.postService.create(this.form.value).subscribe((res:any) => {
  //        console.log('Post created successfully!');
  //        this.router.navigateByUrl('post/index');
  //   })
  // }

  submit(form: FormGroup){
    const formData = new FormData();

    formData.append('nombre', form.value.nombre);
    formData.append('genero', form.value.genero);

    formData.append('artista', form.value.artista);

    formData.append('file', this.selectedAudio);
    console.log(formData);

    this.cancionService.create(formData).subscribe((res:any) => {
         console.log('Lista created successfully!');
         this.router.navigateByUrl('cancion/index');
    })
  }

  onSelectFile(event:any){
    if( event.target.files.length > 0){
      const file = event.target.files[0];
      this.selectedAudio = file;
    }
  }
  
}