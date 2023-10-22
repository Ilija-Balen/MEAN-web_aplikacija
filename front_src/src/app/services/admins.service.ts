import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {
  

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000"

  login(usernameFromForm, passwordFromForm){
    let data= {
      username:usernameFromForm,
      password:passwordFromForm
    }

    return this.http.post(`${this.uri}/admin/login`, data)
  }

  findnotApprovedUsers(){
    return this.http.get(`${this.uri}/admin/findnotApprovedUsers`)
  }

  findnotApprovedAgency(){
    return this.http.get(`${this.uri}/admin/findnotApprovedAgency`)
  }

  accept(emailFF){
    let data = {
      email:emailFF
    }
    return this.http.post(`${this.uri}/admin/accept`, data)
  }

  deny(emailFF){
    let data = {
      email: emailFF
    }

    return this.http.post(`${this.uri}/admin/deny`, data)
  }
  
  findAllApprovedUsers(){
    return this.http.get(`${this.uri}/admin/findAllApprovedUsers`);
  }

  findAllApprovedAgency(){
    return this.http.get(`${this.uri}/admin/findAllApprovedAgency`);
  }

  addUser(usernameFromForm, passwordFromForm, phoneFromForm, emailFromForm,
    firstnameFromForm, lastnameFromForm, urlFromForm){
      let data ={
        username:usernameFromForm,
        password:passwordFromForm,
        phone:phoneFromForm,
        email:emailFromForm,
        firstname: firstnameFromForm,
        lastname: lastnameFromForm,
        url:urlFromForm
      }
      return this.http.post(`${this.uri}/admin/addUser`, data);
  }

  addAgency(usernameFromForm, passwordFromForm, phoneFromForm, emailFromForm,
    agnameFromForm,stateFromForm,cityFromForm,streetFromForm, snmuberFromForm, PIBFromForm, descFromForm, 
    urlFromForm){
      let data = { 
        username:usernameFromForm,
        password:passwordFromForm,
        phone:phoneFromForm,
        email:emailFromForm,
        agname:agnameFromForm,
        state:stateFromForm,
        city:cityFromForm,
        street: streetFromForm,
        snumber: snmuberFromForm,
        PIB: PIBFromForm,
        description: descFromForm,
        url: urlFromForm
      }
      return this.http.post(`${this.uri}/admin/addAgency`,data);
  }

  obrisi(emailFF){
    let data= {
      email:emailFF
    }
    return this.http.post(`${this.uri}/admin/obrisi`,data);
  }

  azurirajUser(emailSESSION, usernameFromForm, passwordFromForm, phoneFromForm, emailFromForm,
    firstnameFromForm, lastnameFromForm, urlFromForm){
      let data ={
        emailSession:emailSESSION,
        username:usernameFromForm,
        password:passwordFromForm,
        phone:phoneFromForm,
        email:emailFromForm,
        firstname: firstnameFromForm,
        lastname: lastnameFromForm,
        url:urlFromForm
      }
      return this.http.post(`${this.uri}/admin/azurirajUser`,data);
  }

  azurirajAgency(emailSESSION, usernameFromForm, passwordFromForm, phoneFromForm, emailFromForm,
    agnameFromForm,stateFromForm,cityFromForm,streetFromForm, snmuberFromForm, PIBFromForm, descFromForm, 
    urlFromForm){
      let data = {
        emailSession:emailSESSION, 
        username:usernameFromForm,
        password:passwordFromForm,
        phone:phoneFromForm,
        email:emailFromForm,
        agname:agnameFromForm,
        state:stateFromForm,
        city:cityFromForm,
        street: streetFromForm,
        snumber: snmuberFromForm,
        PIB: PIBFromForm,
        description: descFromForm,
        url: urlFromForm
      }
      return this.http.post(`${this.uri}/admin/azurirajAgency`,data);
  }
  
  dodajRadnika(emailFF: string, firstnameFF: string, lastnameFF: string, phoneFF: string, specialityFF: string, emailAgencyFF: string) {
   let data= {
    email:emailFF,
    firstname:firstnameFF,
    lastname:lastnameFF,
    phone:phoneFF,
    speciality:specialityFF,
    emailAgency:emailAgencyFF
   }
   return this.http.post(`${this.uri}/admin/dodajRadnika`,data);
  }

  getAllRadnici(){
    return this.http.get(`${this.uri}/admin/getAllRadnici`);
  }

  azurirajRadnika(emailSESSION, phoneFromForm, emailFromForm,
    firstnameFromForm, lastnameFromForm, specialityFF, emailAgencyFF){
    let data ={
      emailSession:emailSESSION,
      phone:phoneFromForm,
      email:emailFromForm,
      firstname: firstnameFromForm,
      lastname: lastnameFromForm,
      speciality:specialityFF,
      emailAgency:emailAgencyFF
    }
    return this.http.post(`${this.uri}/admin/azurirajRadnika`,data);
  }

  obrisiRadnika(emailFF){
    let data = {
      email:emailFF
    }
    return this.http.post(`${this.uri}/admin/obrisiRadnika`,data);
  }
  
  getAllPoslovi(){
    return this.http.get(`${this.uri}/admin/getAllPoslovi`);
  }
}
