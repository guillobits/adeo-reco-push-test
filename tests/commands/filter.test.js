const { filterElements } = require('../../src/commands/filter');
const { data } = require('../fixtures/data')

// Test de la fonction de filtrage
describe('filter command', () => {

  it('should return all countries when no pattern', () => {
    const pattern = '';
    const countResult = filterElements(data, pattern);

    expect(countResult.length).toBe(data.length);
  });

  it('shoud preserve order', () => {
    const pattern = 'ry';
    const filterResult = filterElements(data, pattern);

    // Handle countries
    filterResult.forEach((country, countryIdx) => {
      const dataCountryIdx = data.findIndex((dataCountry) => dataCountry.name === country.name);
      expect(countryIdx).toBeLessThanOrEqual(dataCountryIdx);

      // Handle peoples
      country.people.forEach((people, peopleIdx) => {
        const dataPeoples = data[dataCountryIdx].people;
        const dataPeopleIdx = dataPeoples.findIndex((dataPeople) => dataPeople.name === people.name);
        expect(peopleIdx).toBeLessThanOrEqual(dataPeopleIdx);

        // Handle animals
        people.animals.forEach((animal, animalIdx) => {
          const dataAnimals = data[dataCountryIdx].people[dataPeopleIdx].animals;
          const dataAnimalIdx = dataAnimals.findIndex((dataAnimal) => dataAnimal.name === animal.name);
          expect(animalIdx).toBeLessThanOrEqual(dataAnimalIdx);
        })
      })
    })
  });

  it('shoud return only animals with pattern', () => {
    const pattern = 'ry'
    const filterResult = filterElements(data, pattern);

    // Handle countries
    filterResult.forEach((country) => {
      country.people.forEach((person) => {
        person.animals.forEach((animal) => {
          expect(animal.name).toContain(pattern);
        })
      })
    })
  });

  it('should return empty for a non-existant pattern', () => {
    const pattern = 'welcome-adeo'
    const filterResult = filterElements(data, pattern);

    expect(filterResult).toBeInstanceOf(Array);
    expect(filterResult).toHaveLength(0);
  });

  it('shoud return only not empty array', () => {
    const pattern = 'ry'
    const filterResult = filterElements(data, pattern);

    // Handle countries
    filterResult.forEach((country) => {
      expect(country.people).toBeInstanceOf(Array);
      expect(country.people).not.toHaveLength(0);

      country.people.forEach((person) => {
        expect(person.animals).toBeInstanceOf(Array);
        expect(person.animals).not.toHaveLength(0);
      })
    })
  });

  it('should handle empty data', () => {
    const filterResult = filterElements([], '');
    expect(filterResult.length).toBe(0);
  });

});