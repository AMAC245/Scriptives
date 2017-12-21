const TYPED_ARRAYS = require('./typed_arrays')
const sum = require('./utils/sum')

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

module.exports = Descriptives