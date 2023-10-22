import { Component, OnInit } from '@angular/core';
import { Posao } from 'src/model/posao';
import { User } from 'src/model/user';
import { UsersService } from '../services/users.service';
import { PosaoService } from '../services/posao.service';
import { ObjekatService } from '../services/objekat.service';
import { Objekat } from 'src/model/objekat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cetvrta-klijent',
  templateUrl: './cetvrta-klijent.component.html',
  styleUrls: ['./cetvrta-klijent.component.css']
})
export class CetvrtaKlijentComponent implements OnInit {

  constructor(private posaoservice:PosaoService, private objekatservice:ObjekatService, 
    private usersservice: UsersService, private router:Router) { }

  ngOnInit(): void {
    this.loggeduser = JSON.parse(sessionStorage.getItem('loggeduser'));
    //sessionStorage.removeItem('loggeduser');
    this.posaoservice.getAllForUser(this.loggeduser.email).subscribe((svi:Posao[])=>{
      this.poslovi=svi;
      this.prikazicanvas=this.flagzahtev = this.flagaktivni = this.flagzavrseni=false;
      this.zavrseniposlovi= [];this.aktivniposlovi=[];this.zahtevposlovi=[];
      this.flagsvi=true;
    })
  }

  loggeduser:User;
  poslovi:Posao[]=[];
  zavrseniposlovi:Posao[]=[];
  aktivniposlovi:Posao[]=[];
  zahtevposlovi:Posao[]=[];

  flagsvi:boolean;
  flagaktivni:boolean;
  flagzavrseni:boolean;
  flagzahtev:boolean;
  prikaziplacanje:boolean;

  show_zavrseni(){
    this.prikazicanvas=this.flagsvi = this.flagaktivni = this.flagzahtev=false;
    this.flagzavrseni=true;

    for(let posao of this.poslovi){
      if(posao.status==2 && !this.zavrseniposlovi.includes(posao)){
        this.zavrseniposlovi.push(posao);
      }
    }
  }

  show_aktivni(){
    this.prikazicanvas=this.flagsvi = this.flagzavrseni = this.flagzahtev=false;
    this.flagaktivni=true;

    for(let posao of this.poslovi){
      if(posao.status==1 && !this.aktivniposlovi.includes(posao)){
        this.aktivniposlovi.push(posao);
      }
    }
  }

  show_zahtevi(){
    this.flagsvi = this.flagaktivni = this.flagzavrseni=false;
    this.flagzahtev=true;
    
    for(let posao of this.poslovi){
      if(posao.status==0 && !this.zahtevposlovi.includes(posao)){
        this.zahtevposlovi.push(posao);
      }
    }
  }

  show_svi(){
    this.prikazicanvas=this.flagzahtev = this.flagaktivni = this.flagzavrseni=false;
    this.flagsvi=true;
  }

