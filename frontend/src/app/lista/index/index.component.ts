import { Component } from '@angular/core';
import { ListaService } from '../lista.service';
import { Lista} from '../lista';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  listas: Lista[] = [];
  constructor(public listaService: ListaService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.listaService.getAll().subscribe((data: Lista[])=>{
      this.listas = data;
      console.log(this.listas);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  
}