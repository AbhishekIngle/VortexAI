import { useState, useEffect } from 'react';

export const useCountryCodes = () => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const cached = localStorage.getItem('countries');
    if (cached) {
      setCountries(JSON.parse(cached));
      return;
    }
    fetch('https://restcountries.com/v3.1/all?fields=name,idd')
      .then((res) => res.json())
      .then((data) => {
        const formatted = data
          .map((c) => ({
            name: c.name.common,
            code: c.idd.root + (c.idd.suffixes?.[0] || ''),
          }))
          .filter((c) => c.code);
        setCountries(formatted);
        localStorage.setItem('countries', JSON.stringify(formatted));
      })
      .catch(() => {});
  }, []);
  return countries;
};