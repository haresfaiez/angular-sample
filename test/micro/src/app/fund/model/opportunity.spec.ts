import { status } from 'app/opportunity/model/data.type'

describe('Opportunity status', () => {
    it('should be "Contacted" when the code is "0"', () => {
	expect(status({ status: '0' })).toBe('Contacted');
    })

    it('should be "InitialDesire" when the code is "1"', () => {
	expect(status({ status: '1' })).toBe('InitialDesire');
    })

    it('should give a null string when no status for input code exits', () => {
	expect(status({ status: '123' })).toBe('');
    })
})
