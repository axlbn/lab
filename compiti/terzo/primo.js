// class Point{
//     constructor(x,y){
//         this.x=x;
//         this.y=y;
//     }
//     moveX(delta){
//         this.x+=delta;
//     }
//     moveY(delta){
//         this.y+=delta;
//     }
//     move(deltaX,deltaY){
//         this.moveX(deltaX)
//         this.moveY(deltaY)
//     }
//     randomMove(maxDelta){
//         let rand = () => (Math.round(Math.random()*maxDelta*2)-maxDelta);
//         let deltaX=(Math.random()*rand);
//         let deltaY=(Math.random()*rand);
//         this.move(deltaX,deltaY)
//     }
// }
// let p = new Point(1,2);


// class Queue{
//     constructor(maxSize){
//         this.maxSize=maxSize;
//         this.elements=[];
//     }
//     put(x){
//         if(!this.full)
//         this.elements.push(x);
//     }
//     get(x){
//         return this.elements.shift();
//     }
//     size(){
//         return this.elements.length;
//     }
//     full(){
//         return this.size()>=this.maxSize;
//     }
//     empty(){
//         return this.size === 0;
//     }
//     toString(){
//         let s ="";
//         this.elements.forEach((e)=>{
//             s+="->"+e;
//         })
//         return s;
//     }
//     equals(q){
//         let j=0;
//         if(q.elements.length!= this.elements.length) return false;
//         for(let e of q){
//             if(e!=this.elements[j]){
//                 return false;
//             }
//             j++;
//         }
//         return true;
//     }

// }
// let q=new Queue();
// q.put("a");
// q.put("e");
// console.log(q.toString());

let bst = {
    val: 8,
    sx: {
        val: 3,
        sx: {
            val: 1,
        },
        dx: {
            val: 6,
            sx: {
                val: 4
            },
            dx: {
                val: 7,
            }
        }
    },
    dx: {
        val: 10,
        dx: {
            val: 14,
            sx: {
                val: 13
            }
        }
    }
}

function nodoacaso(a, b) {

    if (a >= b || typeof a != "number" || typeof b != "number") {
        return undefined;
    } else {
        let random = Math.floor(Math.random() * (b - a) + a)
        console.log(random)
        return { val: random, dx: undefined, sx: undefined }
    }
}

function aggiungiabr(T, n) {
    let isdone = false;
    if (T.sx != undefined) {
        if (n.val < T.val) {
            isdone = aggiungiabr(T.sx, n);
            if (isdone == true) return true;
        }
    }
    if (T.dx != undefined) {
        if (n.val >= T.val) {
            isdone = aggiungiabr(T.dx, n);
            if (isdone == true) return true;
        }
    }
    if (n.val >= T.val) T.dx = n
    else T.sx = n;
    return true;
}
console.log(aggiungiabr(bst, nodoacaso(15,22)));



function granchio(T,k){
    let array=[];
    granchiorec(T,k)
    function granchiorec(T,k){
        let tmp;
        if(T==undefined)return T;
    
        if(T.dx!=undefined ){
            granchiorec(T.dx,k);
        }
        
        if(array.length<k)array.push(T.val);
        tmp=T.val;
        if(T.sx!=undefined ){
            granchiorec(T.sx,k)
        }
    }
    return array;
}



console.log(granchio(bst,6))