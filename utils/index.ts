import { CarProps, FilterProps, RentalOptions } from '../types';

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const headers = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY || '',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  try {
    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
      {
        headers: headers,
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, year, model } = car;
  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('modelYear', year.toString());
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
};

const rentalOptions: RentalOptions = {
  baseRate: 100,
  mpgFactor: 2,
  classFactor: {
    'subcompact car': 100,
    'two seater': 100,
    sedan: 15,
    'small sport utility vehicle': 50,
  },
  ageFactor: (currentYear, carYear) => 0.9 ** (currentYear - carYear),
};

export const calculateCarRent = (car: CarProps, options = rentalOptions) => {
  const { city_mpg, class: carClass, year } = car;
  const { baseRate, mpgFactor, classFactor, ageFactor } = options;

  const mpgEffect = city_mpg * mpgFactor;
  const classEffect = classFactor[carClass] || 1;
  const ageEffect = ageFactor(new Date().getFullYear(), year);

  const rentalCost = baseRate + mpgEffect + classEffect + ageEffect;

  return rentalCost.toFixed(0);
};

export function convertUSDtoPLN(amountInUSD: number) {
  const exchangeRateUSDToPLN = 3.8;

  const amountInPLN = amountInUSD * exchangeRateUSDToPLN;
  return amountInPLN.toFixed(0);
}

export function convertMPGtoLPer100KM(mpg: number) {
  const milesToKilometers = 1.60934;
  const gallonsToLiters = 3.78541;

  const lPerKm = (100 * gallonsToLiters) / (mpg * milesToKilometers);
  return lPerKm.toFixed(1);
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
