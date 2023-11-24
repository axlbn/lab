const prompt = require('prompt-sync')();


let albero ={
    val:12,
    sx:{
        val:2,
        sx:{
            val:5,
            sx:null,
            dx:null
        },
        dx:{
            val:5,
            sx:null,
            dx:null
        }
    },
    dx:{
        val:15,
        sx:{
            val:3,
            sx:null,
            dx:null,
        },
        dx:null,
    }
}


function maxT(tree){
    let max;
    console.log(tree.val)
    if(tree.sx!=null){
        max=maxT(tree.sx)
        
    }
    if(tree.dx!=null){
        max=maxT(tree.dx);
        
    }


}


function isInT(tree,x){
    let occorrenze=false;
    if(tree.val==x){
        return true;
    }
    if(tree.sx!=null){
         occorrenze=isInT(tree.sx,x)
         if(occorrenze){
            return occorrenze;
        }
    }

    if(tree.dx!=null){
        occorrenze=isInT(tree.dx,x);
        if(occorrenze){
            return occorrenze;
        }
    }
    return false;
  

}
//console.log(isInT(albero,17))
//console.log(maxT(albero))


function contaT(tree){
    
    if(tree.sx!=null){
        contaT(tree.sx)
        
    }
    if(tree.dx!=null){
        contaT(tree.dx);
        
    }
    v    
}

console.log(contaT(albero,5))