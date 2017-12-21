module.exports = function sum(sample) {
    return sample.reduce((prev, curr) => curr += prev)
}
