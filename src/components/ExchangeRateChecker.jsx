import React, { useState, useEffect } from 'react';

const ExchangeRateChecker = () => {
    const [exchangeRates, setExchangeRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('HKD');
    const [targetCurrency, setTargetCurrency] = useState('JPY');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
                const data = await response.json();
                setExchangeRates(data.rates);
            } catch (error) {
                console.error('Error fetching exchange rates:', error);
            }
        };

        fetchExchangeRates();
    }, [baseCurrency]);

    useEffect(() => {
        if (exchangeRates[targetCurrency]) {
            setConvertedAmount((amount * exchangeRates[targetCurrency]).toFixed(2));
        }
    }, [amount, exchangeRates, targetCurrency]);

    return (
        <div>
            <h1>HKD to JPY Exchange Rate Checker</h1>
            <div>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                />
                <span> {baseCurrency} = {convertedAmount} {targetCurrency}</span>
            </div>
            <div>
                <p>Current Rate: 1 {baseCurrency} = {exchangeRates[targetCurrency]} {targetCurrency}</p>
            </div>
        </div>
    );
};

export default ExchangeRateChecker;