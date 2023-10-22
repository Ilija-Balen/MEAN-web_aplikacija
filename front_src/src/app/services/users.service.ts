import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  uri = "http://localhost:4000";

  login(usernameFromForm, passwordFromForm){
    const data = {
      username:usernameFromForm,
      password:passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  

  
  sendMail(newpass, email){
    let data ={
      temppass:newpass,
      LoggedUser: email
    }
    return this.http.post(`${this.uri}/users/sendmail`, data);
  }

  changepass(newpass, email){
    let data = {
      newpass:newpass,
      LoggedUser: email
    }

    return this.http.post(`${this.uri}/users/changepass`, data);
  }

  deletefromtmp(email){
    let data={
      LoggedUser:email
    }

    return this.http.post(`${this.uri}/users/deletefromtmp`,data);
  }


  registeruser(usernameFromForm, passwordFromForm, phoneFromForm, emailFromForm,
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

    return this.http.post(`${this.uri}/users/registeruser`, data);
  }

  registeragency(usernameFromForm, passwordFromForm, phoneFromForm, emailFromForm,
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
    return this.http.post(`${this.uri}/users/registeragency`,data);
  }

  changepass1(newpass, email){
    let data = {
      newpass:newpass,
      email:email
    }

    return this.http.post(`${this.uri}/users/changepass1`, data)
  }

  getobjects(email){
    return this.http.get(`${this.uri}/users/getobjects?param=${email}`)
  }

  addobject(emailFF, tipFF, adresaFF, cntFF, surfaceFF, urlFF, brFF){
    let data = {
      email:emailFF,
      tip:tipFF,
      adresa:adresaFF,
      roomcnt:cntFF,
      surface:surfaceFF,
      url:urlFF,
      idO:brFF
    }
    return this.http.post(`${this.uri}/users/addobject`, data);
  }

  izmeni(emailFF,idOFF,tipFF,adresaFF, cntFF, surfaceFF, urlFF){
    let data={
      email:emailFF,
      idO:idOFF,
      tip:tipFF,
      adresa:adresaFF,
      roomcnt:cntFF,
      surface:surfaceFF,
      url:urlFF
    }
    return this.http.post(`${this.uri}/users/izmeni`, data);
  }

  deleteobj(idOFF, loggedUserFF:User){
    let data = {
      idO:idOFF,
      loggedUser:loggedUserFF
    }
    return this.http.post(`${this.uri}/users/deleteobj`, data);
  }

  getUser(emailFF){
    return this.http.get(`${this.uri}/users/getUser?param=${emailFF}`);
  }
  
}
