import React, {useState, useEffect, Fragment} from 'react';
import API from './API_Interface/API_Interface';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


export default function Login({setUser}) {
    const [userInput, setUserInput] = useState('');
    const [verifyUser, setVerifyUser] = useState(false);
    const [authFailed, setAuthFailed] = useState(false);

    const makeUserName = ({user_fName, user_mName, user_lName}) => {

        console.log(`making user name with: ${user_fName} : ${user_mName} : ${user_lName}`);
        const middleName = () => user_mName !== undefined && user_mName !== null  
                            ? `${user_mName.length === 1 ? user_mName[0] + '.' : user_mName}` 
                            : '';

        return `${user_fName} ${middleName()} ${user_lName}`;
    };



    const handleInputChange = event => {
        console.log("handleInputChange called.");

//        event.stopPropagation();
//        event.preventDefault();

        setUserInput(event.target.value);
        setAuthFailed(false);

        if(event.key === "Enter") {
            console.log("handleKeyPress: Verify user input.");
            setVerifyUser(true);
        }
    };

    useEffect(() => {

        if( ! verifyUser || userInput.length === 0)
            return;

        const api = new API();
        async function getUserInfo() {
            api.getUserInfo(userInput)
                .then( userInfo => {
                console.log(`api returns user info and it is: ${JSON.stringify(userInfo)}`);
                const user = { ...userInfo.user[0], unpack: () => makeUserName(userInfo.user[0]) };
                if( userInfo.status === "OK" ) {
                    setUser(user);
                } else  {
                    setVerifyUser(false);
                    setAuthFailed(true);
                }
            });
        }

        getUserInfo();
    }, [verifyUser, setUser, userInput]);


    return (
       <Fragment>
           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={10}>

                <TextField
                    error={authFailed}
                    id="outlined-error-helper-text"
                    label="Login name"
                    placeholder=""
                    value={userInput}
                    helperText="Only for existing users!"
                    onChange={handleInputChange}
                />
                <Divider />
           </Box>

           <Box display="flex" justifyContent="center" alignItems="center" width="100%" mt={2}>
           <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => {setVerifyUser(true)}}
                >Proceed</Button>
           </Box>
       </Fragment>

    );
}
