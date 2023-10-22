import { Component, OnInit } from '@angular/core';
import { RNGPass } from '../randompasswordgenerator/rndpassgen';
import { UsersService } from '../services/users.service';
import { User } from 'src/model/user';
import { Temp } from 'src/model/temp';
import { Router } from '@angular/router';
import { Objekat } from 'src/model/objekat';
import { ObjekatService } from '../services/objekat.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userservice: UsersService, private router:Router, private objekatservice:ObjekatService) { }

  ngOnInit(): void {
    this.loggeduser = JSON.parse(sessionStorage.getItem('loggeduser'));
    //sessionStorage.removeItem('loggeduser');
    this.showform=false;
    this.showprofil=false;
    this.showobjects=false;
  }

  
 
  loggeduser:User;
  showform:boolean;
  oldpass:string;
  newpass:string;
  newpass1:string;

  msgnewpass:string;
  msgoldpass:string;
  msgpass:string;

  showprofil:boolean;
  showobjects:boolean;
  showaddobjects:boolean;

  objekti:Objekat[]=[];

  passwordchecker = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,12}$");

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  show_form(){
    this.showform=true;
  }
  
  show_objects(){
    this.showobjects=true;
    this.userservice.getobjects(this.loggeduser.email).subscribe((svi:Objekat[])=>{
      this.objekti = svi;
    })
  }
  show_addobject(){
    this.showaddobjects=true;
  }

  change(){
      if(this.newpass==this.newpass1 || this.newpass==null){
        if(this.passwordchecker.test(this.newpass)){
          this.userservice.changepass1(this.newpass, this.loggeduser.email).subscribe(msg=>{
            alert(msg["message"]);
            sessionStorage.clear();
            this.router.navigate(['']); 
          })
        }else {
          this.msgnewpass="Nova lozinka nije odgovarajuca";
        }   
    }else this.msgnewpass= "Unesene lozinke nisu iste"
  }

  msgobj:string;
  tipdodavanja:number;
  adresadodavanja:string;
  cntdodavanja:number;
  surfacedodavanja:number;
  urldodavanja:string;
  addobject(){
    if(this.tipdodavanja==null || this.adresadodavanja==null || this.cntdodavanja==null || this.surfacedodavanja==null){
      this.msgobj = "Nisu popunjeni svi podaci";
      return;
    }
    if(this.cntdodavanja<1 || this.cntdodavanja>3){
      this.msgobj="Ne moze da se doda objekat koji ima vise od 3 ili manje od 1 sobe";
      return;
    }
    if(this.urldodavanja==null){
      this.msgobj="Niste izabrali skicu objekta"
      return;
    }
    let br=0;
    if(this.loggeduser.brojobjekata != null){
      br=this.loggeduser.brojobjekata + 1;
      this.loggeduser.brojobjekata++;
    }else {
      br=1;
    }
    this.userservice.addobject(this.loggeduser.email, this.tipdodavanja, this.adresadodavanja, this.cntdodavanja, this.surfacedodavanja, this.urldodavanja, br).subscribe((msg:string)=>{
      this.msgobj= msg["message"];
      this.show_objects();
      this.tipdodavanja=null;
      this.adresadodavanja=null;
      this.cntdodavanja=null;
      this.surfacedodavanja=null;
    })
  }

  setStan(slika){
    this.urldodavanja = slika;
  }

  showizmeniobj:boolean;
  objekatzamenjanje:Objekat;
  tipzamenjanje:string;
  adresazamenjanje:string;
  cntmenjanje:number;
  surfacemenjanje:number;
  urlmenjanje:string;
  show_izmeniobj(obj){
    this.showizmeniobj=true;
    this.objekatzamenjanje = obj;
  }
  setStanmenjanje(slika){
    this.urlmenjanje=slika;
  }
  izmeni(){
    if(this.cntmenjanje>3 || this.cntmenjanje<0){
      this.msgobj="Ne moze element da sadrzi vise od 3, a manje od 1 sobe";
      return;
    }
    this.userservice.izmeni(this.loggeduser.email,this.objekatzamenjanje.idO, this.tipzamenjanje, this.adresazamenjanje, this.cntmenjanje, this.surfacemenjanje,this.urlmenjanje).subscribe((msg:string)=>{
      this.msgobj=msg["message"];
      
      this.objekatzamenjanje=null;
      this.tipzamenjanje=null;
      this.adresazamenjanje=null;
      this.cntmenjanje=null,
      this.surfacemenjanje=null;
      this.urlmenjanje=null;
    })
  
  }

  show_prva(){
    this.router.navigate(['prva-klijent']);
  }
  show_druga(){
    this.router.navigate(['druga-klijent']);
  }
  show_treca(){
    
    //sessionStorage.setItem('loggeduser',JSON.stringify (this.loggeduser));
    this.router.navigate(['treca-klijent']);
  }

  show_cetvrta(){
    //sessionStorage.setItem('loggeduser',JSON.stringify (this.loggeduser));
    this.router.navigate(['cetvrta-klijent']);
  }

  addobjectJSON(){
    //console.log(JSON.stringify(this.JSONfajl));
    this.objekatservice.dodajputemJSON(this.JSONfajl).subscribe(msg=>{
      this.msgobj=msg["message"];
    });
  }

  JSONfajl:any=0;
  selectFile(event: any) { 
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/json\/*/) == null) {
			this.msgobj = "Samo JSON fajlovi su podržani";
			return;
		}
		var reader = new FileReader();
  
    reader.readAsText(event.target.files[0]);
  
    reader.onload = (_event) =>{
      let rezultat = _event.target.result as string;
      console.log(rezultat);
      let st = JSON.stringify(rezultat); 
      console.log(st); 
      this.JSONfajl= JSON.parse(st);
      console.log(this.JSONfajl);
    }
  }

  jednosobni = "data:image/png;base64,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";
  dvosobni= "data:image/png;base64,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";
  trosobni="data:image/png;base64,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";
 
}

