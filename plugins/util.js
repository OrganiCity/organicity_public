export default function ({ }, inject) {
    const util = {
        range: (l, r) => new Array(r - l + 1).fill().map((_, k) => k + l),
        compareArrays: (arr1, arr2) => arr1.length === arr2.length && arr1.every((e, i) => e === arr2[i])
    }
    inject('util', util)
}