import { useEffect, useState } from "react"
import axios from 'axios';
import './Header.css'



const Header = () => {
    const [rates, setRates] = useState([])
      
    useEffect(() => {
      	getData()
    }, [])
  


  	async function getData() {
      	try {
			const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
			const obj= {}
			response.data.map((item) => {
				return obj[item.cc] = item.rate

			})	
        	setRates(obj)
        
      	} catch (error) {
        	console.error(error);
      	}	
  	}
    return (
        <header>
            <ul className="header">
                <li> USD = {rates.USD } ₴</li>
                <li>EUR = {rates.EUR } ₴</li>
            </ul>
        </header>
    )
}

export default Header
