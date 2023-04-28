import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import './Userform.css';

export default function Userform() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [currency, setCurrency] = useState("");
    const [travelers, setTravelers] = useState("");
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [currencyError, setCurrencyError] = useState(false);
    const [travelersError, setTravelersError] = useState(false);
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            setNameError(true);
        }
        if (!email) {
            setEmailError(true);
        }else{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setEmailError(true);
                return;
            }
        }
        if (!country) {
            setCountryError(true);
        }
        if (!currency) {
            setCurrencyError(true);
        }
        if (!travelers) {
            setTravelersError(true);
        }
        if (name && email && country && currency && travelers) {
            const data = {
                name: name,
                email: email,
                destination_country: country,
                budget_per_person: currency,
                number_of_traveller: travelers
            };
            
            const response = await fetch('http://127.0.0.1:8000/booking/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if(response.status===500){
                alert('Some Unknown Error Occurred');
                return;
            }
            const json = await response.json();
            if(json?.message){
                alert(json.message);
            }
            if(json?.code===200){
                history('/details');
            }
        }
    };
  
    return (
        <>
            <form className="container" onSubmit={handleSubmit}>
                <h1>User Registration Form</h1>
                <TextField
                    id="name"
                    style={{marginTop:'10px'}}
                    label="Name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setNameError(false);
                    }}
                    error={nameError}
                    helperText={nameError ? "Name is required" : ""}
                />
                <TextField
                    id="email"
                    label="Email"
                    style={{marginTop:'10px'}}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(false);
                    }}
                    error={emailError}
                    helperText={emailError ? "Invalid email address" : ""}
                />
                <FormControl style={{marginTop:'10px'}} sx={{ minWidth: 224 }} error={countryError}>
                    <InputLabel>Where do you want to go?</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={country}
                        label="Where do you want to go?"
                        onChange={(e) => {
                            setCountry(e.target.value);
                            setCountryError(false);
                        }}
                        error={countryError}
                    >
                        <MenuItem value={"India"}>India</MenuItem>
                        <MenuItem value={"Africa"}>Africa</MenuItem>
                        <MenuItem value={"Europe"}>Europe</MenuItem>
                    </Select>
                    <FormHelperText>{countryError ? "Country is required" : ""}</FormHelperText>
                </FormControl>
                <TextField
                    style={{marginTop:'10px'}}
                    id="budget"
                    label="Budget per Person"
                    value={currency}
                    onChange={(e) => {
                        setCurrency(e.target.value);
                        setCurrencyError(false);
                    }}
                    error={currencyError}
                    helperText={currencyError ? "Budget is required" : ""}
                />
                <TextField
                    style={{marginTop:'10px'}}
                    id="travellers"
                    label="Number of Travellers"
                    value={travelers}
                    onChange={(e) => {
                        setTravelers(e.target.value);
                        setTravelersError(false);
                    }}
                    error={travelersError}
                    helperText={travelersError ? "Number of Travellers are required" : ""}
                />
                <Button type="submit" variant="contained" color="primary" style={{marginTop:'10px'}}>
                    Submit
                </Button>
            </form>
        </>
        
    );
}  
  
  
  
  