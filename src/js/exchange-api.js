export class ExchangeRate {  
  static getExchangeRate(currencyFrom) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currencyFrom}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}

export function getConversionRates(response,currencyTo,dollars) {
  const conversionRateCodes = Object.keys(response.conversion_rates);
  let output;
  conversionRateCodes.forEach(function(code) {
    if (currencyTo === code) {
      output = dollars * response.conversion_rates[code];
    }
  });
  return output;
}