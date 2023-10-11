const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const currency_one = currencyEl_one.value || "USD";
  const currency_two = currencyEl_two.value || "EUR";
  fetch(
    `https://v6.exchangerate-api.com/v6/5da0b85a0719a128b245de45/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      //  console.log(data);
      const rate =
        data.conversion_rates[currency_two] /
        data.conversion_rates[currency_one];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

function populateCurrencyOptions() {
  // Fetch the currency options from the API
  fetch(
    "https://v6.exchangerate-api.com/v6/5da0b85a0719a128b245de45/latest/USD"
  )
    .then((res) => res.json())
    .then((data) => {
      let currencies = [...Object.keys(data.conversion_rates)];
      console.log(currencies);

      // Populate currency options for both select elements
      currencies.forEach((currency) => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        currencyEl_one.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        currencyEl_two.appendChild(option2);
      });
    })
    .catch((error) => console.error("Error fetching currency options:", error));
}

// Event Listener
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
populateCurrencyOptions();
