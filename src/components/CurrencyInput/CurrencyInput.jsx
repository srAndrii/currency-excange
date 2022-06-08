import './currencyInput.css';

const CurrencyInput = (props) => {
  	return (
		<div className="group">
				
			<input type="number" value={props.amount} onChange={ev => props.onAmountChange(ev.target.value)} />
			
			<select value={props.currency} onChange={ev => props.onCurrencyChange(ev.target.value)}>
				{props.currencies.map((currency => (
					<option key={currency} value={currency}>{currency}</option>
				)))}
			</select>
		</div>
  )
}


export default CurrencyInput
