function reverseAlphabet(str) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const reversedAlphabet = alphabet.split('').reverse().join('');
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const index = alphabet.indexOf(char);
        if (index === -1) {
            result += char;
        } else {
            result += reversedAlphabet[index];
        }
    }
    return result;
}

const input = 'NEGIE1';
const output = reverseAlphabet(input);
console.log(output);
