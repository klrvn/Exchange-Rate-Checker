import React, { useState, useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';

const ExchangeRateChecker = () => {
    const [exchangeRates, setExchangeRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('HKD');
    const [targetCurrency, setTargetCurrency] = useState('JPY');
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(0);

    const majorCurrencies = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'CNY', name: 'Chinese Yuan' },
        { code: 'HKD', name: 'Hong Kong Dollar' },
        { code: 'SGD', name: 'Singapore Dollar' }
    ];

    // Add currency to country code mapping
    const currencyToCountry = {
        'USD': 'US',
        'EUR': 'EU',
        'JPY': 'JP',
        'GBP': 'GB',
        'AUD': 'AU',
        'CAD': 'CA',
        'CHF': 'CH',
        'CNY': 'CN',
        'HKD': 'HK',
        'SGD': 'SG'
    };

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

    const handleBaseCurrencyChange = (e) => {
        setBaseCurrency(e.target.value);
    };

    const handleTargetCurrencyChange = (e) => {
        setTargetCurrency(e.target.value);
    };

    const handleSwapCurrencies = () => {
        const temp = baseCurrency;
        setBaseCurrency(targetCurrency);
        setTargetCurrency(temp);
    };

    return (
        <div>
            <h1>Currency Exchange Rate Checker</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <ReactCountryFlag
                        countryCode={currencyToCountry[baseCurrency]}
                        svg
                        style={{
                            width: '2em',
                            height: '2em',
                            marginBottom: '10px'
                        }}
                    />
                    <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
                        {majorCurrencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code} - {currency.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button 
                    onClick={handleSwapCurrencies}
                    style={{
                        margin: '0 10px',
                        padding: '5px 10px',
                        cursor: 'pointer'
                    }}
                >
                    ⇄
                </button>

                <div style={{ textAlign: 'center' }}>
                    <ReactCountryFlag
                        countryCode={currencyToCountry[targetCurrency]}
                        svg
                        style={{
                            width: '2em',
                            height: '2em',
                            marginBottom: '10px'
                        }}
                    />
                    <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
                        {majorCurrencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code} - {currency.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
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