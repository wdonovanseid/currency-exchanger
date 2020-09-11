import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {ExchangeRate} from './js/exchange-api.js';

function clearFields() {
  $(`#amount`).val("");
  $(`#currency-from`).val("");
  $(`#currency-to`).val("");
}

$(document).ready(function() {
  $("form#exchange").submit(function(event) {
    event.preventDefault();
    const dollars = parseInt($(`#amount`).val());
    const currencyFrom = $(`#currency-from`).val();
    const currencyTo = $(`#currency-to`).val();
    clearFields();

    let promise = ExchangeRate.getExchangeRate(currencyFrom)
    promise.then(function(response) {
      const body = JSON.parse(response);
      
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });

    let request = new XMLHttpRequest();
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currencyFrom}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getConversionRates(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getConversionRates(response) {
      console.log(response.conversion_rates.ASDFDSD)
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
      $("#output").text(`${dollars} ${currencyFrom} is ${output} ${currencyTo}`);
    }
  });
});