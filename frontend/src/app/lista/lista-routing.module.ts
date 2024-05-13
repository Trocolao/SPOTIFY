import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AnadirComponent } from './anadir/anadir.component';
import { MyindexComponent } from './myindex/myindex.component';

const routes: Routes = [
  { path: 'lista', redirectTo: 'lista/index', pathMatch: 'full'},
  { path: 'lista/myindex', component: MyindexComponent },
  { path: 'lista/index', component: IndexComponent },
  { path: 'lista/:listaId/view', component: ViewComponent },
  { path: 'lista/create', component: CreateComponent },
  { path: 'lista/:listaId/edit', component: EditComponent },
  { path: 'lista/:listaId/anadir', component: AnadirComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaRoutingModule { }
