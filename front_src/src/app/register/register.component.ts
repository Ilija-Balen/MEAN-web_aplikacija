import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userservice:UsersService) { }

  ngOnInit(): void {
  }

  condition:boolean;
  username:string;
  password:string;
  password2:string;
  telephone:number;
  email:string;
  firstname:string;
  lastname:string;
  agname:string;
  state:string;
  city:string;
  street:string;
  snumber:number;
  PIB:number;
  desc:string;
  msg:string;

  passwordchecker = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,12}$");
  message:string;

  uslov(cond){
    this.condition=cond;
  }

  register(){
    //proveriti LOZINKU i ostale parametre
    if(!this.passwordchecker.test(this.password)){
      this.message="Unesena lozinka je preslaba/premalo/previse karaktera";
      return;
    }
    if(this.condition){ //Klijent
      if(this.username==null || this.password==null || this.telephone==null || this.email==null||
        this.firstname==null || this.lastname==null || this.password!=this.password2){
          this.message="Neki podatak nije unesen";
          return;
        }
      this.userservice.registeruser(this.username, this.password, this.telephone, this.email,this.firstname,
        this.lastname, this.url).subscribe(msg=>{
          this.message= msg['message'];
          this.url= this.pocetniurl;
          this.username=this.password= this.telephone= this.email=null;
          this.firstname=this.lastname=this.condition=null;
      })
    }else{//agencija
      if(this.username==null || this.password==null || this.telephone==null || this.email==null||
        this.agname==null || this.state==null || this.city==null || this.street==null || this.PIB==null
        || this.desc==null || this.password!=this.password2){
          this.message="Neki podatak nije unesen";
          return;
        }
      this.userservice.registeragency(this.username, this.password, this.telephone, this.email,
        this.agname, this.state, this.city, this.street, this.snumber, this.PIB, this.desc, this.url).subscribe(msg=>{
          this.message= msg['message'];
          this.url= this.pocetniurl;
          this.username=this.password=this.telephone=this.email=null;
          this.agname=this.state= this.city= this.street=this.PIB=null;
          this.snumber=this.desc=this.condition=this.password2=null;
      })
    }
  }

  selectFile(event: any) { 
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.message = "Samo slike su podržane";
			return;
		}
    
   /* if(event.target.files[0].width>300 || event.target.files[0].height >300){
      this.message = "SLIKE VECE OD DOZVOLJENOG";
			return;
    } naturalWidth, naturalHeight*/

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
    
		reader.onload = (_event) => {
			this.message = "";
      this.url = _event.target.result;
    }
  }

  url:any ="data:image/png;base64,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"
  pocetniurl = "data:image/png;base64,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"
 
}
