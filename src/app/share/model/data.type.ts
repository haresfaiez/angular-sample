// Multichain
type Address     = string;
export type Name        = string;
type Fund        = Address;
export type Distributor = Address;

// Uri
export type  Uri      = { name: Name, owner: Distributor };
export const UriLabel = { name: 'name', owner: 'owner' };

export const name  = (input: Uri | Raw) => input.name;
export const owner = (input: Uri) => input.owner;

// Raw
type RawDescription = { equity: number; scope: Fund; initiation: RawDate; };
type RawIdentity    = { identity: Address };
type RawDate        = string;
type RawAsset       = { name: Name; };
export type Raw     = RawIdentity & RawAsset & RawDescription;

export const flat = (input: Raw): Flat => {
    const identity = (aRawInput: RawIdentity): Address => aRawInput.identity

    let result: Flat = { identity     : identity(input)
			 , asset      : { name: input.name }
			 , initiation : new Date(input.initiation)
			 , scope      : input.scope
			 , equity     : fragment(input.equity)
		       };
    return result;
}

type  Fragment = { percentage: number };
export const fragment = (percentage: number): Fragment =>
    { return { percentage: percentage }; }

export type Description = { scope: Fund; equity: Fragment };

// Flat
type Journal     = { initiation: Date };
export type Identity = { asset : { name: Name; }; identity: Address; };
export type Flat     = Identity & Journal & Description;
export const description = (input: Flat ): Journal & Description => {
    return { initiation: input.initiation
	     , scope   : input.scope
	     , equity  : input.equity
	   }
}
export const identity = (input: Flat): Identity => {
    return { identity: input.identity, asset: input.asset }
}

// Stale
export type Stale  = { name: Name; owner: Address} & Description;
export const stale = (aShare: Raw, anOwner: Distributor): Stale => {
    const identity = (anInput: RawIdentity): Address => anInput.identity

    return { name     : aShare.name
	     , owner  : anOwner
	     , scope  : aShare.scope
	     , equity : fragment(aShare.equity)
	   };
}

export const scope  = (aShare: Stale): Fund => aShare.scope
export const percentage = (aShare: Stale): number => aShare.equity.percentage

// Error
export type Error           = { reason: string; cause?: string; };
export const CreationForbid = { reason: 'CreationForbidden' };

// Notification
export type Notification     = { matter: string };
export const CreationSuccess = { matter: 'CreationSuccess' };

// Factory
export type  Factory        = { nature : string; };
export const DefaultFactory = { nature: 'simple' };
export const isFactory      = ( aPotential: Flat | Factory ): aPotential is Factory =>
    (<Factory>aPotential).nature !== undefined

// Share grant request
type GrantCommand = { name: string; owner: string; equity: string, whole: string };

export const grantCommand = (aShare: Stale): GrantCommand => {
    return { name: name(aShare)
	     , owner: owner(aShare)
	     , equity: aShare.equity.percentage.toString()
	     , whole: scope(aShare)
	   }
}
