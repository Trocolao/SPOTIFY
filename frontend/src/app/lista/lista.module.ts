import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaRoutingModule } from './lista-routing.module';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { MyindexComponent } from './myindex/myindex.component';
import { EditComponent } from './edit/edit.component';
import { AnadirComponent } from './anadir/anadir.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    MyindexComponent,
    EditComponent,
    AnadirComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ListaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListaModule { }
