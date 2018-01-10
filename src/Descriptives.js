const TYPED_ARRAYS = require('./typed_arrays')
const sum = require('./utils/sum')
const median = require('./utils/median')

function Descriptives(sample) {
    if (TYPED_ARRAYS.indexOf(sample.constructor) === -1) {
        throw new TypeError('Expected sample to be an array')
    }
        
    const filterDataType = sample.filter((value, key) => {
        if(typeof value !== 'number') {
            throw new TypeError(`Expected sample to only contain numbers: '${value}' found at ${key}`)
        }
    })
        
    // extend the prototype chain if required 
    if (!(this instanceof Descriptives)) return new Descriptives(sample)
         
    this.init(sample)
}

Descriptives.prototype.init = function(sample) {
    this.sample = sample
    this.population = sample.length
    this.sum = this.sum()
    this.mean = this.mean()
    this.variance = this.variance()
    this.sd = this.sd()
    this.df = this.df()  
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
    
    return candidates
}

module.exports = Descriptives