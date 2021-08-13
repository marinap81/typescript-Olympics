import { Sports } from './Sports.enum';
import { Medals } from './Medals.enum';

export interface IResult {
  /*cannot initialize anything from an interface, only stores properties and methods, no constructor*/

  sport: Sports;
  medal: Medals;
}

// Seee the constructor, all it does it add on sport and medel. get it? no not yet, just only creates a single result. ok- so stored like an array. yeah, just one result only.

export class Result implements IResult {
  // implements IResult {
  sport: Sports;
  medal: Medals;

  constructor(sport: Sports, medal: Medals) {
    this.sport = sport;
    this.medal = medal;
  }
}

/* class MedalsTally implements IResult implements ......{ a class can implement multiple interfaces
  in this case the class needs a constructor*/
