import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'cancion', redirectTo: 'cancion/index', pathMatch: 'full'},
  { path: 'cancion/index', component: IndexComponent },
  { path: 'cancion/:cancionId/view', component: ViewComponent },
  { path: 'cancion/create', component: CreateComponent },
  { path: 'cancion/:cancionId/edit', component: EditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CancionRoutingModule { }
