
function _print_ktree(ktree, ind) {
    console.log(ind + "|-", ktree.val)
    if(ktree.figli!=undefined)
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
// a.push(z) – aggiunge z in coda all’array a
// c=a.concat(b) – concatena l’array b in coda all’array a, restituisce il risultato
// z=a.pop() – rimuove l’ultimo elemento da a, restituisce l’elemento rimosso
// x=a.shift() – rimuove il primo elemento di a, restituisce l’elemento rimosso; tutti gli altri elementi scorrono di un posto per “chiudere il buco”
// a.sort()  – ordina un array in base al valore degli elementi

// A.every(p) Restituisce true se tutti gli elementi di A soddisfano il predicato p, false altrimenti
// A.some(p) Restituisce true se almeno uno degli elementi di A soddisfa il predicato p, false altrimenti
// A.find(p) Restituisce un elemento e di A tale che p(e) è true, o undefined se nessun e soddisfa p
// A.findIndex(p) Restituisce l’indice di un elemento e di A tale che p(e) è true, o -1 se nessun e soddisfa p
// A.includes(e) Restituisce true se A contiene un elemento uguale a e, false altrimenti
// A.forEach(f) Invoca f(e) per ogni elemento e dell’array A
// A.map(f) Restituisce un nuovo array A’ = [ f(e1), f(e2), … f(en) ]
// A.filter(p) Restituisce un nuovo array A’ contenente i soli elementi e di A che soddisfano p, in ordine

//Ogg.splice(i)



let ktree = {
    val: 1,
    figli: [
        {val: 5, figli: [
            {val: 7},
            {val: 11, figli: [
                {val: 4}
            ]}
        ]},
        {val: 4},
        {val: 12, figli: [
            {val: 4, figli: [
                {val: 11, figli: [
                    {val: 3},
                    {val: 5},
                    {val: 19},
                    {val: 5, figli: [
                        {val: 1}
                    ]}
                ]}
            ]}
        ]},
        {val: 1}
    ]
}
  let tree= {
    val:12,
    sx:{
        val:6,
        sx:{
            val:2,
            sx:{
                val:4,
            },
            dx:{
                val:3
            }
        },
        dx:{
            val:7
        }
    },
    dx:{
        val:14,
        dx:{
            val:13
        }
    }
}



// function tagliaRami(T,v){
//     if(T==null) return undefined;
//     if(T.figli && T.figli.length>0){
//         for(let i=0;i<T.figli.length;i++){
//             if(T.figli[i].val%v==0){
//                 T.figli.splice(i,1);
//                 i--;
//             }else{
//                 tagliaRami(T.figli[i],v);
//             }
//         }
//     }
//     return T;
// }
// print_ktree(ktree);
// tagliaRami(ktree,4);
// console.log("---------------")
// print_ktree(tagliaRami(ktree,4));
// console.log("---------------")
// print_ktree({"val":1,"figli":[{"val":5,"figli":[{"val":7},{"val":11,"figli":[]}]},{"val":12,"figli":[]}]})

// var AR=[1,2,20,4,5,6,7,8,9,10,11,12,13,14,15]


// function paripari(A){
    
//     let res=[];
//     for(let i=0;i<A.length;i++){
//         if(A[i]%2==0 && i%2==0){
//             if(res.length<2){
//                 res.push(A[i]);
//             }
//             else{
//                 res.pop();

//                 res.push(A[i]);
//             }
//         }
//     }
//     if(res.length<2){
//         res.push(res[0]);
//     }
//     return res;
// }

// console.log(paripari(AR))
// console.log("------------")
// console.log(AR)

// var TR = {
//     val: "a",
//     sx: {
//         val: "b",
//         sx: {val: "c"},
//         dx: {val: "d"}
//     },
//     dx: {
//         val: "e",
//         sx: {val: "f", sx: {val: "z"}},
//         dx: {val: "g", sx: {val: "x"}, dx: {val: "y", sx: {val: "w"}}}
//     }
// }
// function left(T){
//     let l="";
    
//     if(T.sx){
//         l+=left(T.sx);
//     }
//     if(T.sx==undefined || l!=""){
//         return l+T.val;
//     }
//     return l;
// }
// function right(T){
//     let r="";
    
//     if(T.dx){
//         r+=right(T.dx);
//     }
//     if(T.dx==undefined || r!=""){
//         return r+T.val;
//     }
//     return r;
// }
// function lar(T){
//     let l="";
//     let r="";
//     let res =[l,r];
//     if(T){
//         res[0]=left(T);
//         res[1]=right(T);
//         return res;
//     }else{
//         return [null,null];
//     }
    
// }
// console.log(lar(TR));

const txtPL=`Idę do sklepu. Moja dziewczyna Lila poprosiła mnie o zakupy. Chce zrobić dużą kolację z okazji swoich urodzin. Zaprosiła aż dwanaście osób. Muszę kupić wiele rzeczy. Na szczęście mam listę zakupów. Mam na niej wszystko napisane.
Poprosiła o pięć paczek makaronu i siedem puszek pomidorów. Będzie robiła pyszne spaghetti. Muszę też kupić trzy cebule. Na liście mam też bazylię i czosnek. Na przyjęciu poda też sałatkę ziemniaczaną. Mam kupić pięć kilogramów ziemniaków i jeden słoik majonezu.
Potrzebujemy też przekąsek. Goście bardzo lubią chipsy. Kupiłem aż szesnaście paczek. Wziąłem też pięć paczek paluszków, cztery krakersów i osiem orzeszków.
Na deser podamy sałatkę owocową. Muszę kupić do niej dużo składników. Potrzebujemy: jedenaście bananów, dwadzieścia jabłek, dziesięć pomarańczy, pięć kiwi i cztery brzoskwinie. Wziąłem też pięć opakowań truskawek, razem będzie ich ponad sto!
Brakuje mi jeszcze tylko napoi. Kupię trzydzieści puszek Coca-Coli, czterdzieści piw i cztery wina. Zostało mi jeszcze sto złotych. Wystarczy mi na jedną butelkę szampana. Kupię też tort czekoladowy, który Lila bardzo lubi. Mam nadzieję, że przyjęcie będzie udane.`



function guess6(s){
    let string=[];
    let res = {};
    let tmp=[];
    for (let i of s){
        string.push(i);
    }
    console.log(string)
    for(let i of string){
        tmp=string.filter((e)=>(e==i || e==i.toUpperCase())&& (e=="a" || e=="b"))
        res[tmp[0]]=tmp.length;
    }
    
    
    console.log(res)
}
guess6(txtPL)