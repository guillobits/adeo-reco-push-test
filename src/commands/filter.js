const { data } = require('../../data');

const paramRequired = () => {
  console.error('Please provide a pattern to --filter command\n');
  console.error('Usage: node app.js --filter=<pattern>');
}

const filterElements = (data, pattern) => {
  // Filter not empty countries
  return data.reduce((filteredCountries, country) => {

    // Filter not empty people
    const filteredPeople = country.people.reduce((filteredPeople, person) => {

      // Filter animal with given pattern
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
    paramRequired();
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