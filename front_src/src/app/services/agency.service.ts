import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http:HttpClient) { }

  uri = "http://localhost:4000"
  
  getallAgencies(){
    return this.http.get(`${this.uri}/agency/getallAgencies`);
  }

  searchByAgname(agnameFF){
    let data={
      agname:agnameFF
    }
    
    return this.http.post(`${this.uri}/agency/searchByAgname`, data);    
  }

  searchByAddress(stateFF, cityFF, streetFF, snumFF:number){
    let data= {
      state:stateFF,
      city:cityFF,
      street:streetFF,
      snum:snumFF
    }

    return this.http.post(`${this.uri}/agency/searchByAddress`, data);
  }

  searchByboth(agnameFF,stateFF, cityFF, streetFF, snumFF:number){
    let data= {
      agname:agnameFF,
      state:stateFF,
      city:cityFF,
      street:streetFF,
      snum:snumFF
    }

    return this.http.post(`${this.uri}/agency/searchByboth`, data);
  }

  getallRecensionsDepersonalized(emailFF){
    
   // let data = JSON.stringify(d);
    return this.http.get(`${this.uri}/agency/getallRecensionsDepersonalized?param=${emailFF}`)
  }

  jelocenjen(emailFF, emailAgencyFF){
    let data={
      email:emailFF,
      emailAgency:emailAgencyFF
    }
    return this.http.post(`${this.uri}/agency/jelocenjen`, data);
  }

  izmenikomentar(emailFF, emailAgencyFF, komentarFF, ocenaFF){
    let data={
      email:emailFF,
      emailAgency:emailAgencyFF,
      komentar:komentarFF,
      ocena:ocenaFF
    }

    return this.http.post(`${this.uri}/agency/izmenikomentar`, data);
  }

  obrisikomentar(emailFF, emailAgencyFF){
    let data = {
      email:emailFF,
      emailAgency:emailAgencyFF
    }

    return this.http.post(`${this.uri}/agency/obrisikomentar`,data);
  }

  dodajkomentar(emailFF, emailAgencyFF, komentarFF, ocenaFF){
    let data = {
      email:emailFF,
      emailAgency:emailAgencyFF,
      komentar:komentarFF,
      ocena:ocenaFF
    }

    return this.http.post(`${this.uri}/agency/dodajkomentar`, data);
  }
}
