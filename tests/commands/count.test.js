const { countElements } = require('../../src/commands/count');
const { data } = require('../fixtures/data')

const EXPECTED_COUNTERS = [
  [6, 8, 7, 9, 5],
  [7, 7, 5, 7, 6, 7, 7, 5],
  [8, 8, 8, 7, 8, 6, 8],
  [6, 7, 7, 8, 9, 6, 5],
  [7, 7, 5, 9, 6]
];
const NAME_COUNTER_REGEX = /(.+)\s\[(\d+)\]/;

// Test de la fonction de filtrage
describe('count command', () => {
  
  it('should return all countries', () => {
    const countResult = countElements(data);
 
    expect(countResult.length).toBe(EXPECTED_COUNTERS.length);
  });
  
  it('should generate correct country name counter', () => {
    const countResult = countElements(data);

    countResult.forEach((country, idx) => {
      const matchs = country.name.match(NAME_COUNTER_REGEX);
      const countryPeopleCounter = parseInt(matchs[2]);
      const expectedCounter = EXPECTED_COUNTERS[idx].length;
      expect(countryPeopleCounter).toBe(expectedCounter);
    })
  });

  it('should generate correct people name counter', () => {
    const countResult = countElements(data);

    countResult.forEach((country, countryIdx) => {
      country.people.forEach((person, peopleIdx) => {
        const matchs = person.name.match(NAME_COUNTER_REGEX);
        const peopleAnimalCounter = parseInt(matchs[2]);
        const expectedCounter = EXPECTED_COUNTERS[countryIdx][peopleIdx]
        expect(peopleAnimalCounter).toBe(expectedCounter);
      });
    })
  });

  it('shoud preserve order', () => {
    const countResult = countElements(data);

    countResult.forEach((country, countryIdx) => {
      const matchs = country.name.match(NAME_COUNTER_REGEX);
      const countryName = matchs[1];
      const expectedCountryName = data[countryIdx].name;
      expect(countryName).toBe(expectedCountryName);

      country.people.forEach((person, personIdx) => {
        const matchs = person.name.match(NAME_COUNTER_REGEX);
        const expectedPersonName = data[countryIdx].people[personIdx].name;
        const personName = matchs[1];
        expect(personName).toBe(expectedPersonName);
      })
    })
  })

  it('should handle empty data', () => {
    const countResult = countElements([]);
    expect(countResult.length).toBe(0);
  });

});