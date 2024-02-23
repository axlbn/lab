
function _print_ktree(ktree, ind) {
    console.log(ind + "|-", ktree.val)
    for (let f of ktree.figli)
      _print_ktree(f, ind + "   ")
  }
  
  function print_ktree(ktree) {
    _print_ktree(ktree, "")
  }
  function visita_albero(t){ 
    if (!t.figli) return [t.val]
    let arT = [t.val]
    for (let s of t.figli) 
      arT= arT.concat(visita_albero(s))
    return arT
  }
/*Si scriva una funzione taglia_rami(t)
 che prende in input un albero k-ario t
. L'albero ha la rappresentazione vista a lezione, che utilizza:

un array per i figli di ogni nodo (chiave t.figli
);
etichette di nodo numeriche (chiave t.val
).


La funzione modifica l'albero eliminando tutti i sottoalberi in cui la somma 
delle etichette dei nodi è negativa: i nodi tagliati non devono contribuire 
alla somma del sottoalbero padre. Ad esempio se un nodo t
 ha due sottoalberi figli entrambi con somma delle etichette negativa,
  allora la somma del sottoalbero  radicato in t
 conterrà solo t.val.
. La funzione deve modificare l'albero originale (NON una sua copia).



Si può assumere che la radice dell'albero non venga mai cancellata*/

let taglia_rami_tree = {
    val: 5,
    figli: [
      { val: 10, figli: [] },
      {
        val: 15, figli: [
          { val: 34, figli: [] },
          { val: 2, figli: [] },
          { val: 33, figli: [] },
        ]
      },
      {
        val: 45, figli: [
          { val: -10, figli: [] },
          { val: 2, figli: [] },
        ]
      },
      { val: 8, figli: [] },
      { val: 12, figli: [] },
      { val: 5, figli: [] }
    ]
  }
  let taglia_rami_tree2={val:12, 
    figli:[
        {val:-1},
        {val:10, figli:
            [
                {val:-3},
                {val:-6}
            ]
        },
        {val:2,
             figli:[
                {val:-3},
                {val:1}
            ]
        }
        ,{
            val:0,
             figli:[
                {val:3,
                     figli:[
                        {val:-1}
                    ]
                }
                ,{val:-3}
            ]
        }
    ]
}; 



function taglia_rami(t) {
    let somma = 0;
    if (t == null) return undefined;
    if (t.figli && t.figli.length > 0) {
        for (let i = 0; i < t.figli.length; i++) {
            somma += taglia_rami(t.figli[i]);
            if (somma < 0) {
                t.figli.length = 0;
                somma = 0;
                break; // Exit the loop because all children have been removed
            }
        }
    }
    return somma + (t.val || 0);
}
// console.log(visita_albero(taglia_rami_tree2));
// taglia_rami(taglia_rami_tree2);
// console.log()

// console.log(visita_albero(taglia_rami_tree2));


//########################################################################
/*Si scriva una funzione piaga(T) che, ricevuto un albero k-ario T come visto a lezione,
 lo modifichi eliminando tutti i "primogeniti", ovvero il primo dei figli di ciascun nodo
  (ed eventualmente il relativo sottoalbero). La funzione deve restituire il numero totale di nodi eliminati.

Per esempio, chiamando piaga(T) sull'albero sotto a sinistra,
 si vuole ottenere che T sia modificato come l'albero sotto a destra, e il valore di ritorno sia 5. 
 Nella prima figura, i nodi "primogeniti" sono colorati in arancione, ma si noti che vengono eliminati 
 anche altri nodi (i discendenti di primogeniti).*/

 var T={
    val: 1,
    figli: [
        {val: 2, figli: [{val: 3}, {val: 4}]},
        {val: 5},
        {val: 6, figli: [ {val: 7}]},
        {val: 8},
        {val: 9, figli: [{val: 10}, {val: 11}]}
    ]
}

//  function piaga(T){
//     let res=0;
//     if(T==undefined) return undefined;
//     if(T.figli && T.figli.length>0){
//         for(let i=0;i<T.figli.length;i++){
//             if(i==0){
//                 T.figli.splice(i,1);
//                 res+=1;
//             }else{
//                 res+=piaga(T);
//             }
//         }
        
//     }return res;
//  }


function piaga(T){
    let res=0;
    if(T==undefined) return undefined;
    if(T.figli && T.figli.length>0){
        for(let i=0;i<T.figli.length;i++){
            res+=piaga(T.figli[0]);
            if(i==0){
                
                T.figli.splice(i,1);
                res+=1;
            }
        }
        
    }return res;
 }
 //print_ktree(T);
 piaga(T);
 //print_ktree(T);