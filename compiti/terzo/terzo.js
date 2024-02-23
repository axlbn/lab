

function predFilter(L, pred) {
    console.log(L)
    if (!L.next) {
        if (pred(L.val)) {
            return true;
        } else return false;

    }
    if (pred(L.next.val)) {
        L.next = L.next.next;
        if (predFilter(L, pred)) { L.next = null; return; }
    } else {

        if (predFilter(L.next, pred)) { L.next = null; return; }
    }

}


let L1 = {
    next:
    {
        val: 3, next:
        {
            val: 4, next:
            {
                val: 11, next:
                {
                    val: 7, next:
                    {
                        val: 0, next:
                        {
                            val: 4, next: null
                        }
                    }
                }
            }
        }
    }
}
predFilter(L1, v => v < 5)
console.log(JSON.stringify(L1))