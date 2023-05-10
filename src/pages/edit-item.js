import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/getUserID";
import { useCookies } from "react-cookie";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export const EditItem = () => {
    const userID = useGetUserID();

    const [cookies, _] = useCookies(["access_token"]);
    const location = useLocation();

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

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/dashboard/item/${location.state.id}`
                );

                setItem(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchItem();
    }, []);


    const navigate = useNavigate();
    const back = () => {
        navigate("/dashboard")
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setItem({ ...item, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                `http://localhost:3000/dashboard/update/${location.state.id}`,
                { ...item },
                {
                    headers: { authorization: cookies.access_token },
                }
            );

            alert("Item Edited");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className="flex-parent-element">
                <div className="flex-child-element">
                    <h1>Edit Entry</h1>
                </div>
                <div className="flex-child-element">
                    <button className="bn632-hover bn21 " onClick={back}> Back </button>
                </div>
            </div>
            <div >
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={item.name}
                        onChange={handleChange}
                    />
                    <br></br>
                    <label htmlFor="category">Category: </label>
                    <select id="category" name="category" onChange={handleChange} >
                        <option value={item.category} >{item.category}</option>

                        {item.category === "Equities" ? '' : <option value="Equities" >Equities</option>}
                        {item.category === "Bonds" ? '' : <option value="Bonds" >Bonds</option>}
                        {item.category === "Hedge Funds" ? '' : <option value="Hedge Funds" >Equities</option>}
                        {item.category === "Cash" ? '' : <option value="Cash" >Cash</option>}
                        {item.category === "Fixed Deposits" ? '' : <option value="Fixed Deposits" >Fixed Deposits</option>}
                        {item.category === "Unlisted Assets" ? '' : <option value="Unlisted Assets" >Unlisted Assets</option>}
                        {item.category === "Venture Capital" ? '' : <option value="Venture Capital" >Venture Capital</option>}
                        {item.category === "Properties" ? '' : <option value="Properties" >Properties</option>}
                        {item.category === "Mortgage" ? '' : <option value="Mortgage" >Mortgage</option>}
                        {item.category === "Bank Borrowings" ? '' : <option value="Bank Borrowings" >Bank Borrowings</option>}


                    </select>
                    <br></br>
                    <label htmlFor="notes">Notes: </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={item.notes}
                        onChange={handleChange}
                    ></textarea>
                    <br></br>
                    <label htmlFor="price">Price: </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={item.price}
                        onChange={handleChange}
                    />
                    <br></br>
                    <label htmlFor="curPrice">Current Price: </label>
                    <input
                        type="number"
                        id="curPrice"
                        name="curPrice"
                        value={item.curPrice}
                        onChange={handleChange}
                    />
                    <br></br>
                    <label htmlFor="currency">Currency: </label>
                    <input
                        type="text"
                        id="currency"
                        name="currency"
                        value={item.currency}
                        onChange={handleChange}
                    />
                    <br></br>
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={item.quantity}
                        onChange={handleChange}
                    />
                    <br></br>
                    <label htmlFor="date">Date: </label>
                    <input
                        type="datetime-local"
                        id="date"
                        name="date"
                        value={item.date}
                        onChange={handleChange}
                    />
                    <br></br>
                    <button type="submit">Edit Item</button>
                </form>
            </div>
        </div >);
};