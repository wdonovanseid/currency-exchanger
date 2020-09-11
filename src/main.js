import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {ExchangeRate} from './js/exchange-api.js';
import {getConversionRates} from './js/exchange-api.js';

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

    let promise = ExchangeRate.getExchangeRate(currencyFrom);
    promise.then(function(response) {
      const exchangeAPI = JSON.parse(response);
      const output = getConversionRates(exchangeAPI,currencyTo,dollars);
      $("#output").text(`${dollars} ${currencyFrom} is ${output} ${currencyTo}`);
    }, function (error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});