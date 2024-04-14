const count = (data) => {
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

module.exports = {
  count
}