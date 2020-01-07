import { IPerson } from './person.interface';

export class Person implements IPerson {
    // id,firstname,lastname,age,street,city,state,zip,date
    constructor(public id: number,
                public firstName: string,
                public lastName: string,
                public age: number,
                public street: string,
                public city: string,
                public state: string,
                public zip: string,
                public date: Date) {};
}
