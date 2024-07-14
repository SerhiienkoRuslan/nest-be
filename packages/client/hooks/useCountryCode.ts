import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCountryCode = () => {
  const [countryCode, setCountryCode] = useState<string>('');

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/');
        setCountryCode(response.data.country_code.toLowerCase());
      } catch (error) {
        console.error('Error fetching country code:', error);
      }
    };

    fetchCountryCode();
  }, []);

  return countryCode;
};
