let ktree = {
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


  function findValue(ktree,n){
    let trovato;
    if(ktree ==  {})
        return undefined;
    if(ktree.val==n)
        return true;
    for(let v of ktree.figli){
        trovato= findValue(v,n);
        if(trovato) return true ;
    }
    return false;
  }

  //console.log(findValue(ktree,-10));

function update(ktree,f){
    ktree.val=f(ktree.val);
    for(let v of ktree.figli){
        update(v,f);
    }
}


function _print_ktree(ktree, ind) {
    console.log(ind + "|-", ktree.val)
    for (let f of ktree.figli)
      _print_ktree(f, ind + "   ")
  }
  
  function print_ktree(ktree) {
    _print_ktree(ktree, "")
  }
  
//    print_ktree(ktree)
//    update(ktree,(x)=>(x*2))
//    print_ktree(ktree)

let tree_taglia_nodi_interni={val:0, figli:[
    {val:1, figli:[
        {val:3, figli:[]},
        {val:4, figli:[]},
    ]}]};


    var T0 = 
    {val:0,figli:[{val:1,figli:[{val:6,figli:[]},{val:7,figli:[]}]},{val:3,figli:[{val:11,figli:[]},{val:12,figli:[]},{val:13,figli:[]}]}]};
    //non va
    function taglia_nodi_interni(t, m) {
        if (!t) return;
        if (t.figli && t.figli.length <= m) {
            t.figli = [];
        } else if (t.figli) {
            let i = 0;
            while (i < t.figli.length) {
                if (taglia_nodi_interni(t.figli[i], m)) {
                    t.figli.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
        return t;
    }
print_ktree(T0)
print_ktree(taglia_nodi_interni(T0,4));


