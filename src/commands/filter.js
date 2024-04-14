const { data } = require('../../data');

const paramRequiredError = () => {
  console.error('Please provide a pattern to --filter command\n');
  console.error('Usage: node app.js --filter=<pattern>');
}

/**
 * This function filters elements based on a given pattern.
 * 
 * @param { Array } data - An array of objects representing countries, people, and animals.
 * @param { String } pattern - The pattern to filter by.
 * @returns { Array } - A filtered array containing countries, people, and animals based on the provided pattern.
 */
const filterElements = (data, pattern) => {
  return data.reduce((filteredCountries, country) => {
    const filteredPeople = country.people.reduce((filteredPeople, person) => {

      const filteredAnimals = person.animals.filter(animal =>
        animal.name.toLowerCase().includes(pattern.toLowerCase())
      );
      
      if (filteredAnimals.length > 0) {
        filteredPeople.push({ ...person, animals: filteredAnimals });
      }
      return filteredPeople;
    }, []);

    if (filteredPeople.length > 0) {
      filteredCountries.push({ ...country, people: filteredPeople });
    }
    
    return filteredCountries;
  }, []);
}

const filterCommand = (args) => {
  if (args.length <= 0) {
    paramRequiredError();
  }
  else {
    const filteredElements = filterElements(data, args[0]);
    console.log(JSON.stringify(filteredElements, null, 2));
  }
}

module.exports = {
  filterCommand,
  filterElements
}