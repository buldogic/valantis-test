import md5 from 'crypto-js/md5'

const password = "Valantis";
const data = new Date();
const currentDate = data.toLocaleDateString().split(".").reverse().join("");
export const auth = md5(`${password}_${currentDate}`);