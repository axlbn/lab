/* Courtesy of Prof. Gervasi */

const fs = require("fs");
const Parser = require("jison").Parser;

const grammatica = {
  lex: {
    // LESSICALE
    rules: [
      ["const", "return 'CONST'"],
      ["var", "return 'VAR'"],
      ["if", "return 'IF'"],
      ["else", "return 'ELSE'"],
      ["while", "return 'WHILE'"],
      ["for", "return 'FOR'"],
      [" to ", "return 'TO'"],
      ["return", "return 'RETURN'"], // non utilizzato, non abbiamo funzioni
      ["true", "return 'TRUE'"],
      ["false", "return 'FALSE'"],
      ["print", "return 'PRINT'"],
      ["\\s+", "/* skip whitespace */"],
      ["[a-zA-Z_]+", "return 'ID'"],
      ["[0-9]+", "return 'NUM'"], // ci stiamo limitando a valori interi
      [">=", "return 'GE'"], // >=  prima di > per evitare confusione (chi prima arriva meglio alloggia)
      ["<=", "return 'LE'"],
      ["==", "return 'EQ'"],
      ["!=", "return 'NEQ'"],
      ["&&", "return 'AND'"],
      ["\\|\\|", "return 'OR'"], //escape del ||
      ["\\*", "return '*'"], // escape del *
      ["/", "return '/'"],
      ["\\+", "return '+'"], // escape del +
      ["-", "return '-'"],
      ["\\^", "return '^'"], // escape del ^
      ["\\%", "return '%'"], // escape del %
      ["!", "return '!'"], // not logico
      [">", "return '>'"],
      ["<", "return '<'"],
      ["=", "return '='"],
      [";", "return ';'"],
      [",", "return ','"],
      [":", "return ':'"], // non utilizzato, non abbiamo dichiarazioni di tipo
      ["null\\b", "return 'NULL'"], // non utilizzato, non abbiamo riferimenti/puntatori
      ["\\{", "return '{'"],
      ["\\}", "return '}'"],
      ["\\(", "return '('"],
      ["\\)", "return ')'"],
    ],
  },

  operators: [
    // PRECEDENZA e ASSOCIATIVITÀ operatori
    ["left", "AND", "OR"], // in ordine di precedenza, dal più basso al più alto
    ["left", "EQ", "NEQ", "!"],
    ["left", "<", ">", "GE", "LE"],
    ["left", "+", "-"],
    ["left", "^"],
    ["left", "*", "/", "%"],
    ["right", "THEN", "ELSE"], // shift vince (prendendo else) in caso di conflitto shift/reduce - e' la piu' alta?
  ],

  bnf: {
    // GRAMMATICA - costruisce albero di sintassi
    program: [["cmd", "return $cmd"]],
    cmd: [
      ["", '$$ = ["NIL"]'],
      ["dec ; cmd", '$$ = ["DC",$dec,$cmd]'],
      ["cmd ; cmd", '$$ = ["CC",$cmd1,$cmd2]'],
      ["ID = exp", '$$ = ["ASSIGN",$ID,$exp]'],
      ["IF ( exp ) { cmd }", '$$ = ["IF",$exp,$cmd]'],
      ["IF ( exp ) { cmd } ELSE { cmd }", '$$ = ["IFELSE",$exp,$cmd1,$cmd2]'],
      ["WHILE ( exp ) { cmd }", '$$ = ["WHILE",$exp,$cmd]'],
      ["PRINT exp", '$$ = ["PRINT",$exp]'],
      ["FOR cmd TO exp { cmd }",'$$=["FORTO",$cmd1 != $exp,$cmd2]']
    ],

    dec: [
      ["", '$$=["NIL"]'],
      ["CONST ID = exp", '$$=["CONST",$ID,$exp]'],
      ["VAR ID = exp", '$$=["VAR",$ID,$exp]'],
      ["dec ; dec", '$$ = ["DD", $dec1, $dec2]'],
    ],

    exp: [
      ["val", '$$=["VAL", $val]'],
      ["ID", '$$=["ID",$ID]'],
      ["uop exp", '$$=["UOP",$uop,$exp]'],
      ["exp bop exp", '$$=["BOP",$exp1,$bop,$exp2]'],
      ["( exp )", '$$=["PAR",$exp]'],
    ],

    val: [
      ["NUM", "$$=+$NUM"], // il + converte la stringa $1 in numero
      ["TRUE", "$$=true"],
      ["FALSE", "$$=false"],
    ],

    uop: ["+", "-", "!"],

    bop: [
      "+",
      "-",
      "*",
      "/",
      "EQ",
      ">",
      "<",
      "GE",
      "LE",
      "NEQ",
      "AND",
      "OR",
      "%",
      "^",
    ],
  },
};

var parser = new Parser(grammatica);
var ast = parser.parse(fs.readFileSync("./test.elle", "utf-8"));
// Fine della costruzione dell'albero di sintassi.

// Stampa dell'albero di sintassi (separato tramite linee vuote)
for (let i = 0; i < 10; i++) console.log("");
console.log("* ALBERO DI SINTASSI *");
console.dir(ast, { depth: 10 });
for (let i = 0; i < 10; i++) console.log("");

// =========================================================================
// Ora definiamo la semantica dinamica.

// Utility: la funzione traccia() serve a stampare una traccia dell'esecuzione
// di un programma (utili per studiarne il funzionamento: transizioni).
function traccia(fn, albero) {
  console.log(`${fn}(${albero})`);
}

// L'ambiente dinamico rho è una funzione che preso un ID, restituisce un valore o una locazione. Inizialmente, rho è vuoto, quindi restituiamo undefined per qualunque id.
const rho0 = (id) => undefined;

