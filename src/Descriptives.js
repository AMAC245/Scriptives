const TYPED_ARRAYS = require('./typed_arrays')
const sum = require('./utils/sum')
const median = require('./utils/median')
const validate = require('./validate')

function Descriptives(sample) {
    if(this instanceof Descriptives) {
        this.init(validate(sample))
    } else {
        return new Descriptives(sample) 
    }
}

Descriptives.prototype.init = function(sample) {
    this.sample = sample
    this.population = sample.length
    this.sum = this.sum()
    this.mean = this.mean()
    this.variance = this.variance()
    this.sd = this.sd()
    this.df = this.df() 
    this.median = this.median() 
    this.outliers = this.outliers() 
}

Descriptives.prototype.sum = function() {
    return this.sum = sum(this.sample)
}

Descriptives.prototype.mean = function() {
    return this.sum / this.population
}

Descriptives.prototype.variance = function() { 
    const conversion = this.sum ** 2 / this.population
    const indices    = this.sample.map(value => value ** 2)
    
    return (sum(indices) - conversion) / (this.population -1)    
}

Descriptives.prototype.sd = function() {   
    return Math.sqrt(this.variance)    
}

Descriptives.prototype.df = function() {
    return this.population - 1
}

Descriptives.prototype.median = function() {
    return median(this.sample)
}

Descriptives.prototype.outliers = function() {
    const q1 = []
    const q3 = []
    this.sample.filter(item => {
        item >= median(this.sample) 
            ? q3.push(item) 
            : q1.push(item)    
    })
    
    const iqr = median(q3) - median(q1)
    const upperThreshold = median(q3) * 1.5
    const lowerThreshold = median(q1) - 1.5 * iqr

    const candidates = this.sample.filter(item => {
        if( item > upperThreshold || 
            item < lowerThreshold
        ) return item      
    })
    
    return candidates.length 
        ? candidates 
        : 'No outliers detected'
}

module.exports = Descriptives