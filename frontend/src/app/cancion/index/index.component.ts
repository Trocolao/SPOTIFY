import { Component } from '@angular/core';
import { CancionService } from '../cancion.service';
import { Cancion} from '../cancion';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  canciones: Cancion[] = [];
  constructor(public cancionService: CancionService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.cancionService.getAll().subscribe((data: Cancion[])=>{
      this.canciones = data;
      console.log(this.canciones);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(id:number){

    this.cancionService.delete(id).subscribe(res => {
         this.canciones = this.canciones.filter(item => item.id !== id);
         console.log('cancion deleted successfully!');
    })
  }
}

