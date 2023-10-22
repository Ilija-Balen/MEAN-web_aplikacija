import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { UsersService } from 'src/app/services/users.service';
import { RNGPass } from '../randompasswordgenerator/rndpassgen';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersservice:UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  username:string;
  password:string;
  message:string="";
  passwordchecker = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,12}$");

  login(){
    if(this.username==null || this.password==null){
      this.message="Niste uneli podatke za username ili password";
      return;
    }

    this.usersservice.login(this.username, this.password).subscribe((userFromForm: User)=>{
      if(userFromForm){
        if(userFromForm.approved==1){
          if(userFromForm.type== 0){//klijent
            sessionStorage.setItem('loggeduser',JSON.stringify (userFromForm));
            this.router.navigate(['user'])
          }else {//agencija
            sessionStorage.setItem('loggeduser',JSON.stringify (userFromForm));
            this.router.navigate(['agency'])
          }
        }
        else {
          this.message="Korisnik ne postoji u bazi";
          
        }
    }else{
      this.message="Korisnik ne postoji u bazi";
    }
    })
  }


  promena:boolean;
  promena2:boolean;
  email:string;
  email2:string;
  temppass:string;
  tmp:string;
  newpass:string;

  change_password(){//samo zbog vidljivosti ostatka forme
    this.promena=true;
  }

  promeni(){//sad ima 10 min za promenu sifre
    if(this.email==this.email2 || this.email==null){
      this.temppass= new RNGPass().generate();
      this.usersservice.sendMail(this.temppass, this.email).subscribe(msg=>{
        alert(msg['message']);
      });
      this.promena2=true;
    }else {
      this.message="Uneseni mejlovi nisu isti";
    }
  }

  promeni_sifru(){
      if(this.newpass==null){
        this.message="Niste uneli novu lozinku";
        return;
      }
      if(!this.passwordchecker.test(this.newpass)){
        this.message="Unesena lozinka je preslaba/premalo/previse karaktera";
        return;
      }
      if(this.tmp == this.temppass){
      this.usersservice.changepass(this.newpass, this.email).subscribe(msg=>{
        alert(msg['message']);

        this.usersservice.deletefromtmp(this.email).subscribe( msg=>{
          this.ngOnInit();
          this.email=null;
        });
        this.promena=false;
        this.promena2=false;
        this.temppass=null;
      })
    
    }else{
      this.message="Sifra nije ista kao ona koju je sistem poslao";
    }
  }
  


}