// La memoria sigma è una funzione che, presa una locazione, restituisce il valore contenuto. Inizialamente, sigma è vuota, quindi restituiamo undefined per qualunque locazione.
const sigma0 = (loc) => undefined;

// Operazione di estensione: data una funzione f, un argomento a, e un valore v, restituisce una funzione modificata f', tale che f'(a)=v, e per qualunque altro argomento, f'(x)=f(x).
const ext = (f, a, v) => (x) => (x == a ? v : f(x));

// Locazioni: le rappresentiamo con "L0", "L1" ecc.
var locCount = 0;
const newLoc = () => "L" + locCount++;
const isLoc = (l) => typeof l == "string" && l.startsWith("L");

// Avremo bisogno di tre funzioni:
// - exec: dato un comando c, un rho e un sigma, restituisce un nuovo rho e un nuovo sigma
// - eval: dato un valore v, restituisce un nuovo valore v'
// - lookup: dato un valore v, restituisce un nuovo valore v'

// exec: dato un comando c, e una coppia [rho,sigma], restituisce [rho',sigma']
function exec(c, [rho, sigma]) {
  traccia("exec", c);
  switch (c[0]) {
    case "NIL":
      return [rho, sigma];
    case "DC":
      return exec(c[2], elab(c[1], [rho, sigma]));
    case "CC":
      return exec(c[2], exec(c[1], [rho, sigma]));
    case "ASSIGN":
      return [rho, ext(sigma, rho(c[1]), eval(c[2], [rho, sigma]))];
    case "IF":
      return eval(c[1], [rho, sigma]) ? exec(c[2], [rho, sigma]) : [rho, sigma];
    case "IFELSE":
      return eval(c[1], [rho, sigma])
        ? exec(c[3], [rho, sigma])
        : exec(c[4], [rho, sigma]);
    case "WHILE":
      console.log(c);
      return eval(c[1], [rho, sigma])
        ? exec(c, exec(c[2], [rho, sigma]))
        : [rho, sigma];
    case "FORTO":
      console.log("ssssssss"+ exec(c[1],[rho,sigma]))
      
    case "PRINT":
      console.warn(eval(c[1], [rho, sigma]));
      return [rho, sigma];
    default:
      throw "Comando non valido: " + c[0];
  }
}

// eval: data un'espressione e, e una coppia [rho,sigma], restituisce il valore di e
function eval(e, [rho, sigma]) {
  traccia("eval", e);
  switch (e[0]) {
    case "VAL":
      return e[1];
    case "ID":
      let u = rho(e[1]);
      return isLoc(u) ? sigma(u) : u;
    case "UOP":
      switch (
        e[1] // ['+','-','!']
      ) {
        case "+":
          return eval(e[2], [rho, sigma]);
        case "-":
          return -eval(e[2], [rho, sigma]);
        case "!":
          return !eval(e[2], [rho, sigma]);
      }
    case "BOP":
      switch (
        e[2] // '+','-','*','/','EQ','>','<','GE','LE','NEQ', 'AND', 'OR', '%', '^'
      ) {
        case "+":
          return eval(e[1], [rho, sigma]) + eval(e[3], [rho, sigma]);
        case "-":
          return eval(e[1], [rho, sigma]) - eval(e[3], [rho, sigma]);
        case "*":
          return eval(e[1], [rho, sigma]) * eval(e[3], [rho, sigma]);
        case "/":
          return eval(e[1], [rho, sigma]) / eval(e[3], [rho, sigma]);
        case "EQ":
          return eval(e[1], [rho, sigma]) == eval(e[3], [rho, sigma]);
        case ">":
          return eval(e[1], [rho, sigma]) > eval(e[3], [rho, sigma]);
        case "<":
          return eval(e[1], [rho, sigma]) < eval(e[3], [rho, sigma]);
        case "GE":
          return eval(e[1], [rho, sigma]) >= eval(e[3], [rho, sigma]);
        case "LE":
          return eval(e[1], [rho, sigma]) <= eval(e[3], [rho, sigma]);
        case "NEQ":
          return eval(e[1], [rho, sigma]) != eval(e[3], [rho, sigma]);
        case "AND":
          return eval(e[1], [rho, sigma]) && eval(e[3], [rho, sigma]);
        case "OR":
          return eval(e[1], [rho, sigma]) || eval(e[3], [rho, sigma]);
        case "%":
          return eval(e[1], [rho, sigma]) % eval(e[3], [rho, sigma]);
        case "^":
          return eval(e[1], [rho, sigma]) ** eval(e[3], [rho, sigma]);
      }
    case "PAR":
      return eval(e[1], [rho, sigma]);
    default:
      throw "Espressione non valida: " + e[0];
  }
}

// elab: data una dichiarazione d, e una coppia [rho,sigma], restituisce la coppia [rho',sigma']
function elab(d, [rho, sigma]) {
  traccia("elab", d);
  switch (d[0]) {
    case "CONST":
      return [ext(rho, d[1], eval(d[2], [rho, sigma])), sigma];
    case "VAR":
      let l = newLoc();
      return [ext(rho, d[1], l), ext(sigma, l, eval(d[2], [rho, sigma]))];
    case "DD":
      return elab(d[2], elab(d[1], [rho, sigma]));
    default:
      throw "Dichiarazione non valida: " + d[0];
  }
}

// FINITO! Possiamo eseguire il programma, partendo dalla radice (ast) con [rho0,sigma0]
console.log("* ESECUZIONE PROGRAMMA *")
exec(ast,[rho0,sigma0])