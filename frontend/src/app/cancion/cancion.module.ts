import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CancionRoutingModule } from './cancion-routing.module';
import { CreateComponent } from './create/create.component';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    CancionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CancionModule { }
