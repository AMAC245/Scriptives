module.exports = function(sample) {
  const centre = Math.floor(sample.length / 2)
    
    return sample.length % 2 
        ? sample[centre] 
        : (sample[centre - 1] + sample[centre]) / 2
}


