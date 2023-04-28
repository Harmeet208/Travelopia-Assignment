import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
// import { createBrowserHistory } from 'history';


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      width: "25ch",
    },
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function Userform() {
    const classes = useStyles();
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
    // const history = createBrowserHistory();


    const handleSubmit = (e) => {
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
            email: email,
            name: name,
            country: country,
            currency: currency,
            travellers: travelers
          };
          
          fetch('http://127.0.0.1:8000/booking/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => {
           
            if(response){
                console.log(response)
                if(response.status===200){
                    // history.push('/about');
                    alert('Success')
                }else if(response.status!==200){
                    alert('Please Check your Data')
                }
            }
          })
      }
    };
  
    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError(false);
          }}
          error={nameError}
          helperText={nameError ? "Name is required" : ""}
          styles
        />
        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
          error={emailError}
          helperText={emailError ? "Invalid email address" : ""}
        />
        <FormControl className={classes.formControl}>
          <Select
            labelId="country-label"
            id="country"
            value={country}
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
        </FormControl>
        <TextField
          id="budget"
          label="Budget"
          value={currency}
          onChange={(e) => {
            setCurrency(e.target.value);
            setCurrencyError(false);
          }}
          error={currencyError}
          helperText={currencyError ? "Budget is required" : ""}
        />
         <TextField
          id="travelers"
          label="travelers"
          value={travelers}
          onChange={(e) => {
            setTravelers(e.target.value);
            setTravelersError(false);
          }}
          error={travelersError}
          helperText={travelersError ? "No of Travellers are required" : ""}
        />
        <Button type="submit" variant="contained" color="primary">
            Submit
        </Button>
      </form>
    );
}  
  
  
  
  