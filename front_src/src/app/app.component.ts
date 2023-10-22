import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PIA Rocks';
  constructor(private router: Router, private userservice:UsersService) {}
  logOut(){
    sessionStorage.clear();
    this.showform=false;
    this.router.navigate(['']);
  }
  loggeduser:User;
  ulogovan(){
    this.loggeduser = JSON.parse(sessionStorage.getItem('loggeduser'));
    return (sessionStorage.getItem('loggeduser') != null);
  }
  passwordchecker = new RegExp("^[A-Za-z](?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{7,12}$");
  newpass:string;
  newpass1:string;
  msgnewpass:string;
  oldpass:string;
  change(){
    if(this.oldpass==this.loggeduser.password){
      if(this.newpass==this.newpass1 || this.newpass==null){
        if(this.passwordchecker.test(this.newpass)){
          this.userservice.changepass1(this.newpass, this.loggeduser.email).subscribe(msg=>{
            alert(msg["message"]);
            sessionStorage.clear();
            this.showform=false;
            this.router.navigate(['']); 
          })
        }else {
          this.msgnewpass="Nova lozinka nije odgovarajuca";
        }   
     }else this.msgnewpass= "Unesene lozinke nisu iste"
    }else{
      this.msgnewpass="Niste uneli staru sifru dobro";
    }
  }
  showform:boolean;
  show_form(){
    this.showform=true;
  }
  
}
