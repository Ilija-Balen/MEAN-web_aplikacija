import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PosaoService {

  constructor(private http:HttpClient) { }

  uri = "http://localhost:4000";

  getAllForUser(email){
    return this.http.get(`${this.uri}/posao/getAllForUser?param=${email}`);  
  }

  getAllForAgency(email){
    return this.http.get(`${this.uri}/posao/getAllForAgency?param=${email}`);  
  }

  getAllForAgencyActive(email){
    return this.http.get(`${this.uri}/posao/getAllForAgencyActive?param=${email}`);  
  }

  trazi_saradnju(idOFF, emailFF, emailagFF, vremeFF){
    let data = {
      idO:idOFF,
      email:emailFF,
      emailAgency:emailagFF,
      vreme:vremeFF
    }
    return this.http.post(`${this.uri}/posao/trazi_saradnju`, data);
  }

  zavrsiposao(idOFF, emailFF){
    let data = {
      idO:idOFF,
      email:emailFF
    }
    return this.http.post(`${this.uri}/posao/zavrsiposao`, data);
  }

  prihvati(posao){
    let data = {
      idO:posao.idO,
      email:posao.email
    }
    return this.http.post(`${this.uri}/posao/prihvati`, data);
  }

  odbij(posao){
    let data = {
      idO:posao.idO,
      email:posao.email
    }
    return this.http.post(`${this.uri}/posao/odbij`, data);
  }

  setPonuda(idOFF, emailFF, ponudaFF){
    let data = {
      idO:idOFF,
      email:emailFF,
      ponuda:ponudaFF
    }

    return this.http.post(`${this.uri}/posao/setPonuda`, data);
  }

  obrisiPosao(posao){
    let data = {
      idO:posao.idO,
      email:posao.email
    }
    return this.http.post(`${this.uri}/posao/obrisiPosao`, data);
  }
}
