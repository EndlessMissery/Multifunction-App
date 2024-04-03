import React, { useState, useEffect } from "react";
import axios from "axios";
import Currency from "./Currency";

function CurrencyConverter() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('EUR');
  const [currency2, setCurrency2] = useState('CZK');
  const [rates, setRates] = useState();

  useEffect(() => {
    axios.get('https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_IdicKSOFNhaRHIoqkR8Uzyo4oilgI1RHaEYxbWA9')
    .then(response => {
      setRates(response.data.data);
      // Set initial amounts based on default exchange rates
      if (response.data.data) {
        const rate1 = response.data.data[currency2] / response.data.data[currency1];
        const rate2 = response.data.data[currency1] / response.data.data[currency2];
        setAmount1(1);
        setAmount2(rate1);
      }
    })
    .catch(error => {
      console.error("Error fetching exchange rates:", error);
    });
  }, [currency1, currency2]);

  const format = (number) => {
    return number.toFixed(2);
  };

  function handleAmount1Change(amount1) {
    if (!rates) return;
    const newAmount2 = amount1 * (rates[currency2] / rates[currency1]);
    setAmount1(amount1);
    setAmount2(newAmount2);
  }

  function handleAmount2Change(amount2) {
    if (!rates) return;
    const newAmount1 = amount2 * (rates[currency1] / rates[currency2]);
    setAmount2(amount2);
    setAmount1(newAmount1);
  }

  function handleCurrency1Change(newCurrency1) {
    if (!rates) return;
    const newAmount2 = amount1 * (rates[newCurrency1] / rates[currency1]);
    setCurrency1(newCurrency1);
    setAmount2(newAmount2);
  }

  function handleCurrency2Change(newCurrency2) {
    if (!rates) return;
    const newAmount1 = amount2 * (rates[newCurrency2] / rates[currency2]);
    setCurrency2(newCurrency2);
    setAmount1(newAmount1);
  }

  if (!rates) {
    return <div className="Loading-converter"></div>;
  }

  return (
    <div className="currency-container-wrapper">
        <h1 className="curr-conv-h1">Currency Converter</h1>
      <Currency
        amount={format(amount1)}
        currency={currency1}
        currencies={Object.keys(rates)}
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
      />
      <Currency
        amount={format(amount2)}
        currency={currency2}
        currencies={Object.keys(rates)}
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
      />
    </div>
  );
}

export default CurrencyConverter;
