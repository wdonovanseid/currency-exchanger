import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $("form#exchange").submit(function(event) {
    event.preventDefault();
    const dollar = parseInt($(`#amount`).val());
    const currencyFrom = $(`#currency-from`).val();
    const currencyTo = $(`#currency-to`).val();

    let request = new XMLHttpRequest();
    const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${currencyFrom}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      let output;
      switch (currencyTo) {
        case "USD":
          output = dollar * response.conversion_rates.USD;
          break;
        case "AUD":
          output = dollar * response.conversion_rates.AUD;
          break;
        case "BGN":
          output = dollar * response.conversion_rates.BGN;
          break;
        case "CAD":
          output = dollar * response.conversion_rates.CAD;
          break;
        case "CHF":
          output = dollar * response.conversion_rates.CHF;
          break;
        case "CNY":
          output = dollar * response.conversion_rates.CNY;
          break;
        case "EGP":
          output = dollar * response.conversion_rates.EGP;
          break;
        case "EUR":
          output = dollar * response.conversion_rates.EUR;
      }
      $("#output").text(`${output}`);
    }
  });
});