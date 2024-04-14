const { data } = require('../../data');

/**
 * Formats the number of people and animals within each country in the data
 * @param Array data - An array of objects representing countries, people, and animals.
 * @returns {Array} - A formatted array with updated counts for people and animals.
 */
const countElements = (data) => {
  return data.reduce((formattedCountries, country) => {
    
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