import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/getUserID";
import { useCookies } from "react-cookie";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const CreateItem = () => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);

    const currency_list = [
        { name: "US Dollar", code: "USD" },
        { name: "Afghan Afghani", code: "AFA" },
        { name: "Albanian Lek", code: "ALL" },
        { name: "Algerian Dinar", code: "DZD" },
        { name: "Angolan Kwanza", code: "AOA" },
        { name: "Argentine Peso", code: "ARS" },
        { name: "Armenian Dram", code: "AMD" },
        { name: "Aruban Florin", code: "AWG" },
        { name: "Australian Dollar", code: "AUD" },
        { name: "Azerbaijani Manat", code: "AZN" },
        { name: "Bahamian Dollar", code: "BSD" },
        { name: "Bahraini Dinar", code: "BHD" },
        { name: "Bangladeshi Taka", code: "BDT" },
        { name: "Barbadian Dollar", code: "BBD" },
        { name: "Belarusian Ruble", code: "BYR" },
        { name: "Belgian Franc", code: "BEF" },
        { name: "Belize Dollar", code: "BZD" },
        { name: "Bermudan Dollar", code: "BMD" },
        { name: "Bhutanese Ngultrum", code: "BTN" },
        { name: "Bitcoin", code: "BTC" },
        { name: "Bolivian Boliviano", code: "BOB" },
        { name: "Bosnia-Herzegovina Convertible Mark", code: "BAM" },
        { name: "Botswanan Pula", code: "BWP" },
        { name: "Brazilian Real", code: "BRL" },
        { name: "British Pound Sterling", code: "GBP" },
        { name: "Brunei Dollar", code: "BND" },
        { name: "Bulgarian Lev", code: "BGN" },
        { name: "Burundian Franc", code: "BIF" },
        { name: "Cambodian Riel", code: "KHR" },
        { name: "Canadian Dollar", code: "CAD" },
        { name: "Cape Verdean Escudo", code: "CVE" },
        { name: "Cayman Islands Dollar", code: "KYD" },
        { name: "CFA Franc BCEAO", code: "XOF" },
        { name: "CFA Franc BEAC", code: "XAF" },
        { name: "CFP Franc", code: "XPF" },
        { name: "Chilean Peso", code: "CLP" },
        { name: "Chilean Unit of Account", code: "CLF" },
        { name: "Chinese Yuan", code: "CNY" },
        { name: "Colombian Peso", code: "COP" },
        { name: "Comorian Franc", code: "KMF" },
        { name: "Congolese Franc", code: "CDF" },
        { name: "Costa Rican Colón", code: "CRC" },
        { name: "Croatian Kuna", code: "HRK" },
        { name: "Cuban Convertible Peso", code: "CUC" },
        { name: "Czech Republic Koruna", code: "CZK" },
        { name: "Danish Krone", code: "DKK" },
        { name: "Djiboutian Franc", code: "DJF" },
        { name: "Dominican Peso", code: "DOP" },
        { name: "East Caribbean Dollar", code: "XCD" },
        { name: "Egyptian Pound", code: "EGP" },
        { name: "Eritrean Nakfa", code: "ERN" },
        { name: "Estonian Kroon", code: "EEK" },
        { name: "Ethiopian Birr", code: "ETB" },
        { name: "Euro", code: "EUR" },
        { name: "Falkland Islands Pound", code: "FKP" },
        { name: "Fijian Dollar", code: "FJD" },
        { name: "Gambian Dalasi", code: "GMD" },
        { name: "Georgian Lari", code: "GEL" },
        { name: "German Mark", code: "DEM" },
        { name: "Ghanaian Cedi", code: "GHS" },
        { name: "Gibraltar Pound", code: "GIP" },
        { name: "Greek Drachma", code: "GRD" },
        { name: "Guatemalan Quetzal", code: "GTQ" },
        { name: "Guinean Franc", code: "GNF" },
        { name: "Guyanaese Dollar", code: "GYD" },
        { name: "Haitian Gourde", code: "HTG" },
        { name: "Honduran Lempira", code: "HNL" },
        { name: "Hong Kong Dollar", code: "HKD" },
        { name: "Hungarian Forint", code: "HUF" },
        { name: "Icelandic Króna", code: "ISK" },
        { name: "Indian Rupee", code: "INR" },
        { name: "Indonesian Rupiah", code: "IDR" },
        { name: "Iranian Rial", code: "IRR" },
        { name: "Iraqi Dinar", code: "IQD" },
        { name: "Israeli New Sheqel", code: "ILS" },
        { name: "Italian Lira", code: "ITL" },
        { name: "Jamaican Dollar", code: "JMD" },
        { name: "Japanese Yen", code: "JPY" },
        { name: "Jordanian Dinar", code: "JOD" },
        { name: "Kazakhstani Tenge", code: "KZT" },
        { name: "Kenyan Shilling", code: "KES" },
        { name: "Kuwaiti Dinar", code: "KWD" },
        { name: "Kyrgystani Som", code: "KGS" },
        { name: "Laotian Kip", code: "LAK" },
        { name: "Latvian Lats", code: "LVL" },
        { name: "Lebanese Pound", code: "LBP" },
        { name: "Lesotho Loti", code: "LSL" },
        { name: "Liberian Dollar", code: "LRD" },
        { name: "Libyan Dinar", code: "LYD" },
        { name: "Litecoin", code: "LTC" },
        { name: "Lithuanian Litas", code: "LTL" },
        { name: "Macanese Pataca", code: "MOP" },
        { name: "Macedonian Denar", code: "MKD" },
        { name: "Malagasy Ariary", code: "MGA" },
        { name: "Malawian Kwacha", code: "MWK" },
        { name: "Malaysian Ringgit", code: "MYR" },
        { name: "Maldivian Rufiyaa", code: "MVR" },
        { name: "Mauritanian Ouguiya", code: "MRO" },
        { name: "Mauritian Rupee", code: "MUR" },
        { name: "Mexican Peso", code: "MXN" },
        { name: "Moldovan Leu", code: "MDL" },
        { name: "Mongolian Tugrik", code: "MNT" },
        { name: "Moroccan Dirham", code: "MAD" },
        { name: "Mozambican Metical", code: "MZM" },
        { name: "Myanmar Kyat", code: "MMK" },
        { name: "Namibian Dollar", code: "NAD" },
        { name: "Nepalese Rupee", code: "NPR" },
        { name: "Netherlands Antillean Guilder", code: "ANG" },
        { name: "New Taiwan Dollar", code: "TWD" },
        { name: "New Zealand Dollar", code: "NZD" },
        { name: "Nicaraguan Córdoba", code: "NIO" },
        { name: "Nigerian Naira", code: "NGN" },
        { name: "North Korean Won", code: "KPW" },
        { name: "Norwegian Krone", code: "NOK" },
        { name: "Omani Rial", code: "OMR" },
        { name: "Pakistani Rupee", code: "PKR" },
        { name: "Panamanian Balboa", code: "PAB" },
        { name: "Papua New Guinean Kina", code: "PGK" },
        { name: "Paraguayan Guarani", code: "PYG" },
        { name: "Peruvian Nuevo Sol", code: "PEN" },
        { name: "Philippine Peso", code: "PHP" },
        { name: "Polish Zloty", code: "PLN" },
        { name: "Qatari Rial", code: "QAR" },
        { name: "Romanian Leu", code: "RON" },
        { name: "Russian Ruble", code: "RUB" },
        { name: "Rwandan Franc", code: "RWF" },
        { name: "Salvadoran Colón", code: "SVC" },
        { name: "Samoan Tala", code: "WST" },
        { name: "São Tomé and Príncipe Dobra", code: "STD" },
        { name: "Saudi Riyal", code: "SAR" },
        { name: "Serbian Dinar", code: "RSD" },
        { name: "Seychellois Rupee", code: "SCR" },
        { name: "Sierra Leonean Leone", code: "SLL" },
        { name: "Singapore Dollar", code: "SGD" },
        { name: "Slovak Koruna", code: "SKK" },
        { name: "Solomon Islands Dollar", code: "SBD" },
        { name: "Somali Shilling", code: "SOS" },
        { name: "South African Rand", code: "ZAR" },
        { name: "South Korean Won", code: "KRW" },
        { name: "South Sudanese Pound", code: "SSP" },
        { name: "Special Drawing Rights", code: "XDR" },
        { name: "Sri Lankan Rupee", code: "LKR" },
        { name: "St. Helena Pound", code: "SHP" },
        { name: "Sudanese Pound", code: "SDG" },
        { name: "Surinamese Dollar", code: "SRD" },
        { name: "Swazi Lilangeni", code: "SZL" },
        { name: "Swedish Krona", code: "SEK" },
        { name: "Swiss Franc", code: "CHF" },
        { name: "Syrian Pound", code: "SYP" },
        { name: "Tajikistani Somoni", code: "TJS" },
        { name: "Tanzanian Shilling", code: "TZS" },
        { name: "Thai Baht", code: "THB" },
        { name: "Tongan Pa'anga", code: "TOP" },
        { name: "Trinidad & Tobago Dollar", code: "TTD" },
        { name: "Tunisian Dinar", code: "TND" },
        { name: "Turkish Lira", code: "TRY" },
        { name: "Turkmenistani Manat", code: "TMT" },
        { name: "Ugandan Shilling", code: "UGX" },
        { name: "Ukrainian Hryvnia", code: "UAH" },
        { name: "United Arab Emirates Dirham", code: "AED" },
        { name: "Uruguayan Peso", code: "UYU" },
        { name: "Uzbekistan Som", code: "UZS" },
        { name: "Vanuatu Vatu", code: "VUV" },
        { name: "Venezuelan BolÃvar", code: "VEF" },
        { name: "Vietnamese Dong", code: "VND" },
        { name: "Yemeni Rial", code: "YER" },
        { name: "Zambian Kwacha", code: "ZMK" },
        { name: "Zimbabwean dollar", code: "ZWL" }
    ];

    const dateToday = new Date();
    const [item, setItem] = useState({
        userOwner: userID,
        name: "",
        category: "",
        notes: "",
        price: 0,
        curPrice: 0,
        USDPrice: 0,
        currency: "USD",
        quantity: 0,
        date: dateToday.toISOString().substring(0, 16),
    });

    const navigate = useNavigate();
    const back = () => {
        navigate("/dashboard")
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    const handleChangePrice = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, ["curPrice"]: value, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Exchange rate
        item.USDPrice = item.curPrice;
        if (item.currency !== "USD") {
            var APIkey = "c74b84f35c15803fdcc331fcaab1f919";
            // save exchanged price to USDprice if currency not USD

            axios.get(`https://api.currencybeacon.com/v1/convert?api_key=${APIkey}&from=${item.currency}&to=USD&amount=${item.curPrice}`)
                .then(response1 => {

                    //setItem({ ...item, ["USDPrice"]: response1.data.response.value });
                    item.USDPrice = response1.data.response.value;
                    try {
                        axios.post(
                            "http://localhost:3000/dashboard/add",
                            { ...item },
                            {
                                headers: { authorization: cookies.access_token },
                            }
                        );

                        alert("Item Created");
                        navigate("/dashboard");
                    } catch (error) {
                        console.error(error);
                    }
                })
        }
        else {
            try {
                await axios.post(
                    "http://localhost:3000/dashboard/add",
                    { ...item },
                    {
                        headers: { authorization: cookies.access_token },
                    }
                );

                alert("Item Created");
                navigate("/dashboard");
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <div className="flex-parent-element">
                <div className="flex-child-element">
                    <h1>Add Entry</h1>
                </div>
                <div className="flex-child-element">
                    <button className="bn632-hover bn21 " onClick={back}> Back </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                />

                <label htmlFor="category">Category: </label>
                <select id="category" name="category" onChange={handleChange} >
                    <option value="" ></option>
                    <option value="Equities" >Equities</option>
                    <option value="Bonds">Bonds</option>
                    <option value="Hedge Funds">Hedge Funds</option>
                    <option value="Cash">Cash</option>
                    <option value="Fixed Deposits">Fixed Deposits</option>
                    <option value="Unlisted Assets">Unlisted Assets</option>
                    <option value="Venture Capital">Venture Capital</option>
                    <option value="Properties">Properties</option>
                    <option value="Mortgage">Mortgage</option>
                    <option value="Bank Borrowings">Bank Borrowings</option>
                </select>

                <label htmlFor="notes">Notes: </label>
                <textarea
                    id="notes"
                    name="notes"
                    value={item.notes}
                    onChange={handleChange}
                ></textarea>

                <label htmlFor="price">Price: </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={item.price}
                    onChange={handleChangePrice}
                />

                <label htmlFor="price">Current Price: </label>
                <input
                    id="curPrice"
                    name="curPrice"
                    value={item.curPrice}
                    onChange={handleChange}
                />

                <label htmlFor="currency">Currency: </label>
                <select id="currency" name="currency" onChange={handleChange}>
                    {currency_list.map((curr_val) => (
                        <option value={curr_val.code} >{curr_val.code} - {curr_val.name}</option>
                    ))}
                </select>

                <label htmlFor="quantity">Quantity: </label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={item.quantity}
                    onChange={handleChange}
                />

                <label htmlFor="date">Date: </label>
                <input
                    type="datetime-local"
                    id="date"
                    name="date"
                    value={item.date}
                    onChange={handleChange}
                />

                <button type="submit">Add Item</button>
            </form>
        </div >);
};