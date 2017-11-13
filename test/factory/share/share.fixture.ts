import { ShareContainer } from 'app/share/share.container';
import { Stale, Identity, Flat, Uri, Raw, Name } from 'app/share/model/data.type';

export const aUri = (): Uri  => { return { name: 'abcd', owner: 'anOwnerAddress' } };
export const aUriWithName = (aName: Name): Uri  =>
    { return { name: aName, owner: 'anOwnerAddress' } };

export const flatIdentified = (anIdentity: Identity): Flat => {
    return { identity    : anIdentity.identity
	     , asset     : anIdentity.asset
	     , initiation: new Date()
	     , scope     : 'a Fund'
	     , equity    : { percentage: 90 }
	   };
}

export const aRawShare = (): Raw => {
    return { identity: '0x122'
	     , name  : 'sharecoin0x123'
	     , equity: 0
	     , scope : ''
	     , initiation: '2017-05-20T22:54:12.940Z' };
}

export const aShare = (): Stale => {
    return { name        : 'anAssetName'
	     , owner     : 'aDistributorAddress'
	     , scope     : 'aFundAddress'
	     , equity    : { percentage: 20 }
	   }
}

export const nullContainer = () => {
    let result          = new ShareContainer()
    result.error        = []
    result.subject      = null
    result.notification = []
    result.input        = {}
    return result
}
