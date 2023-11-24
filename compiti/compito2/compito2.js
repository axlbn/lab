const prompt = require('prompt-sync')();
let libreria = [
    { tipo: 'romanzo', titolo: 'Il Nome della Rosa', autore: 'Umberto Eco', anno: 1980 },
    { tipo: 'romanzo', titolo: 'Il Sentiero dei Nidi di Ragno', autore: 'Italo Calvino', anno: 1947 },
    { tipo: 'saggio', titolo: 'Trattato di semiotica generale', autore: 'Umberto Eco', anno: 1975 },
    { tipo: 'grapich novel', titolo: 'Persepolis', autore: 'Marjane Satrapi', anno: 2000 }]

function seleziona(A) {
    let res = [];
    for (let i = 0; i < A.length; i++) {
        let tmp = {};
        if (A[i].tipo === 'romanzo') {
            tmp.titolo = A[i].titolo;
            tmp.autore = A[i].autore;
            tmp.anno = A[i].anno;
            res.push(tmp);
        }
    }
    return res;
}
function manipola(arr, f, a, n) {
    let result = arr.slice(); 

    for (let i = 0; i < n; i++) {
        result = result.map(a).filter(f);
    }

    return result;
}

let foo = (x) => x * 2
let dominio = { 1: true, 2: true, 3: true };
let codominio = { 2: true, 4: true, 6: true, 8: true };

function analisi(foo, d, c) {
    let result = { suriettiva: true, iniettiva: true, invertibile: false };
    let imm = {0:true,1:true,2:true,4:true,5:true};
    for (let i in d)
        imm[foo(i)]=true;
    // for(let i=0;i<imm.length;i++){
    //     console.log(imm);
    //     if(!(imm[i] in c)) result.suriettiva=false;
    // }
    console.log(imm);
    for (let i in c) {
            if (!(i in imm)) result.suriettiva = false;
    }

    for (let i in d) {
        let cont = 0;
        for (let j in c) {
            if (foo(i) === j) {
                cont++;
            }
        }
        if (cont >= 2) { result.iniettiva = true; break }
    }

    if (result.suriettiva === true && result.iniettiva === true)
        result.invertibile = true;

    return result;

}

console.log(analisi(foo, dominio, codominio));


let obj = { 1: true, 2: true, 3: true }
if (5 in obj) console.log("presente");
//console.log(seleziona(libreria));