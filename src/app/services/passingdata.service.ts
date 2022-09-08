import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassingdataService {
  @Output() Data: EventEmitter<string> = new EventEmitter();
  constructor() { }
}
