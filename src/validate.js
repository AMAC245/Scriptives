const TYPED_ARRAYS = require('./typed_arrays')

function validate(sample) {   
  if (TYPED_ARRAYS.indexOf(sample.constructor) === -1) {
    throw new TypeError(
      'Expected sample to be an array: ' +
      `received ${typeof sample}`
    ) 
  }
  
  return sample.map((value, key) => {
    if(typeof value !== 'number') {
      const int = parseInt(value)
      if(isNaN(int)) {
          throw new TypeError(`Invalid type detected in dataset: '${value}' at ${key}`)  
      } else {
        console.warn(
          'Type conversion has been required within your dataset. ' +
          'To maintain data integrity, revisions may be needed ' +
          `for entries at [${key}]`
        ) 
        return parseInt(value)
      }
    } 
    return value  
  })
}

module.exports = validate