  showplacanje:boolean;
  pregledavaniPosao:Posao;
  prikazicanvas:boolean;
  pregledaj(posao){
    //uzmem id koji sam dobio za odredjeni posao, nadjem objekat za zadati idO i loggeduser.email
    //zatim uzmem iz objekta tacke i nacrtam ih redom sve u jednoj for petlji i ako je neka
    // 0 ili 1 showplacanje=false u suprotnom je true 
    this.prikazicanvas=true;
    this.pregledavaniPosao=posao;
    this.objekatservice.getObjekatidO(posao.idO, posao.email).subscribe((obj:Objekat)=>{
      //crtanje
      let c= document.getElementById("Canvascetvrta") as HTMLCanvasElement;
      let ctx= c.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0,0, c.width, c.height);
      let flag = true;
      let img = document.getElementById("vrataID") as HTMLVideoElement;
      //crtanje prostorija
      for (const iterator of obj.tacke) {
        if(iterator.status==2){
          //2 oznacava zavrseno
          ctx.rect(iterator.x, iterator.y, iterator.width, iterator.height);
          ctx.fillStyle="#2cd14d";
          ctx.fillRect(iterator.x, iterator.y, iterator.width, iterator.height);
        }else if(iterator.status==1){
          //1 oznacava aktivno
          ctx.rect(iterator.x, iterator.y, iterator.width, iterator.height);
          ctx.fillStyle="#cc2929";
          ctx.fillRect(iterator.x, iterator.y, iterator.width, iterator.height);
          flag=false;
          
        }else{
          ctx.rect(iterator.x, iterator.y, iterator.width, iterator.height);
          ctx.fillStyle="#ffffff";
          ctx.fillRect(iterator.x, iterator.y, iterator.width, iterator.height);
          flag= false;
        }
      }
      //crtanje vrata
      for(const iterator of obj.vrata){
        ctx.drawImage(img, iterator.x, iterator.y);
      }
      ctx.stroke();
      
      if(flag){
        this.prikaziplacanje=true;
      }else{
        this.prikaziplacanje=false;
      }

    })
  }

  plati(){
    this.posaoservice.zavrsiposao(this.pregledavaniPosao.idO,this.pregledavaniPosao.email).subscribe(msg=>{
      this.pregledavaniPosao=null;
      this.ngOnInit();
    })
  }

  oceni(posao){
    sessionStorage.setItem('ckkomentar',JSON.stringify (posao));
    this.router.navigate(['ckkomentar']);
    
  }

  prihvati(posao){
    this.posaoservice.prihvati(posao).subscribe(msg=>{
      this.ngOnInit();   
    })
  }

  odbij(posao){
    this.posaoservice.obrisiPosao(posao).subscribe(msg=>{
      this.ngOnInit();    
    })
  }
  show_prva(){
    this.router.navigate(['prva-klijent']);
  }
  show_druga(){
    this.router.navigate(['druga-klijent']);
  }
  show_treca(){
    this.router.navigate(['treca-klijent']);
  }
 

  vrata = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAaCAYAAAC6nQw6AAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAAEj0lEQVR4XlVVPW9cRRQ98/He292369heY3BMhBJwCto0SLQgkR+B+A+IIhJNJOiQkooKIUKRiA6JIh2BloJUSTDCioBAYscf+/V2933OcO68GDmzGr/1vJlzzz333FmFM8NXJwMgewe6XP/p9refzbPJzmQ6Qw0z/uiTTz+ESnpo4vsq3tg7e06+q5eA3PHOrS9vPPr7zz9sJzFYXTuHKE4QJV0cT+bI5gWs6eL9967+duXdD94+e/Z/oB++uXF39/He1coAr+9cArodHE0mqBqHTqcDVxYYDlZQZ3NMn+8jH49x7fMvfodPP1Y2vav88q/te9/duXf/wYPLyXCI4cU3sZ/NcLTM0RuuYVE20N4hVh5dX6NDwDc21jF++gSP957g+s2vgdpc0ajyrYe7Dy9vbW/j0lsXsVhk8MphsHoOznvEcYx+v4+mIaDW6A36eH50iM3XXsWFC1u4ef0aM5z/an+889UvppnDugnKsUdSNTg/SDGrchAFRUGAEtjsRKiyKXq1RZooVKMDpChwODnAz9/fgj15tqtTlSH79wDmqUdd16gYuakrmMhikKSBSbEsoZ3HtKoxqUpKGMPy3TC2GP3zCNbXLO9yhHK5wPHBMximYKhHn5ValCX6W+cJ6pEdHaMk206SoKoqFFGEdHWIaP0VFmAEq73iQRs2V6XjrLiooRjVGAPVWFil4SpqSuGX1TJUXXtOukcRvGsiWNmkCKKdQqQjICKwbLAWmrOR90rxSdPx6TkJSygXmAczcs0mtYapHBSjgZ7xrFTJ8A0/VnPJyGYfnrWpAwvPT6wVHKurBZyrVuIbnTANyy1GjoAkhDcHwVXDA4yvG7IhBA9T8wAi32U22sHmXqO2TMnEJOvhHBcpQEQGWlXEK6G4x9CMDbvutKvkcABuxYIt6JWcFJacheihbdisRDM+tbOBkYC1NIWVPKhU0ItnuGAXLOcJWczojwVZJayAo5eC+Cxx4zqtyC4muERvNaOqAUwLW0eNptMx9g8PMB+NQDNBRQnYNuRqEDNlqRLPtQwYuS0U//B/KYwwlWk3eF24tQEy5j8d5bRASQxFZpJJAWMpLhnTqfC1CM1qMoiNWlsE8aXCEV3aNxpx2kXcDEDnwDVVKLJmiSuy1DRmzFawsWlVIhPDep8dNmLZ+2kKm3awksbBH76pWTkKSEO2ZotZRUrPgFwODD2Z9fprmLChZdiK/VTw7smpy2xyQkHpI6HPNhGgwWDA7i8x5UXWkImIJHoHtzv2QLLWAnXY4TmzzPMCGe9nzx4jJRq0Ber1Ut6SDbIsQ0lASUuCyD0VJX3O1hZWLixX02osecOpJH9ujKiLPCWylF3Skb1i64aFkH0vaSQdLpFlyr3jmZpEDZV6MQRM84Yw4ma2ipJ9YguZUhbaQgdGwSitXU5H2MgDAijvA/iLQsl30UvOnp6xOTWxzFeWNP0hYkrXC47ckFKpkhaJOgn9KpeeMKe4PKNYcclkSv3syXiElD893bRHXTZJX6QTx/K+Ef/wpyhiG2m6PC37YU0GPYu4v4LZfI7x4Rj/ARX+RYaYVshhAAAAAElFTkSuQmCC";
 
}
