const { data } = require('../../data');

const countElements = (data) => {
  // Count people in country
  return data.reduce((formattedCountries, country) => {
    
    // Count animals in people
    const formattedPeople = country.people.reduce((formattedPeople, person) => {
      formattedPeople.push({
        ...person,
        name: `${person.name} [${person.animals.length}]`
      });
      return formattedPeople;
    }, []);

    formattedCountries.push({
      ...country,
      name: `${country.name} [${formattedPeople.length}]`,
      people: formattedPeople
    });
    
    return formattedCountries;
  }, []);
}

const countCommand = () => {
  const output = countElements(data);
  console.log(JSON.stringify(output, null, 2));
}

module.exports = {
  countCommand,
  countElements
}