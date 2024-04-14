const filter = (data, pattern) => {
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

module.exports = {
  filter
}