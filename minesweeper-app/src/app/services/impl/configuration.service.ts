import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private level: string;

  constructor() {
    this.level = 'easy';
   }

  public changeLevel(newLevel: string) {
    this.level = newLevel;
  }

  public timeDuration(): number {

    switch (this.level) {
      case 'easy':
        return environment.timeEasy;
      case 'medium':
        return environment.timeMedium;
      case 'advance':
        return environment.timeAdvance;
    }
  }

  public lengthBoard(): number {
    switch (this.level) {
      case 'easy':
        return environment.boardLengthEasy;
      case 'medium':
        return environment.boardLengthMedium;
      case 'advance':
        return environment.boardLengthAdvance;
    }
  }

  public numberOfMines(): number {
    switch (this.level) {
      case 'easy':
        return environment.numberOfMinesEasy;
      case 'medium':
        return environment.numberOfMinesMedium;
      case 'advance':
        return environment.numberOfMinesAdvance;
    }
  }
}
