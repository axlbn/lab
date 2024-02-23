class Spettacolo{
    constructor(k){
        this.spettatori=[];
        this.k=k;
    }
    acquista(spettatore){
        if(this.spettatori.length<this.k){
            this.spettatori.push(spettatore);
        }else{
           this.spettatori.shift();
           this.spettatori.push(spettatore)
            console.log(this.spettatori);
        }
    }
}

function buffcirc(k){
    let s=new Spettacolo(k);
    let acquista=(nome)=>{
        s.acquista(nome);
    }
    let ammessi = () =>{
        return s.spettatori;
    }
    return [acquista,ammessi];
}

let [acquista,ammessi] = buffcirc(4)
acquista("pippo")

acquista("andrea")

acquista("alex")
console.log(ammessi())


acquista("pupo")

acquista("kevin")

acquista("giammi")



ammessi()