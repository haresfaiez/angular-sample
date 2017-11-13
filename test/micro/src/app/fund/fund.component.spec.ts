import { descriptionFrom } from 'app/fund/fund.component';

describe('The description of a fund', () => {
    it('ignores a null target', () => {
	let anInput = { firstTarget: <string>null }

	expect(descriptionFrom(anInput).target).toEqual([ ]);
    })

    it('is extracted from the input', () => {
	let anInput = { name        : 'building'
			, firstTarget : ''
			, secondTarget: ''
			, thirdTarget : ''
		      }

	let expected: any = { name: 'building', target: [ ] }
	expect(descriptionFrom(anInput)).toEqual(expected);
    })
})