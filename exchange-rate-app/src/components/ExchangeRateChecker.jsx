import React, { useState, useEffect } from 'react';

const ExchangeRateChecker = () => {
    const [exchangeRates, setExchangeRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [targetCurrency, setTargetCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
            const data = await response.json();
            setExchangeRates(data.rates);
        };

        fetchExchangeRates();
    }, [baseCurrency]);

    useEffect(() => {
        if (exchangeRates[targetCurrency]) {
            setConvertedAmount((amount * exchangeRates[targetCurrency]).toFixed(2));
        }
    }, [amount, exchangeRates, targetCurrency]);

    const handleBaseCurrencyChange = (e) => {
        setBaseCurrency(e.target.value);
    };

    const handleTargetCurrencyChange = (e) => {
        setTargetCurrency(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    return (
        <div>
            <h1>Exchange Rate Checker</h1>
            <div>
                <input type="number" value={amount} onChange={handleAmountChange} />
                <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
                    {Object.keys(exchangeRates).map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
                <span> to </span>
                <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
                    {Object.keys(exchangeRates).map((currency) => (
                        <option key={currency} value={currency}>{currency}</option>
                    ))}
                </select>
            </div>
            <h2>
                {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
            </h2>
        </div>
    );
};

export default ExchangeRateChecker;