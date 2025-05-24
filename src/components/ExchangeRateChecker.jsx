import React, { useState, useEffect } from 'react';

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

    const getFlagImage = (currencyCode) => {
        return `/images/flags/${currencyCode}.png`;
    };

    return (
        <div>
            <h1>Currency Exchange Rate Checker</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img 
                        src={getFlagImage(baseCurrency)} 
                        alt={`${baseCurrency} flag`}
                        style={{ 
                            height: '30px', 
                            objectFit: 'contain',
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
                        cursor: 'pointer',
                        alignSelf: 'flex-end'
                    }}
                >
                    ⇄
                </button>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img 
                        src={getFlagImage(targetCurrency)} 
                        alt={`${targetCurrency} flag`}
                        style={{ 
                            height: '30px', 
                            objectFit: 'contain',
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

            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                marginTop: '20px',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        style={{
                            padding: '5px',
                            width: '100px'
                        }}
                    />
                    <span> {baseCurrency} = {convertedAmount} {targetCurrency}</span>
                </div>
                <div>
                    <p>Current Rate: 1 {baseCurrency} = {exchangeRates[targetCurrency]} {targetCurrency}</p>
                </div>
            </div>
        </div>
    );
};

export default ExchangeRateChecker;