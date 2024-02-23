/*Si scriva una funzione sxltdx(T) che, dato un albero binario T 
come definito a lezione, in cui i nodi hanno valore numerico, 
modifichi l'albero scambiando fra loro i figli sx e dx di ogni nodo se sono entrambi presenti
, in modo che il valore del figlio destro sia sempre maggiore o uguale al valore del figlio sinistro.

Nota: il codice iniziale include una funzione genTBin() (potete invocarla senza parametri) 
che potete chiamare per generare degli alberi di prova.*/



function sxltdx(T) {
    if(T=={})return undefined;
    if(T.sx!=undefined && T.dx!=undefined){
        if(T.sx.val>T.dx.val){
            let tmp=T.dx;
            T.dx=T.sx;
            T.sx=tmp;
        }
    }
    if(T.sx!=undefined) sxltdx(T.sx);
    if(T.dx!=undefined) sxltdx(T.dx);
    return T;
}



//#############################################################################

/*Si scriva una funzione pota3(t) che, dato un albero binario t costruito come visto a
lezione con nodi {val:v, sx:ts, dx:td}, modifichi t rimuovendo tutte le foglie, 
sommando i valori delle foglie rimosse a quello del loro nodo padre. La funzione non deve restituire nulla.*/

let pota3Tree = {
    val:13,
    sx:{
        val:12,
        sx:{
            val:9,
        },
        dx:{
            val:8,
        }
    },
    dx:{
        val:11,
        sx:{
            val:3,
        },
        dx:{
            val:2
        }
    }
}


function pota3(t){
    let isFiglioFoglia=0;//isFogliaFiglio is counter ,when is > 1 whe have not anymore in the initial foglia.
    if(t=={}) return;
    if(t.sx!=undefined){
          isFiglioFoglia=pota3(t.sx); 

        if(isFiglioFoglia<=1){
            t.val+=t.sx.val;
            delete t.sx;
        };
    }
    if(t.dx!=undefined){
          isFiglioFoglia=pota3(t.dx);

        if(isFiglioFoglia<=1) {
            t.val+=t.dx.val;
            delete t.dx;
        };
        
    }
    if(t.sx==undefined && t.dx == undefined){
        return isFiglioFoglia+1;
    }else{
        return isFiglioFoglia;
    }
}



//#############################################################################

/*Si scriva una funzione tagliaAlberi(T), che prende come 
parametro un albero binario T (i cui nodi sono implementati come visto a 
lezione come oggetti con chiavi val, sx e dx). La funzione taglia i sottoalberi 'secchi'. 
Un sottoalbero è secco se il valore nella radice del sottoalbero è < 0. Il taglio avviene
eliminando il contenuto del nodo secco (viene eliminato il contenuto, non il nodo: quindi 
resta un { }) - le proprietà val, sx e dx (si veda l'esempio).

La funzione non deve restituire nulla (no return).



Esempio:

t={val:20, sx:{val:19, sx:{val:8}, dx:{val:7, sx:{val:9} } }, dx:{val:-3, sx:{val:-8},dx:{val:7}}}

Dopo la chiamata a tagliaAlberi(t), t contiene {val:20, sx:{val:19, sx:{val:8}, dx:{val:7, sx:{val:9} } }, dx:{}}*/

let tagliaAlberiTree = {val:20, sx:{val:19, sx:{val:8}, dx:{val:7, sx:{val:9} } }, dx:{val:-3, sx:{val:-8},dx:{val:7}}};


function tagliaAlberi(T){
    if(T.val<0){
        for (let prop in T)
            delete T[prop];
        return;
    }
    else{
        if(T.sx!=undefined){
            tagliaAlberi(T.sx);
        }
        if(T.dx!=undefined){
            tagliaAlberi(T.dx);
        }
    }

}

//#############################################################################

/*Si scriva una funzione map_tree(tree, sx_fun, dx_fun) che, 
dato un albero binario e due funzioni sx_fun e dx_fun, 
restituisca un altro albero senza alterare l'originale.
 Nell'albero risultante, il valore di ciascun figlio di sinistra è sostituito con il risultato 
 dell’applicazione di sx_fun; rispettivamente, i figli di destra sono sostituiti 
 dall’applicazione di dx_fun. Se sx_fun o dx_fun sono undefined, 
 il valore del nodo non viene alterato. Si assuma che alla radice si applichi la funzione dx_fun.

Notazione.

Come visto a lezione, un albero binario è codificato come un oggetto JavaScript con proprietà 
val, sx, e dx, dove sx e dx sono rispettivamente il ramo di sinistra e di destra.
 L’albero segnala l’assenza di un figlio con il valore null nella rispettiva proprietà.*/

 let map_tree_T = {val:20, sx:{val:19, sx:{val:8}, dx:{val:7, sx:{val:9} } }, dx:{val:-3, sx:{val:-8},dx:{val:7}}};

//don't work
 function map_tree(tree, sx_fun, dx_fun) {
    if (tree == null) {
        return null;
    }

    let newNode = {};

    newNode.val = tree.val;
    if (tree.sx && sx_fun) {
        newNode.val = sx_fun(tree.val);
    }
    if (tree.dx && dx_fun) {
        newNode.val = dx_fun(tree.val);
    }
    if(tree.sx && tree.dx){
        newNode.sx = map_tree(tree.sx, sx_fun, dx_fun);
        newNode.dx = map_tree(tree.dx, sx_fun, dx_fun);
    }

    return newNode;
}
console.log(map_tree_T);
console.log(map_tree(map_tree_T,(x) => x+1, (x) => x-1))

//work
function map_tree(tree, sx_fun, dx_fun){
    if(tree === null)
        return tree;
    let Ntree = {val: null, sx: null, dx: null};
    let tmp;
    if(tree.sx != null){
        tmp = map_tree(tree.sx, sx_fun, dx_fun);
        tmp.val = tree.sx.val;
        if(sx_fun != undefined)
            tmp.val = sx_fun(tmp.val);
        Ntree.sx = tmp;
    }if(tree.dx != null){
        tmp = map_tree(tree.dx, sx_fun, dx_fun);
        // if(dx_fun != undefined)
        //     tmp.val = dx_fun(tmp.val);
        Ntree.dx = tmp;
    }
    if(dx_fun != undefined)
        Ntree.val = dx_fun(tree.val);
    else
        Ntree.val = tree.val;
    return Ntree;
}

//#############################################################################


