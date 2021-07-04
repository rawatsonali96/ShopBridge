import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  displayModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  setModal(flag: boolean) {
    this.displayModal.next(flag);
  }

  getModal() {
    return this.displayModal;
  }
}
