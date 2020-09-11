export class ExchangeRate {  
  static getExchangeRate(currencyFrom) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currencyFrom}`;      request.onload = function() {
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
  let output;
  switch (currencyTo) {
  case "USD":
    output = dollars * response.conversion_rates.USD;
    break;
  case "AUD":
    output = dollars * response.conversion_rates.AUD;
    break;
  case "BGN":
    output = dollars * response.conversion_rates.BGN;
    break;
  case "CAD":
    output = dollars * response.conversion_rates.CAD;
    break;
  case "CHF":
    output = dollars * response.conversion_rates.CHF;
    break;
  case "CNY":
    output = dollars * response.conversion_rates.CNY;
    break;
  case "EGP":
    output = dollars * response.conversion_rates.EGP;
    break;
  case "EUR":
    output = dollars * response.conversion_rates.EUR;
  }
  return output;
}