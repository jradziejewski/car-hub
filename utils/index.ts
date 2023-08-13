export async function fetchCars() {
  const headers = {
    'X-RapidAPI-Key': '8343b84e5amsh3f340de8df14793p148af5jsn060c36dba1b1',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  };

  const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla';

  const response = await fetch(url, { headers: headers });

  const result = await response.json();

  return result;
}

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
