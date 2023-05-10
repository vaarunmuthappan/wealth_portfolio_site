import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetUserID } from "../hooks/getUserID";
import axios from "axios";


export const Dashboard = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const userID = useGetUserID();
    const navigate = useNavigate();
    const [selectedCurr, setselectedCurr] = useState("USD");
    //var selectedCurr = "USD";
    var hasAssets = -1;
    var hasLiabilities = -1;

    const dateToday = new Date();
    const [item, setItem] = useState({
        userOwner: userID,
        name: "",
        category: "",
        notes: "",
        price: 0,
        curPrice: 0,
        USDPrice: 0,
        currency: "",
        quantity: 0,
        date: dateToday.toISOString()

    });

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

    const [assets, setAssets] = useState([]);
    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const response = await axios.get(
                    `https://wealth-portfolio-site.onrender.com/dashboard/getuser/${userID}`
                ).catch(function (error) {
                    //console.log(error.toJSON());
                });

                setAssets(response.data.assetList);

            } catch (err) {
                //Console.log(err);
            }
        };

        fetchAssets();
    }, []);

    const addEntry = () => {
        navigate("/create");
    }

    const editEntry = (itemID) => {
        navigate("/edit", { state: { id: itemID } });
    }

    const deleteEntry = (id) => {
        axios.delete('https://wealth-portfolio-site.onrender.com/dashboard/' + id)
            .then(response => {
                const newResults = assets.map(type => ({
                    ...type,

                    doc: type.doc.map(cat => ({
                        ...cat,
                        items: cat.items.filter(child => child._id !== id)
                    }))
                }));

                setAssets(newResults);
            });
    }

    const refreshEquity = (id, ticker, currency) => {
        //https://cryptocointracker.com/yahoo-finance/yahoo-finance-api
        //https://www.npmjs.com/package/yahoo-stock-api?activeTab=readme

        // fetch current price for stock
        axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=IhcjY6OP0py98Uh6ZFqGD5nrPrrvqYdR`)
            .then(response => {
                const apiCurValue = response.data.results[0].c;

                // FETCH EXCHANGE RATE FROM API, THEN JUST COPY INTO updateCurr
                var APIkey = "c74b84f35c15803fdcc331fcaab1f919";
                axios.get(`https://api.currencybeacon.com/v1/convert?api_key=${APIkey}&from=${currency}&to=${selectedCurr}&amount=${apiCurValue}`)
                    .then(response1 => {

                        var exchangedVal = response1.data.response.value;

                        const newResults = assets.map(type => ({
                            ...type,
                            doc: type.doc.map(cat => ({
                                ...cat,
                                items: cat.items.map(function (item) {
                                    if (item._id === id) {
                                        item.USDPrice = exchangedVal;
                                        item.curPrice = apiCurValue;

                                        try {
                                            axios.post(
                                                `https://wealth-portfolio-site.onrender.com/dashboard/update/${id}`,
                                                item,
                                                {
                                                    headers: { authorization: cookies.access_token },
                                                }
                                            );
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }
                                    return item;
                                }
                                )
                            }))
                        }));
                        setAssets(newResults);
                    });
            });
    }

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

    if (assets.length === 1) {
        if (assets[0]._id === "Assets") {
            hasAssets = 0;
        }
        else {
            hasLiabilities = 0;
        }
    }
    if (assets.length === 2) {
        if (assets[0]._id === "Assets") {
            hasAssets = 0;
            hasLiabilities = 1;
        }
        else {
            hasLiabilities = 0;
            hasAssets = 1;
        }
    }

    const UpdateCurr = (event) => {
        //selectedCurr = event.target.value;
        console.log("BEFORE", selectedCurr);
        setselectedCurr(event.target.value)
        let ssc = event.target.value;
        console.log("AFTER", selectedCurr);
        var newResults = [...assets];

        Object.values(newResults[0].doc).forEach(async (type) => {
            Object.values(type.items).forEach(async (item) => {
                var APIkey = "c74b84f35c15803fdcc331fcaab1f919";
                let response1 = await [axios.get(`https://api.currencybeacon.com/v1/convert?api_key=${APIkey}&from=${item.currency}&to=${ssc}&amount=${item.curPrice}`)]

                await Promise.all(response1).then((value) => {
                    console.log("RESPONSE", ssc, value)
                    item.USDPrice = value[0].data.response.value;
                    setAssets([...newResults]);
                })
            })
        })
        Object.values(newResults[1].doc).forEach(async (type) => {
            Object.values(type.items).forEach(async (item) => {
                var APIkey = "c74b84f35c15803fdcc331fcaab1f919";
                let response1 = await [axios.get(`https://api.currencybeacon.com/v1/convert?api_key=${APIkey}&from=${item.currency}&to=${ssc}&amount=${item.curPrice}`)]
                await Promise.all(response1).then((value) => {
                    // console.log("inside promse all", value)
                    item.USDPrice = value[0].data.response.value;
                    setAssets([...newResults]);
                })
            })
        })

        setAssets([...newResults]);
    };

    return (
        <div>
            <div className="flex-parent-element">
                <div className="flex-child-element">
                    <h1>My Portfolio</h1>
                </div>
                <div className="flex-child-element">
                    <button className="bn632-hover bn21 " onClick={addEntry}> Add Entry </button>
                    <button className="bn632-hover bn21 " onClick={logout}> Logout </button>
                </div>
            </div>

            <div className="tbl-header">
                <table cellPadding="0" cellSpacing="0" border="0">
                    <thead>
                        <tr>
                            <th>Assets / Liabilities</th>
                            <th></th>
                            <th>Name</th>
                            <th>Date Acquired</th>
                            <th>Quantity</th>
                            <th>Initial Price</th>
                            <th>Initial Value</th>
                            <th>Current Price</th>
                            <th>Current Value</th>
                            <th>% Change</th>
                            <th>
                                <form >
                                    <label htmlFor="currency">Current Price in:  </label>
                                    <br></br>
                                    <select id="currency" name="currency" onChange={UpdateCurr} style={{ "width": "100%" }}>

                                        {currency_list.map((curr_val) => (
                                            <option value={curr_val.code} >{curr_val.name} - {curr_val.code}</option>
                                        ))}
                                    </select>
                                </form>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="tbl-content">
                <table cellPadding="0" cellSpacing="0" border="0" >
                    <tbody>
                        <tr>
                            <td> Assets </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {
                            hasAssets === -1 ? "assets is null" : assets[hasAssets].doc.map((cat) => (
                                <>
                                    <tr>
                                        <td></td>
                                        <td>{cat._id.category}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    {
                                        cat.items.map((item) => (
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <button onClick={() => editEntry(item._id)}>Edit</button>
                                                    <button onClick={() => deleteEntry(item._id)}>Delete</button>
                                                </td>
                                                {item.category === "Equities" ? <td>{item.name} <button onClick={() => refreshEquity(item._id, item.name, item.currency)}>Refresh</button></td> : <td>{item.name}</td>}
                                                <td>{item.date}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price.toFixed(2)} {item.currency}</td>
                                                <td>{(item.price * item.quantity).toFixed(2)}  {item.currency}</td>
                                                <td>{item.curPrice.toFixed(2)}  {item.currency}</td>
                                                <td>{(item.curPrice * item.quantity).toFixed(2)}  {item.currency}</td>
                                                <td>{(((item.curPrice - item.price) / item.price) * 100).toFixed(2)} %</td>
                                                <td>{item.USDPrice.toFixed(2)} {selectedCurr}</td>
                                            </tr>
                                        ))
                                    }
                                </>
                            ))
                        }

                        <tr>
                            <td>Liabilities </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {
                            hasLiabilities === -1 ? "Liabilites is null" : assets[hasLiabilities].doc.map((cat) => (
                                <>
                                    <tr>
                                        <td></td>
                                        <td>{cat._id.category}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    {
                                        cat.items.map((item) => (
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <button onClick={() => editEntry(item._id)}>Edit</button>
                                                    <button onClick={() => deleteEntry(item._id)}>Delete</button>
                                                </td>
                                                {item.category === "Equities" ? <td>{item.name} <button onClick={() => refreshEquity(item._id, item.name)}>Refresh</button></td> : <td>{item.name}</td>}
                                                <td>{item.date}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price.toFixed(2)} {item.currency}</td>
                                                <td>{(item.price * item.quantity).toFixed(2)}  {item.currency}</td>
                                                <td>{item.curPrice.toFixed(2)}  {item.currency}</td>
                                                <td>{(item.curPrice * item.quantity).toFixed(2)}  {item.currency}</td>
                                                <td>{(((item.curPrice - item.price) / item.price) * 100).toFixed(2)} %</td>
                                                <td>{item.USDPrice.toFixed(2)} {selectedCurr}</td>
                                            </tr>
                                        ))
                                    }
                                </>
                            ))
                        }
                    </tbody>
                </table>
            </div >
        </div >
    )
};