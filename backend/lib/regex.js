import validateAndEvalExp from "./calculator.js";
import validateAndEvalDate from "./date.js";
import searchExactMatch from "./search.js";
import { search90 } from "./search.js";
import { search3Nearest } from "./search.js";

/* Calculator */
function isCalculatorQuery(input) {
    const regex = /[(\d.)\d+\-*/()\^ ]+/;
    const operator = /[+\-*/\^]/;
    const consecutiveOps = /[+\-*/\^]{2,}/;
    const match = input.match(regex);
    console.log(match)
    if (match && !operator.test(match[0][match[0].length - 1]) && !consecutiveOps.test(match[0]) && match[0].length != 1) {
        let parenthesisStack = [];
        for (let i = 0; i < match[0].length; i++) {
            if (match[0][i] === '(') {
                parenthesisStack.push('(');
            } else if (match[0][i] === ')') {
                if (parenthesisStack.length === 0 || parenthesisStack.pop() !== '(') {
                    return null;
                }
            }
        }
        return parenthesisStack.length === 0 ? match[0] : null;
    } else {
        return null;
    }
}

/* Date */
function isDateQuery(input) {
    const regex = /(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}/;
    const match = input.match(regex);
    return match ? match[0] : null;
}

/* Add Question */
function isAddQuestionQuery(input) {
    const regex = /^Tambahkan pertanyaan (.+) dengan jawaban (.+)$/i;
    const match = input.match(regex);
    return match ? {question: match[1], answer: match[2]} : null;
}

/* Remove Question */
function isRemoveQuestionQuery(input) {
    const regex = /^Hapus pertanyaan (.+)$/i;
    const match = input.match(regex);
    return match ? match[1] : null;
}

// function splitQuestion(question) {
//     let questions = question.split('?');
//     questions = questions.map((q) => q.trim());

//     let ans = [];

//     question.forEach((q) => {
//         ans.push(evalQuestion(q));
//     });

//     if (ans.length == 1) {
//         return ans[0];
//     } else {
//         let res = `Kami mendeteksi {questions.length} pertanyaan:   `;
//         for (let i = 0; i < questions.length; i++) {
//             ans
//         }
//     }

// }

export default function evalQuestion(input, arr, fdel, fadd, fupdate, isKMP) {
    // FITUR DATE
    if (isDateQuery(input)) {
        return validateAndEvalDate(isDateQuery(input));

    // FITUR CALCULATOR
    } else if (isCalculatorQuery(input)) {
        return validateAndEvalExp(isCalculatorQuery(input));

    // FITUR TAMBAH PERTANYAAN
    } else if (isAddQuestionQuery(input)) {
        const match = isAddQuestionQuery(input);
        console.log(match);
        const question = match.question;
        const answer = match.answer;
        console.log(question, answer);

        let res = searchExactMatch(question, arr, isKMP);
        if (res) {
            fupdate(res._id, res.question, answer);
            console.log(question, answer);
            return `Berhasil mengupdate pertanyaan '${question}' dengan jawaban '${answer}'`;
        } else {
            fadd(question, answer);
            console.log(question, answer);
            return `Berhasil menambah pertanyaan '${question}' dengan jawaban '${answer}'`;
        }

    // FITUR HAPUS PERTANYAAN
    } else if (isRemoveQuestionQuery(input)) {
        const match = isRemoveQuestionQuery(input); /* The Question */
        console.log(`INIIII: ${match}`); // testing
        let res = searchExactMatch(match, arr, isKMP);
        if (res) {
            fdel(res._id);
            return `Berhasil menghapus pertanyaan '${res.question}'`;
        } else {
            return `Pertanyaan '${match}' ditemukan`;
        }

    // FITUR CARI KE DATABASE
    } else {
        let t1 = searchExactMatch(input, arr, isKMP);
        console.log(t1);
        if (t1) {
            return t1.answer;
        }

        let t2 = search90(input, arr);
        console.log(t1);
        if (t2) {
            return t2.answer;
        }

        let t3 = search3Nearest(input, arr);
        console.log(t1);
        if (t3) {
            let res = `Apakah maksud Anda salah satu dari pertanyaan:`;
            for (let i = 0; i < t3.length; i++) {
                res += `\n${i + 1}. ${t3[i].question}`;
            }
            return res;
        }

        // TIDAK ADA FITUR YANG SESUAI
        return "Tidak ada pertanyaan yang sesuai"
    }
}
