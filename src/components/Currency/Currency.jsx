import React from "react";
import PropTypes from "prop-types";
import "./Currency.css"

function Currency(props) {
  return (
    <div className="currency-container">
      <input
        type="number"
        value={props.amount}
        onChange={(e) => props.onAmountChange(parseFloat(e.target.value))}
      />
      <div className="currency-select-container">
        <select
          value={props.currency}
          onChange={(e) => props.onCurrencyChange(e.target.value)}
        >
          {props.currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

Currency.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array.isRequired,
  onAmountChange: PropTypes.func.isRequired,
  onCurrencyChange: PropTypes.func.isRequired,
};

export default Currency;
