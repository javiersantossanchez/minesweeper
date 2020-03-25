import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  lengthBoard() {
    return environment.boardLength;
  }

  numberOfMines() {
    return environment.numberOfMines;
  }
}
