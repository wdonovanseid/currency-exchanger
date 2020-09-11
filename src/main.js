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
      if (exchangeAPI.result === "error") {
        $("#output").text(`There was an error processing your request: ${exchangeAPI['error-type']}`);
      } else {
        const newDollars = getConversionRates(exchangeAPI,currencyTo,dollars);
        $("#output").text(`${dollars} ${currencyFrom} is ${newDollars} ${currencyTo}`);
      }
    }, function (error) {
      $(`#output`).text(`There was an error processing your request: ${error}`);
    });

    let field = $().val();
    if (sessionStorage.getItem("autosave")) {
      field.value = sessionStorage.getItem("");
    }

    field.addEventListener("change", function() {
      sessionStorage.setItem("autosave", field.value);
    })
  });
});