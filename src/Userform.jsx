import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { isNullValue } from './utils/DataValidation';


export default function Userform() {
    const [country, setCountry] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [travellers, setTravellers] = React.useState('');
    const [currency, setCurrency] = React.useState('');
    const [nameErr, setNameErr] = React.useState('');
    const [emailErr, setEmailErr] = React.useState('');
    const [travellersErr, setTravellersErr] = React.useState('');
    const [currencyErr, setCurrencyErr] = React.useState('');
    const [countryError, setCountryError] = React.useState('');

    const validateFormData = (name, email, country, travellers, currency) =>{
        if(isNullValue(name)){
            setNameErr('Please Enter Name');
        }else{
            setNameErr('');
        }
        if(isNullValue(email)){
            setEmailErr('Please Enter Email');
        }else{
            setEmailErr('');
        }
        if(isNullValue(country)){
            setCountryError('Please Select Country');
        }else{
            setCountryError('');
        }
        if(isNullValue(travellers)){
            setTravellersErr('Please Enter Travellers');
        }else{
            setTravellersErr('');
        }
        if(isNullValue(currency)){
            setCurrencyErr('Please Enter Currency');
        }else{
            setCurrencyErr('');
        }
    };

    return (
        <div>
            <TextField
                error={nameErr ? true : false}
                helperText={nameErr}
                label={'Name'}
                id="outlined-required"
                value={name}
                onChange={(event)=>{
                    setName(event.target.value);
                }}
            />
            <TextField
                error={emailErr ? true : false}
                helperText={emailErr}
                label={'Email Address'}
                id="outlined-required"
                value={email}
                onChange={(event)=>{
                    setEmail(event.target.value);
                }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} error>
                <InputLabel id="demo-simple-select-error-label">Where Do You Want To Go?</InputLabel>
                <Select
                    labelId="demo-simple-select-error-label"
                    id="demo-simple-select-error"
                    value={country}
                    onChange={(event)=>{
                        setCountry(event.target.value);
                    }}
                    renderValue={(value) => `${value}`}
                >
                    <MenuItem value={'India'}>India</MenuItem>
                    <MenuItem value={'Africa'}>Africa</MenuItem>
                    <MenuItem value={'Europe'}>Europe</MenuItem>
                </Select>
                <FormHelperText>{countryError}</FormHelperText>
            </FormControl>
            <TextField
                error={travellersErr ? true : false}
                helperText={travellersErr}
                label={'No of Travellers'}
                value={travellers}
                id="outlined-required"
                onChange={(event)=>{
                    setTravellers(event.target.value);
                }}
            />
            <TextField
                error={currencyErr ? true : false}
                value={currency}
                helperText={currencyErr}
                label={'Currency'}
                id="outlined-required"
                onChange={(event)=>{
                    setCurrency(event.target.value);
                }}
            />
            <Button variant="contained" size="large" onClick={()=>{
                validateFormData(name, email, country, travellers, currency);
            }}>
                Submit
            </Button>
        </div>
    );
}