const prompt = require('prompt-sync')();

let albero = {
    val: 12,
    sx: {
        val: 2,
        sx: {
            val: 17,
            sx: {
                val: 3,
            }
        },
        dx: {
            val: 5,
            sx: {
                val: 3,
            },
            dx: {
                val: 2,
                sx: {
                    val: 7
                }
            }
        }
    },
    dx: {
        val: 15,
        sx: {
            val: 5,
        },
    }
}


// function maxT(albero) {
//     let maxdx=-Infinity;
//     let maxsx=-Infinity;
//     if(albero.sx!=null)maxsx=maxT(albero.sx);
//     if(albero.dx!=null)maxdx=maxT(albero.dx);

//     return Math.max(albero.val,maxsx,maxdx)

// }

// function sommaT(albero){
//     let dx=0;
//     let sx=0;
//     if(albero.sx!=null)sx=sommaT(albero.sx);
//     if(albero.dx!=null)dx=sommaT(albero.dx);

//     return  albero.val+dx+sx

// }

// console.log(sommaT(albero))

// function isinT(albero,x){
//     let trovato;
//     if(albero.val===x){
//         return true;
//     }
//     if(albero.sx!=null) trovato =isinT(albero.sx,x);
//     if(trovato===true) return true;
//     if(albero.dx!=null) trovato =isinT(albero.dx,x);
//     if(trovato===true) return true;

//     return false;
// }

// function countT(albero,x){
//     let sx=0;
//     let dx=0;
//     let isit=0;
//     if(albero.val===x)
//         isit=1;
//     if(albero.sx!=null) sx= countT(albero.sx,x);
//     if(albero.dx!=null) dx= countT(albero.dx,x);
//     return isit+sx+dx;
// }


// function swap(albero){
//     let dx=albero.dx;
//     albero.dx=albero.sx;
//     albero.sx=dx;
//     return albero;
// }
// console.log(albero)
// console.log(swap(albero))

// console.log(countT(albero,5))



function maxNode(tree) {
    if (tree === null) {
        return - Infinity;
    }
    return Math.max(tree.val, Math.max(
        maxNode(tree.sx),
        maxNode(tree.dx)))
}

function minNode(tree) {
    if (tree === null) {
        return Infinity;
    }

    return Math.min(tree.val, Math.min(
        minNode(tree.sx),
        minNode(tree.dx)))
}

function checkBST(tree) {
    let max = maxNode(tree);
    let min = minNode(tree);
    if (max === tree.dx && min == tree.sx) {
        let res = checkBST(tree.sx)
        if (res === false) return false;
        res = checkBST(tree.dx)
        if (res === false) return false;
        return true;
    }
    return false;
}


function prune(tree, val) {
    if (tree.val == undefined) return;
    if (tree.val === val) {
        delete tree.sx;
        delete tree.dx;
    }
    if (tree.sx != undefined) {
        prune(tree.sx, val);
    }
    if (tree.dx != undefined) {
        prune(tree.dx, val);
    }

    return tree;
}



function size(tree) {
    let n = 0;
    if (tree.val == undefined) return;
    if (tree.sx != undefined) {
        n += size(tree.sx) + 1;
    }
    if (tree.dx != undefined) {
        n += size(tree.sx) + 1;
    }
    return n;
}

function even_odd_visit(tree) {
    if (tree.val == undefined) return;
    console.log(tree.val);
    if (tree.sx != undefined) {
        if (tree.sx.val % 2 == 0)
            even_odd_visit(tree.sx);
        else {
            if (tree.dx != undefined)
                even_odd_visit(tree.dx);
        }
    }


}

//dunno

// function left_view(tree){
//     let isprinted=false;
//     if(tree.val==undefined) return;
//     console.log(tree.val)
//     if(tree.sx!=undefined){
//         isprinted=true;
//         left_view(tree.sx);
//     }
//     if(!isprinted){
//         if(tree.dx!=undefined)
//             left_view(tree.dx);
//     }
//     return
// }


