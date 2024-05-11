// import postgres from '../database/postgres';


// regex
export const regexStringSouSianntiau = '(?:2|3|p8|p|t8|t|k8|k|h8|h|5|7|8)?';
export const regexStringHyphenOrSpace = '(?: |--|-)';

export const regexStringAhUnPrefix = '.*(?:(?<![aiueo]))';
export const regexStringAhUnSuffix =  '(?:nn)?(?:2|3|h8|h|5|7|8)?$';
export const regexStringKootengImchatPrefix = '(.* |^)';
export const regexStringKootengImchatSuffix = '( .*|$)';

export const regexpRedundantSianntiau = new RegExp('(?<!\\\\)(?:1|4)', 'g');
export const regexpHyphenOrSpace = new RegExp('[ -]', 'g');
export const regexpSianntiauTaibe = new RegExp('%', 'g');

export const regexpKooImchatSiannthauTaibe = new RegExp('~<', 'g');
export const regexpKooImchatHeksimKapBoeliuTaibe = new RegExp('~>', 'g');
export const regexpKooImchatTaibeBoKhakteng = new RegExp('~x', 'g');
export const regexpKooImchatTaibe = new RegExp('~', 'g');
export const regexpStringKooImchatSiannthauTaibePrefix = '(?:ph|p|m|b|th|t|n|l|kh|k|ng|g|chh|ch|s|j|h)';
export const regexpStringKooImchatHeksimKapBoeliuTaibeSuffix = '(?:[aiueo]+(?:nn|m|ng|n)*|(?:m|ng|g))(?:2|3|p8|p|t8|t|k8|k|h8|h|5|7|8)?';
export const regexStringKooImchatBoKhakteng = '(?:(?![ -\/]).)*';
export const regexStringKooImchat = '(?:(?![ -\/]).)+';

export const regexpStringSpecialChar1 = ' ';
export const regexpStringSpecialChar2 = '-';
export const regexpStringSpecialChar3 = '{';
export const regexpStringSpecialChar4 = '}';
const regexpStringSpecialCharString1 = '\\\\ ';
const regexpStringSpecialCharString2 = '\\\\-';
const regexpStringSpecialCharString3 = '\\\\{';
const regexpStringSpecialCharString4 = '\\\\}';
export const regexpStringSpecialChar1Temp = '####';
export const regexpStringSpecialChar2Temp = '###';
export const regexpStringSpecialChar3Temp = '##';
export const regexpStringSpecialChar4Temp = '#';
export const regexpSpecialChar1 = new RegExp(regexpStringSpecialCharString1, 'g');
export const regexpSpecialChar2 = new RegExp(regexpStringSpecialCharString2, 'g');
export const regexpSpecialChar3 = new RegExp(regexpStringSpecialCharString3, 'g');
export const regexpSpecialChar4 = new RegExp(regexpStringSpecialCharString4, 'g');
export const regexpSpecialChar1R = new RegExp(regexpStringSpecialChar1Temp, 'g');
export const regexpSpecialChar2R = new RegExp(regexpStringSpecialChar2Temp, 'g');
export const regexpSpecialChar3R = new RegExp(regexpStringSpecialChar3Temp, 'g');
export const regexpSpecialChar4R = new RegExp(regexpStringSpecialChar4Temp, 'g');

// // lowercase query
// export function lowerQeury(key) {
//     return postgres.raw('LOWER(\"' + key + '\")');
// }
// export function lowerStr(str) {
//     return str.toLowerCase();
// }


