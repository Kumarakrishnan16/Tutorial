import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageComponent } from './storage/storage.component';
import { FirstComponent } from './first/first.component';
import { FormsComponent } from './forms/forms.component';

const routes: Routes = [
  { path: '', component: FirstComponent },
  { path: 'storage/:id', component: StorageComponent },
  { path:'form', component:FormsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
