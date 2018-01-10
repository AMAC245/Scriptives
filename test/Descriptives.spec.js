const Descriptives = require('../src/Descriptives')

describe('Descriptives', () => {
    it('should throw if sample is not an array/typed array', () => {     
       expect(() => {
           new Descriptives(1)
       }).toThrow()

       expect(() => {
           new Descriptives([1])
       }).not.toThrow()  
       
       expect(() => {
           new Descriptives (new Uint8Array([1,2]))
       }).not.toThrow()
    })

    it(`should still refer to the correct 'this' when new operator is omitted`, () => {
        const stats = Descriptives([-2,-1,0,1,2.5])
        expect(stats).toBeInstanceOf(Descriptives)
    })

    it('should throw with value and key of item not a number', () => {
        expect(() => {
            new Descriptives([1,2,3,'string'])
        }).toThrow(/'string'/ && /3/)
    })

    it('it should return the correct sample statistics', () => {
        const stats = new Descriptives([1,2,3,4,5])

        expect(stats.sum).toBe(15)
        expect(stats.mean).toBe(3) 
        expect(stats.variance).toBe(2.5) 
        expect(stats.sd).toBeCloseTo(1.58, 2)
        expect(stats.df).toBe(4)    
        expect(stats.median()).toBe(3)
    })

    it('should return identified outliers', () => {
        const stats = new Descriptives([-55,1,2,3,4,55])
        expect(stats.outliers()).toEqual([-55,55])
    })
    
})