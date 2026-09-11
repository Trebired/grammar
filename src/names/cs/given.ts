const MASCULINE_NAMES = new Set([
    "andy", "billy", "bruno", "eddie", "franta", "harry", "honza", "hugo", "ilja", "ivo", "jarda", "jenda",
    "jimmy", "jirka", "johnny", "jura", "kuba", "láďa", "levi", "luka", "marko", "mirko", "míra", "otto",
    "pepa", "rené", "sáva", "standa", "tonda", "tony", "venca", "vláďa",
]);

const FEMININE_NAMES = new Set([
    "abigail", "agnes", "amy", "babet", "beatrix", "betty", "carmen", "dagmar", "doris", "edit", "elen",
    "emily", "ester", "helen", "ingrid", "iris", "isabel", "ivet", "ivon", "jenny", "joy", "judit", "karin",
    "karmen", "kelly", "kristin", "lili", "lilian", "lucy", "mabel", "marion", "mary", "megan", "miriam",
    "naomi", "nicol", "nikol", "noemi", "rachel", "ráchel", "ruby", "rút", "ruth", "sally", "sarah", "vivien",
]);

const AMBIGUOUS_NAMES = new Set(["alex", "jasmin", "jindra", "kim", "míla", "nikita", "péťa", "robin", "saša", "vlasta"]);

export { AMBIGUOUS_NAMES, FEMININE_NAMES, MASCULINE_NAMES };
