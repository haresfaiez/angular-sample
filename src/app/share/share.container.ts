import { Flat, Factory, Notification, Error } from 'app/share/model/data.type';

export class ShareContainer {
    subject     : Flat | Factory;
    notification: Notification[];
    error       : Error[];
    input?      : any;

    constructor() { }
}
