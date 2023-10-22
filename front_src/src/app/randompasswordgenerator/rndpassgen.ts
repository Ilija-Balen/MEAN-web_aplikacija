

export class RNGPass {
    constructor() {}
    lowercase ="abcdefghijklmnopqrstuvwxyz";
    uppercase="ABCDEFGHIJKLMNOPWRSTUVWXYZ";
    prvoslovo="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPWRSTUVWXYZ"
    numbers="0123456789";
    symbols="!@#$%^&*-_=+\\|:;',.\<>/?~";

    brojSlova:number;
    brojVelikihSlova:number;
    brojBrojeva:number = 1;
    brojSimbola:number = 1;

    password: string="";
    generate(){
        this.brojVelikihSlova= this.getRandomInt(0,4);
        this.brojSlova= this.getRandomInt(7,12);

        let br= this.getRandomInt(0,51);
        this.password+= this.prvoslovo.substring(br,br+1);
        this.brojSlova--;
        while(this.brojSlova>0){
            this.password+=this.simb_br_sl();
            this.brojSlova--;
        }

        return this.password;
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    simb_br_sl(){
        if(this.brojBrojeva>0 && this.brojSimbola> 0 && this.brojVelikihSlova>0){
            let br = this.getRandomInt(1,3);
            if(br==1) {
                this.brojBrojeva=0;
                return this.randBroj();
            }
            else if(br==2){
                this.brojSimbola=0;
                return this.randSimbol();
            }else{
                this.brojVelikihSlova--;
                return this.randVelikoSlovo();
            }

        }else if(this.brojBrojeva>0 && this.brojSimbola> 0){
            let br = this.getRandomInt(1,2);
            if(br==1){
                this.brojBrojeva=0;
                return this.randBroj();
            }else{
                this.brojSimbola=0;
                return this.randSimbol();
            }

        } else if(this.brojBrojeva>0 && this.brojVelikihSlova>0){
            let br = this.getRandomInt(1,2);
            if(br==1){
                this.brojBrojeva=0;
                return this.randBroj();
            }else{
                this.brojVelikihSlova--;
                return this.randVelikoSlovo();
            }

        } else if(this.brojBrojeva>0){
            this.brojBrojeva=0;
                return this.randBroj();

        }else if(this.brojSimbola> 0 && this.brojVelikihSlova>0){
            let br = this.getRandomInt(1,2);
            if(br==1){
                this.brojSimbola=0;
                return this.randSimbol();
            }else{
                this.brojVelikihSlova--;
                return this.randVelikoSlovo();
            }

        }else if(this.brojSimbola> 0){
            this.brojSimbola=0;
            return this.randSimbol();

        }else if(this.brojVelikihSlova>0){
            this.brojVelikihSlova--;
            return this.randVelikoSlovo();

        }else{
            return this.randSlovo();
        }
    }

    randBroj(){
        let pozicija = this.getRandomInt(0,9);

        return this.numbers.substring(pozicija, pozicija+1);
    }
    randVelikoSlovo(){
        let pozicija = this.getRandomInt(0,25);

        return this.uppercase.substring(pozicija, pozicija+1);
    }
    randSlovo(){
        let pozicija = this.getRandomInt(0,25);

        return this.lowercase.substring(pozicija, pozicija+1);
    }
    randSimbol(){
        let pozicija = this.getRandomInt(0,25);

        return this.symbols.substring(pozicija, pozicija+1);
    }
}