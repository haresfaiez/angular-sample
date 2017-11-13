export const aFlatDueDiligence = (scope: string) => {
    return { identity           : { name: 'aName', fund: scope }
	     , asset             : { origin: '', domain: 'OPPORTUNITY' }
	     , value             : { min: 0, max: 0 }
	     , creationDate      : new Date('2017-06-03T23:00:00.000Z')
	     , closingProbability: 0
	     , status            : 'DueDiligence'
	   };
}

export const aDueDiligence = () => {
    return { name               : 'aName'
	     , identity          : ''
	     , creationDate      : '2017-06-03T23:00:00.000Z'
	     , closingProbability: ''
	     , minimumValue      : ''
	     , maximumValue      : ''
	     , origin            : ''
	     , status            : '2'
	     , domain            : 'OPPORTUNITY'
	   };
}

export const aFlat = (aScope: string) => {
    return { identity            : { name: 'aName', fund: aScope }
	     , asset             : { origin: '', domain: 'OPPORTUNITY' }
	     , value             : { min: 0, max: 0 }
	     , creationDate      : new Date('2017-06-03T23:00:00.000Z')
	     , closingProbability: 0
	     , status            : 'Contacted'
	   };
}

export const aFlatContacted = (scope: string) => {
    return { identity            : { name: 'aName', fund: scope }
	     , asset             : { origin: '', domain: 'OPPORTUNITY' }
	     , value             : { min: 0, max: 0 }
	     , creationDate      : new Date('2017-06-03T23:00:00.000Z')
	     , closingProbability: 0
	     , status            : 'Contacted'
	   };
}

export const aContacted = () => {
    return { name: 'aName'
	     , identity: ''
	     , creationDate: '2017-06-03T23:00:00.000Z'
	     , closingProbability: ''
	     , minimumValue      : ''
	     , maximumValue      : ''
	     , origin            : ''
	     , status            : '0'
	     , domain            : 'OPPORTUNITY'
	   };
}
