import { Result } from './IResult';
import { Medals } from './Medals.enum';

export class Country {
  // TODO: Country requires a name attribute and a results attribute.
  // name is a string, results is an array of Result
  name: string;
  results: Array<Result> = [];

  // TODO: receives a name and initialises the results array to an empty array
  constructor(name: string) {
    this.name = name;
  }

  addResult(result: Result) {
    this.results.push(result);
  }

  // return the total number of medals
  totalMedals(): number {
    return this.results.length;
  }

  // given a medal type, return the amount of that type of medal
  totalMedalType(medal: Medals): number {
    let total = 0;
    for (let r in this.results) {
      //console.log(this.results[r]);
      if (this.results[r].medal == medal) {
        ++total;
      }
    }

    return total;
  }
}
