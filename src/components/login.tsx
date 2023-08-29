import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../App.css'

function login() {

    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[credentialFlag, setCredentialFlag] = useState(false);
    const navigator = useNavigate();

    function handleUsernameChange(event : React.ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event : React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value);
    }
    
    async function checkCredentials(username : string, password : string) {

        console.log("Username:", username);
        console.log("Password:", password);

        const headers = {
            "username": username,
            "password": password,
        };
        try {
            const response = await axios.post("http://127.0.0.1:3000/api/v1/login", headers);
            console.log(response);

            const num = response.data;
            if(num === "OK") {
                navigator("/dashboard");
            }
            else{
                setCredentialFlag(true);
            }
        }
        catch(e){
            console.log("Error!", e);
        }
    }

    return(
        <>
            <div className='loginContainer'>
                <div className='login'>
                    <h3>Login</h3>
                        <input type='text' id='username' placeholder=" Username..." onChange={handleUsernameChange}></input>
                        <input type='password' id='password' placeholder=' Password...' onChange={handlePasswordChange}></input>
                        <button onClick={() => {checkCredentials(username, password)}}>Login</button>
                        <Link to="/create" className='accLink'>Don't have an account? Sign up!</Link>

                        
                        {credentialFlag && 
                            <p className='login_err'>Incorrect login, try again</p>                     
                        }
                </div>
            </div>
        
        </>

    );
}

export default login;