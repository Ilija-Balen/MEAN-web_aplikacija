import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloggedComponent } from './adminlogged/adminlogged.component';
import { RegisterComponent } from './register/register.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AgencyPageComponent } from './agency-page/agency-page.component';
import { TrecaKlijentComponent } from './treca-klijent/treca-klijent.component';
import { CetvrtaKlijentComponent } from './cetvrta-klijent/cetvrta-klijent.component';
import { CkkomentarComponent } from './ckkomentar/ckkomentar.component';
import { TrecaAgencijaComponent } from './treca-agencija/treca-agencija.component';
import { AdminAzurirajComponent } from './admin-azuriraj/admin-azuriraj.component';
import { AdminDodajComponent } from './admin-dodaj/admin-dodaj.component';
import { AdminRadniciComponent } from './admin-radnici/admin-radnici.component';
import { AdminPosloviComponent } from './admin-poslovi/admin-poslovi.component';
import { PrvaKlijentComponent } from './prva-klijent/prva-klijent.component';
import { DrugaKlijentComponent } from './druga-klijent/druga-klijent.component';


const routes: Routes = [
  {path: "", component:PocetnaComponent},
  {path: "user", component:UserComponent},
  {path: "agency", component:AgencyComponent},
  {path: "admin", component:AdminComponent},
  {path: "adminlogged", component:AdminloggedComponent},
  {path: "register", component:RegisterComponent},
  {path: "login", component:LoginComponent},
  {path: "agency-page", component:AgencyPageComponent},
  {path: "prva-klijent", component:PrvaKlijentComponent},
  {path: "druga-klijent", component:DrugaKlijentComponent},
  {path: "treca-klijent", component:TrecaKlijentComponent},
  {path: "cetvrta-klijent", component:CetvrtaKlijentComponent},
  {path: "ckkomentar", component:CkkomentarComponent},
  {path: "treca-agencija", component:TrecaAgencijaComponent},
  {path: "admin-azuriraj", component:AdminAzurirajComponent},
  {path: "admin-dodaj", component:AdminDodajComponent},
  {path: "admin-radnici", component:AdminRadniciComponent},
  {path: "admin-poslovi", component:AdminPosloviComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