// const espressioneTree={
//     val: "**",
//     sx: { val: "*",
//           sx: { val: 4},
//           dx: { val: "+",
//                 sx: {  val: "*",
//                        sx: { val: 5 },
//                        dx: { val: 4 }
//                 },
//                 dx: { val: 3 }
//               }
//     },
//     dx: { val: 2 }
//   }




// console.log(valutaEspressione(espressioneTree));

// let tree= {
//     val:12,
//     sx:{
//         val:6,
//         sx:{
//             val:2,
//             sx:{
//                 val:1,
//             },
//             dx:{
//                 val:3
//             }
//         },
//         dx:{
//             val:7
//         }
//     },
//     dx:{
//         val:18,
//         sx:{
//             val:13,
//         },
//         dx:{
//             val:18
//         }
//     }
// }
let tree = {
    val: 10,
    sx: { val: 4, sx: null, dx: null },
    dx: { val: 10, sx: { val: 3, sx: null, dx: null }, dx: null }
}
function maxNode(tree) {
    if (tree === null) {
        return - Infinity;
    }

    return Math.max(tree.val, Math.max(
        maxNode(tree.sx),
        maxNode(tree.dx)))
}

function minNode(tree) {
    if (tree === null) {
        return Infinity;
    }

    return Math.min(tree.val, Math.min(
        minNode(tree.sx),
        minNode(tree.dx)))
}
function checkBST(tree) {
    let isValid = true;
    let maxSx;
    let minDx;
    if (tree.val === undefined) return false;
    if (tree.sx != null) {
        maxSx = maxNode(tree.sx);
    }
    if (tree.dx != null) {
        minDx = minNode(tree.dx);
    }

    if (minDx <= tree.val || maxSx > tree.val) {
        return false;
    }
    if (tree.sx != null) {
        isValid = checkBST(tree.sx);
        if (!isValid) return false;
    }
    if (tree.dx != null) {
        isValid = checkBST(tree.dx);
        if (!isValid) return false;
    }
    return isValid;


}
//console.log(checkBST({}));
function max_depth(t) {
    let dx = 0;
    let sx = 0;
    if (t == {}) return undefined;
    if (!t.sx && !t.dx) return 0;
    if (t.sx != undefined) {
        sx += max_depth(t.sx);
    }

    if (t.dx != undefined) {
        dx = +max_depth(t.dx);
    }
    if (dx < sx) {
        return sx + 1;
    } else {
        return dx + 1;
    }

}

//console.log(max_depth(tree));

function min_depth(t) {
    let dx = 0;
    let sx = 0;
    if (t == {}) return undefined;
    if (!t.sx && !t.dx) return 0;
    if (t.sx != undefined) {
        sx += min_depth(t.sx);
    }

    if (t.dx != undefined) {
        dx = +min_depth(t.dx);
    }
    if (dx > sx) {
        return dx + 1;
    } else {
        return sx + 1;
    }

}
let tree1 = {val:19,
                    sx:{    
                        val:15, 
                        sx:{val:1,
                            sx:{val:1},
                            dx:{val:3}
                        },
                        dx:{
                            val:25,
                            sx:{val:9}
                        }
                    },
                    dx:{
                        val:28,
                        dx:{val:4}
                    }
                }
let tree2={val:19,
                sx:{
                    val:28,
                    dx:{val:4}
                },
                dx:{
                    val:15,
                    sx:{
                        val:25,
                        sx:{val:9}
                    },
                    dx:{
                        val:1,
                        sx:{val:3},
                        dx:{val:1}
                    }
                }
            }

//console.log(min_depth(treemin_depth))



function sxltdx(T) {
    if(T=={})return undefined;
    if(T.sx!=undefined && T.dx!=undefined){
        if(T.sx.val<T.dx.val){
            let tmp=T.dx;
            T.dx=T.sx;
            T.sx=tmp;
        }
    }
    if(T.sx!=undefined) sxltdx(T.sx);
    if(T.dx!=undefined) sxltdx(T.dx);
    return T;
}

console.log(sxltdx(tree1))
