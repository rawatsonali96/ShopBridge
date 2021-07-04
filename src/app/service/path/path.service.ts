import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  current: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() { }

  setCurrentPage(page: string){
    this.current.next(page);
  }

  getCurrentPage()
  {
    return this.current;
  }
}
