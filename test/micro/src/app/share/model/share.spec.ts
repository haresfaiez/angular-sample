import { flat, fragment, grantCommand } from 'app/share/model/data.type';

describe('A share', () => {
    it('is mapped to the scheme accpeted by the server', () => {
	let aStale = { name: 'aName'
		       , owner: 'anOwner'
		       , scope     : 'aFundAddress'
		       , equity    : fragment(12)
		     };
	let expected = { name: 'aName'
			 , owner: 'anOwner'
			 , equity: '12'
			 , whole: 'aFundAddress'
		       }
	expect(grantCommand(aStale)).toEqual(expected);
    })
})

describe('Share data type flat', function () {
    it('creates a share data object from a raw data object', () => {
	let aJsonShareResponse =
	    { identity    : 'aName'
	      , name      : 'aAsset'
	      , initiation: '2017-05-20T22:54:12.940Z'
	      , scope     : 'aFundAddress'
	      , equity    : 12
	    };

	let actual = flat(aJsonShareResponse);

	let expected = { identity    : 'aName'
			 , asset     : { name: 'aAsset' }
			 , initiation: new Date('2017-05-20T22:54:12.940Z')
			 , scope     : 'aFundAddress'
			 , equity    : fragment(12)
		       };

	expect(actual).toEqual(expected);
    })
});
