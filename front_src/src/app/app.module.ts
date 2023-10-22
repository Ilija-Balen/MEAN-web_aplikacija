import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule}from  '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu'
import {MatButtonModule} from '@angular/material/button'

import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloggedComponent } from './adminlogged/adminlogged.component';
import { UsersService } from './services/users.service';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { AgencyPageComponent } from './agency-page/agency-page.component';
import { TrecaKlijentComponent } from './treca-klijent/treca-klijent.component';

import { PrvaKlijentComponent } from './prva-klijent/prva-klijent.component';
import { CetvrtaKlijentComponent } from './cetvrta-klijent/cetvrta-klijent.component';
import { CkkomentarComponent } from './ckkomentar/ckkomentar.component';
import { TrecaAgencijaComponent } from './treca-agencija/treca-agencija.component';
import { AdminAzurirajComponent } from './admin-azuriraj/admin-azuriraj.component';
import { AdminDodajComponent } from './admin-dodaj/admin-dodaj.component';
import { AdminRadniciComponent } from './admin-radnici/admin-radnici.component';
import { AdminPosloviComponent } from './admin-poslovi/admin-poslovi.component';
import { DrugaKlijentComponent } from './druga-klijent/druga-klijent.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AgencyComponent,
    AdminComponent,
    AdminloggedComponent,
    PocetnaComponent,
    AgencyPageComponent,
    TrecaKlijentComponent,
   
    PrvaKlijentComponent,
    CetvrtaKlijentComponent,
    CkkomentarComponent,
    TrecaAgencijaComponent,
    AdminAzurirajComponent,
    AdminDodajComponent,
    AdminRadniciComponent,
    AdminPosloviComponent,
    DrugaKlijentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    
  ],
  providers: [UsersService /*zakomentarisao da napravim meni*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
