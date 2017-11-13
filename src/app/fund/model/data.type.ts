// Multichain
type Address = string;

// Uri
export const UriLabel = 'name';
export type Uri       = { name: string; };
export const identity = (aUriParam: Uri) => {
    return { address: aUriParam[ UriLabel ] }
};

export type Identity = { address: string }

export const aGuid   = () => (Math.random() * 1000000).toFixed();

// Error
export type Error              = { cause: string; };
export const FundDoesNotExists = { cause: 'NonExistingFund'}

// Notification
export type Notification         = { matter: string };
export const FundCreationSuccess = { matter: 'FundCreationSuccess' };
