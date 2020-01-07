import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PubSubService {
    private subjects: Subject<any>[] = [];

    publish(eventName: string) {
        // ensure a subject for the event name exists
        this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();

        // publish event
        this.subjects[eventName].next();
      //  console.log('publicado(servicio)')
    }

    on(eventName: string): Observable<any> {
        // ensure a subject for the event name exists
        this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
        //console.log('leido (servicio)')
        // return observable 
        return this.subjects[eventName].asObservable();

    }
}