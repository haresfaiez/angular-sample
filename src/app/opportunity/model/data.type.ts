// Multichain
type Address = string;
export type Name = string;

// Uri
export const UriLabel     = 'opportunity';
export const FundUriLabel = 'fund';
export type Uri     = { fund: string; opportunity: string };
export type FlatUri = { opportunity: string };

export type Notification        = { matter: string };
export const OpportunityCreated = { matter: 'The opporutnity was created' };
// Error
export type Error = { reason?: string; cause: string; };
export const OpportunityDoesNotExists =
    { cause: 'NonExistingOpportunity'}
export const OpportunityAlreadyExists =
    { reason: 'Opportunity already exists', cause: 'OpportunityAlreadyExists'}

// Raw
type RawIdentity = { fund: string; };
type RawAsset    = { name: string; };

export type Raw  = RawIdentity & RawAsset & FlatDescription;

export type Response = { scope: string; } & RawAsset;
export type Identity = RawAsset;

// Flat
export type FlatDescription =
    { creationDate      : string;
      closingProbability: string;
      minimumValue      : string;
      maximumValue      : string;
      origin            : Address;
      status            : string;
      domain            : string;
    };

export type Flat =
    { identity          : { name: string; fund: string; };
      asset             : { origin: Address; domain: string; };
      value             : { min: Number; max: Number; };
      creationDate      : Date;
      closingProbability: Number;
      status            : string;
    }

export const name = (anOpportunity: Flat): Name => {
    return anOpportunity.identity.name;
}

// Stale
type Description  = { };
export type Stale = { name: string; fund: string; } & Description;
export const NullStale = { name: '', fund: '' };

export const aGuid = () => (Math.random() * 1000000).toFixed();

export const opportunityDescription = (input?: Stale) => { return { }; }

export const flat = (aResponse: Raw, aFund: Address) => {
    return { identity           : { name: aResponse.name, fund: aFund }
	     , asset             : { origin: aResponse.origin, domain: aResponse.domain }
	     , value             : { min  : new Number(aResponse.minimumValue)
				     , max: new Number(aResponse.maximumValue) }
	     , creationDate      : new Date(aResponse.creationDate)
	     , closingProbability: new Number(aResponse.closingProbability)
	     , status            : status(aResponse)
	   };
};

const OPPORTUNITY_STATUS =
    [ 'Contacted', 'InitialDesire', 'DueDiligence', 'ApprovedInitially' ];

export const split = (input: Raw[]): Split => {
    let is = (status: string) => (each: Raw) => each.status === status;

    return { contacted          : input.filter(is('Contacted'))
	     , dueDiligence     : input.filter(is('DueDiligence'))
	     , initialDesire    : input.filter(is('InitialDesire'))
	     , approvedInitially: input.filter(is('ApprovedInitially'))
	   };
}

export type Split =
    { contacted        : Raw[];
      dueDiligence     : Raw[];
      initialDesire    : Raw[];
      approvedInitially: Raw[];
    };

export const NullSplit: Split =
    { contacted          : []
      , dueDiligence     : []
      , initialDesire    : []
      , approvedInitially: []
    };

export const status = (input: { status: string }): string => {
    let nullStatus = '';
    let code       = new Number(input.status);
    return OPPORTUNITY_STATUS[code.toFixed()] || nullStatus;
}

// Update
export type Update =
    { action              : string
      , closingProbability: number
      , minimumValue      : number
      , maximumValue      : number }
