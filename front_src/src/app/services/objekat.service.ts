import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjekatService {

  constructor(private http:HttpClient) { }

  uri = "http://localhost:4000";

  getObjekatidO(idOFF, emailFF){
    let data = {
      idO:idOFF,
      email:emailFF
    }

    return this.http.post(`${this.uri}/objekat/getObjekatidO`,data);
  }

  addRadnik(emailFF, idPFF, izabraniObjekat){
    let data = {
      email:emailFF,
      idP:idPFF,
      objekat:izabraniObjekat
    }

    return this.http.post(`${this.uri}/objekat/addRadnik`,data);
  }
  
  getAllRadnici(emailFF){
    return this.http.get(`${this.uri}/objekat/getAllRadnici?param=${emailFF}`);
  }

  promeni_status(ps_idO, ps_email, ps_idP, ps_status){
    let data = {
      idO:ps_idO,
      email:ps_email,
      idP:ps_idP,
      status:ps_status
    }
    return this.http.post(`${this.uri}/objekat/promeni_status`,data);
  }

  dodajputemJSON(jsonobj){
    let data= {
      JSONobj:jsonobj
    }

    return this.http.post(`${this.uri}/objekat/dodajputemJSON`,data);
  }
}
