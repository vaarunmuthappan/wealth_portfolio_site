import { store } from '../../app/store'
import { React, useRef, useEffect, useState } from "react";
import {
    DownloadOutlined,
    PaidTwoTone,
    SavingsTwoTone,
    LocalAtmTwoTone
} from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    useTheme,
    MenuItem,
    Grid,
    Select,
    useMediaQuery,
} from "@mui/material";
import axios from "axios";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../auth/authSlice"

import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import BreakdownChart from "../../components/BreakdownChart";
import StatBox from "../../components/StatBox";

const Overview = () => {

    const [selectedCurr, setSelectedCurr] = useState("USD");

    const printRef = useRef();

    const authStore = store.getState().auth;

    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    const [assetData, setAssetData] = useState({
        Total: 0,
        Categories: []
    });
    const [liabilityData, setLiabilityData] = useState({
        Total: 0,
        Categories: []
    });
    const [assetText, setAssetText] = useState("Loading...");
    const [liabText, setliabText] = useState("Loading...");
    const [netHeader, setNetHeader] = useState("Loading...");

    const [netUSD, setNetUSD] = useState(liabilityData.Total + assetData.Total);
    const token = useSelector(selectCurrentToken)
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await axios.get(`https://wealth-portfolio-api.onrender.com/assets/breakdown/${store.getState().auth.firm}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }
                });
            setAssetData({
                Total: response.data.assetTotal.sum,
                Categories: response.data.assetCat
            });
            setLiabilityData({
                Total: response.data.liabTot.sum,
                Categories: response.data.liabCat
            });
            setNetUSD(response.data.assetTotal.sum - response.data.liabTot.sum);
            setAssetText(`${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurr,
                maximumFractionDigits: 0,
            }).format(response.data.assetTotal.sum)}`);
            setliabText(`${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurr,
                maximumFractionDigits: 0,
            }).format(response.data.liabTot.sum)}`);
            setNetHeader(`${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: selectedCurr,
                maximumFractionDigits: 0,
            }).format(response.data.assetTotal.sum - response.data.liabTot.sum)}`);
        }
        fetchData();
    }, [])

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

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 10;
        const pdfHeight =
            ((imgProperties.height * pdfWidth) / imgProperties.width) - 10;

        pdf.addImage(data, 'PNG', 5, 0, pdfWidth, pdfHeight);
        pdf.save(`${authStore.firm} Overview.pdf`);
    };

    const UpdateCurr = async (event) => {
        if (event.target.value === "USD") {
            setNetHeader(`${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }).format(assetData.Total - liabilityData.Total)}`);

            setAssetText(`${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }).format(assetData.Total)}`);

            setliabText(`${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
            }).format(liabilityData.Total)}`);

            setSelectedCurr("USD");
        }
        else {
            let ssc = event.target.value;
            setSelectedCurr(ssc)
            var APIkey = "c74b84f35c15803fdcc331fcaab1f919";

            // Net value
            let netResponse = axios.get(`https://api.currencybeacon.com/v1/convert?api_key=${APIkey}&from=USD&to=${ssc}&amount=${netUSD}`);
            let assetResponse = axios.get(`https://api.currencybeacon.com/v1/convert?api_key=${APIkey}&from=USD&to=${ssc}&amount=${assetData.Total}`);
            let liabResponse = axios.get(`https://api.currencybeacon.com/v1/convert?api_key=${APIkey}&from=USD&to=${ssc}&amount=${liabilityData.Total}`);

            await Promise.allSettled([netResponse, assetResponse, liabResponse]).then((values) => {
                setNetHeader(`${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: ssc,
                    maximumFractionDigits: 0,
                }).format(values[0].value.data.response.value)}`);

                setAssetText(`${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: ssc,
                    maximumFractionDigits: 0,
                }).format(values[1].value.data.response.value)
                    } `);

                setliabText(`${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: ssc,
                    maximumFractionDigits: 0,
                }).format(values[2].value.data.response.value)}`);

            })
        }
    }

    const content = (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="" subtitle="" />

                <Box>
                    <Button
                        onClick={handleDownloadPdf}
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlined sx={{ mr: "10px" }} />
                        Download Report
                    </Button>
                </Box>
            </FlexBetween>

            <div ref={printRef}>
                <FlexBetween>
                    <Header title={`Welcome ${authStore.user} `} subtitle="Welcome to your dashboard" />
                    <Box>
                        <Grid item fullWidth xs={1} sm={1}>
                            <Select
                                labelId="currency"
                                id="currency"
                                name="currency"
                                value={selectedCurr}
                                fullWidth
                                label="Currency"
                                onChange={UpdateCurr}
                            >
                                {currency_list.map((citem) => (
                                    <MenuItem value={citem.code}>{citem.name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Box>
                </FlexBetween>

                <Box
                    mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="160px"
                    gap="20px"
                    sx={{
                        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
                    }}
                >

                    {/* ROW 1 */}
                    <StatBox
                        title="Net Worth"
                        gridColumn="span 6"
                        value={netHeader}
                        bold={true}
                        // increase="+14%"
                        // description="Since last month"
                        icon={
                            <PaidTwoTone
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                    <StatBox
                        title="Total Assets"
                        gridColumn="span 3"
                        value={assetText}
                        // increase="+5%"
                        // description="Since last month"
                        icon={
                            <SavingsTwoTone
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />
                    <StatBox
                        title="Total Liabilites"
                        gridColumn="span 3"
                        value={liabText}
                        // increase="+43%"
                        // description="Since last month"
                        icon={
                            <LocalAtmTwoTone
                                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                            />
                        }
                    />

                    {/* ROW 2 */}
                    <Box
                        gridColumn="span 6"
                        gridRow="span 3"
                        backgroundColor={theme.palette.background.alt}
                        p="1.5rem"
                        borderRadius="0.55rem"
                    >
                        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                            Assets By Category
                        </Typography>
                        <Typography
                            p="0 0.6rem"
                            fontSize="0.8rem"
                            sx={{ color: theme.palette.secondary[200] }}
                        >
                            Breakdown of assets by sub-category.
                        </Typography>
                        <BreakdownChart data={assetData} />
                    </Box>
                    <Box
                        gridColumn="span 6"
                        gridRow="span 3"
                        backgroundColor={theme.palette.background.alt}
                        p="1.5rem"
                        borderRadius="0.55rem"
                    >
                        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
                            Liabilities By Category
                        </Typography>
                        <Typography
                            p="0 0.6rem"
                            fontSize="0.8rem"
                            sx={{ color: theme.palette.secondary[200] }}
                        >
                            Breakdown of liabilities by sub-category.
                        </Typography>
                        <BreakdownChart data={liabilityData} />
                    </Box>
                </Box>
            </div>
        </Box>
    )

    return content;
}
export default Overview