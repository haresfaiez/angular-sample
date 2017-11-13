import { Pipe, PipeTransform } from '@angular/core';

import { IdentityService } from 'app/identity/identity.service'

@Pipe({
  name: 'participantName'
})
export class ParticipantNamePipe implements PipeTransform {
  constructor(private service: IdentityService) { }

  transform(identity: string): Promise<string> {
    return this.service.fetch().then((it: any) => it.name );
  }
}
