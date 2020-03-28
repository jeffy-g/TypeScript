/** #### src/compiler/utilities.ts#4566
 * 
 * (g)et(S)tring(F)rom(E)xpanded(C)har(C)odes
 */
function gsfecc0(codes: number[]): string {
    let output = "";
    let i = 0;
    const length = codes.length;
    while (i < length) {
        const charCode = codes[i];

        if (charCode < 0x80) {
            output += String.fromCharCode(charCode);
            i++;
        }
        else if ((charCode & 0b1100_0000) === 0b1100_0000) {
            let value = charCode & 0b0011_1111;
            i++;
            let nextCode: number = codes[i];
            while ((nextCode & 0b1100_0000) === 0b1000_0000) {
                value = (value << 6) | (nextCode & 0b0011_1111);
                i++;
                nextCode = codes[i];
            }
            // `value` may be greater than 10FFFF (the maximum unicode codepoint) - JS will just make this into an invalid character for us
            output += String.fromCharCode(value);
        }
        else {
            // We don't want to kill the process when decoding fails (due to a following char byte not
            // following a leading char), so we just print the (bad) value
            output += String.fromCharCode(charCode);
            i++;
        }
    }
    return output;
}
function gsfecc1(codes: number[]): string {
    let output = "";
    let i = 0;
    const length = codes.length;
    const sfcc = String.fromCharCode;
    while (i < length) {
        const charCode = codes[i++];

        if (charCode < 0x80) {
            output += sfcc(charCode);
        }
        else if ((charCode & 0b1100_0000) === 0b1100_0000) {
            let value = charCode & 0b0011_1111;
            let nextCode: number;
            while (
                (
                    (nextCode = codes[i++]) & 0b1100_0000
                ) === 0b1000_0000
            ) {
                value = (value << 6) | (nextCode & 0b0011_1111);
            }
            // `value` may be greater than 10FFFF (the maximum unicode codepoint) - JS will just make this into an invalid character for us
            output += sfcc(value);
        }
        else {
            // We don't want to kill the process when decoding fails (due to a following char byte not
            // following a leading char), so we just print the (bad) value
            output += sfcc(charCode);
        }
    }
    return output;
}

//
// benchmark: js-benchmark2.js
//  data = Array.from("this is sample!").map(ch => ch.charCodeAt(0));
//  bench2([gsfecc0, gsfecc1], [data], 10, 50_0000);
/*
[case: gsfecc0]: {hz: 4864969.724675407, runs: 40000000, text: "4,864,969.724675 ops/sec, runs: 40,000,000 times"}
[case: gsfecc1]: {hz: 4942778.07605943, runs: 40000000, text: "4,942,778.076059 ops/sec, runs: 40,000,000 times"}
*/
//

// TODO: Array.from("これは sample test です。私は誰でしょう！！").map(ch => "0x" + ch.charCodeAt(0).toString(16));

