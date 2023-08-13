import { CarProps, FilterProps } from '../types';

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

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalPerDay = basePricePerDay + mileageRate + ageRate;

  return rentalPerDay.toFixed(0);
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
