var methods = {}

var output =1;
this.output = output

fsum = (a,b) => a+b;
fmul = (a,b) => a*b;
fdiv = (a,b) => a/b;
fsub = (a,b) => a-b;

const fsum2 = function(a,b) {
    return int(a)+int(b)
    //return output
} 

methods.fsum = fsum
methods.fsum2 = fsum2
methods.fsub = fsub
methods.fmul = fmul
methods.fdiv = fdiv


exports.data = methods
//exports.output = output
//exports.that = this