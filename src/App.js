import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import CurrencyInput from './components/CurrencyInput/CurrencyInput';
import Header from './components/Header/Header';

function App() {
	const [amount1, setAmount1] = useState(1)
	const [amount2, setAmount2] = useState(1)
	const [currency1, setCurrency1] = useState('USD')
	const [currency2, setCurrency2] = useState('EUR')
	const [rates, setRates] = useState([])

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
		if (!!rates) {
			function init() {
				handleAmount1Change(1);
			}
			init();
		}
	}, [rates]);


	async function getData() {
		try {
			const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');

			const obj = { UAH: 1 }
			
			response.data.map((item) => obj[item.cc] = item.rate)

			setRates(obj)	

		} catch (error) {
			console.error(error);
		}
	}
  



	function format(number) {
		return number.toFixed(4);
	}

	function handleAmount1Change(amount1) {
		if (currency1 === 'UAH') {
			setAmount1(amount1);
			setAmount2(format(amount1 / rates[currency2]))
		} else if (currency2 === 'UAH') { 
			setAmount2(format(amount1 * rates[currency1]));
			setAmount1(amount1)

		}else{
			setAmount2(format(amount1 * rates[currency1] / rates[currency2]));
			setAmount1(amount1);
		}	
  	}

  	function handleCurrency1Change(currency1) {
		if (currency2 === 'UAH') {
			setAmount2(format(amount1 * rates[currency1]))
			setCurrency1(currency1);
		} else { 
			setAmount2(format(amount1 * rates[currency1] / rates[currency2]));
			setCurrency1(currency1);
		}
  	}

	function handleAmount2Change(amount2) {
		if (currency2 === 'UAH' ) {
			setAmount2(amount2);
			setAmount1(format(amount2 / rates[currency1]))
		}else if (currency1 === 'UAH') { 
			setAmount1(format(amount2 * rates[currency2]));
			setAmount2(amount2)

		} else {
			setAmount1(format(amount2 * rates[currency2] / rates[currency1]));
			setAmount2(amount2);
		}
		
	}

	function handleCurrency2Change(currency2) {
		if (currency1 === 'UAH') {
			setAmount1(format(amount2 * rates[currency2]))
			setCurrency2(currency2);

		} else {
			setAmount1(format(amount2 * rates[currency2] / rates[currency1]));
			setCurrency2(currency2);
		}
		
	}
  


	return (
		<div className="App">
		<Header/>
		<CurrencyInput 
			onAmountChange={handleAmount1Change}
			onCurrencyChange={handleCurrency1Change}
			currencies={Object.keys(rates)}
			amount={amount1}
			currency={currency1} />
		<CurrencyInput
			onAmountChange={handleAmount2Change}
			onCurrencyChange={handleCurrency2Change}
			currencies={Object.keys(rates)}
			amount={amount2}
			currency={currency2} />
		</div>
	);
}

export default App;
