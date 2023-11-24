const prompt = require('prompt-sync')();

function scambia(s){
    let new_string=s[s.length-1];
    for(let i=0;i<s.length-1;i++){
        new_string=new_string+s[i];
    }
    return new_string;
}
function stramba(a,quando,tot){
    let tmp;
    let a2=[];
    let isValid=true;
    for(let i=0;i<a.length;i++){
        tmp=a[i];
        for(let j=0;j<tot;j++){
            tmp=scambia(tmp);

            if(!quando(tmp)) {isValid=false;}
            console.log(isValid+"   "+tmp)
        }
        if(isValid==true) a2.push(tmp); else isValid=true;
    }
    return a2;
}

// console.log(stramba(["ocia","mamma","ci"],(x)=>(x[0]!="o"),3))


function confronta(A,B){
    let res = {sottoinsieme:true,superinsieme:true,uguali:false};
    for(let i in A){
        if(!(i in B))
             res.sottoinsieme=false;
    }
    for(let i in B){
        if(!(i in A))
             res.superinsieme=false;
    }
    if(res.superinsieme==true && res.sottoinsieme==true) res.uguali=true ;
    return res;
}

// console.log(confronta({pippo:1,pluto:1,topolino:1},{pippo:1,pluto:1,cacca:1}))


function triangoliRettangoli(triangoli) {
    let triangoli_rettangoli = [];
    for (let i = 0; i < triangoli.length; i++) {
        let tmp = {};
        if (triangoli[i].rettangolo == true) {
            tmp.cateti = [triangoli[i].base, triangoli[i].altezza];
            tmp.ipotenusa = Math.sqrt(Math.pow(triangoli[i].base, 2) + Math.pow(triangoli[i].altezza, 2));
            triangoli_rettangoli.push(tmp);
        }
    }
    return triangoli_rettangoli;
}


// console.log(triangoliRettangoli([{ altezza: 12, base: 12, rettangolo: false }, { altezza: 10, base: 10, rettangolo: true }, { altezza: 12, base: 12, rettangolo: true }]))







function scambia(s){
    let new_string=s[s.length-1];
    for(let i=0;i<s.length-1;i++){
        new_string=new_string+s[i];
    }
    return new_string;
}
function stramba(a,quando,tot){
    let a2=a;

    for(let i=0;i<tot;i++){
        // a2=a2.map(scambia);
        // a2=a2.filter(quando)
        a2=a2.map(scambia).filter(quando);
    }
    return a2;
}

// console.log(stramba(["ciao","mamma","ci"],(x)=>(x[0]!="o"),3))
function build(t){
    let cateti=[t.base,t.altezza];
    let ipotenusa=Math.sqrt(Math.pow(t.base,2)+Math.pow(t.altezza,2));
    return{cateti:cateti,ipotenusa:ipotenusa}
}
function triangoliRettangoli(triangoli){
    let triangoli_rettangoli = [];
    let tmp = [];
    tmp= triangoli.filter((t)=>t.rettangolo==true)
    triangoli_rettangoli= tmp.map(build)
    return triangoli_rettangoli;
}


// console.log(triangoliRettangoli([{altezza:12,base:12,rettangolo:false},{altezza:10,base:10,rettangolo:true},{altezza:12,base:12,rettangolo:true}]))

function contains(A, val) {
    for (let i in A)
        if (i == val) return true;

    return false;
}
function insert(A, val) {
    A[val] = val;
    return A;
}


function Delete(A, val) {
    delete A[val];
    return A;
}

function equal(A, B) {
    for (let i in A)
        if (!(i in B)) return false;

    return "equal"
}

function intersection(A, B) {
    let C = {};
    for (let i in A)
        if (i in B) C[i] = i;

    return C;
}


function subtract(A, B) {
    let C = {};
    for (let i in A)
        if (!(i in B)) C[i] = i;

    return C;
}

function union(A, B) {
    let C = {};
    for (let i in A)
        C[i] = i;
    for (let i in B)
        C[i] = i;

    return C;
}

function cardinality(A) {
    let cont = 0;
    for (let i in A)
        cont++;
    return cont;
}
//| A ∩ B | / | A U B |

function jaccard(A, B) {
    let C = {};
    let D = {};
    C = intersection(A, B);
    D = union(A, B);
    return cardinality(C) / cardinality(D);

}

//console.log(jaccard({casa:1,ufficio:1,mare:1},{casa:1,suca:1}))


function fromTobase(num, b1, b2) {
    num = parseInt(num, b1);
    return num.toString(b2)
}

function complemento2(num) {
    num = ~num;
    return (num + 1).toString(2)
}
function invertBit(num1, num2) {
    return (num1 & ~num2).toString(2);
}
function count1Bit(num) {
    let cont = 0;
    let bin = num.toString(2);
    for (let i = 0; i < bin.length; i++) {
        if (bin[i] == 1) cont++;
    }
    return cont;
}
function scambiaBit(a, b) {
    a = a ^ b;
    b = a ^ b;
    a = b ^ a;
    return [a, b];
}
//console.log(scambiaBit(5,10));


