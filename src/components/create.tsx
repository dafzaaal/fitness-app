import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function createAccount() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [userFlag, setUserFlag] = useState(false);
    const [exists, setExists] = useState(false);
    const [passwordLength, setPasswordLength] = useState(false);
    const [blankInputs, setBlankInputs] = useState(false);

    const navigator = useNavigate();

    function handleNameChange(event : React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function handlePasswordChange(event : React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleUsernameChange(event : React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }

    function handleEmailChange(event : React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function validateInputs() {
        if(name.length === 0 || email.length === 0 || username.length === 0){
            setPasswordLength(false);
            setBlankInputs(true);
            
        }
        else if(password.length < 6){
            setPasswordLength(true);
            setBlankInputs(false);

        }
        else {
            create();
        }
    }

    async function create() {
        try{
            const headers = {
                "name": name,
                "username": username,
                "password": password,
                "email": email,
            };
            const res = await axios.post("http://127.0.0.1:3000/api/v1/create", headers);
            console.log(res);
            if(res.data === "User Created!") {
                setBlankInputs(false);
                setPasswordLength(false);
                setExists(false);
                setUserFlag(true);
            }
            else {
                setBlankInputs(false);
                setPasswordLength(false);
                setUserFlag(false);
                setExists(true);
            }
        }
        catch(e) {
            console.log(e);
        }
    }

    return(
        <>
            <div className="createAccountBox">
                <div className="createAccount">
                    <h2>Create Your Account!</h2>
                    <input type="text" placeholder=" Enter name here..." onChange={handleNameChange}></input>
                    <input type="text" placeholder=" Enter username..." onChange={handleUsernameChange}></input>
                    <input type="password" placeholder=" Enter password..." onChange={handlePasswordChange}></input>
                    <input type="email" placeholder=" Enter email..." onChange={handleEmailChange}></input>

                    {userFlag && 
                        <p className="create_msg">Account successfully created!</p>   
                    }

                    {exists &&
                        <p className="create_msg">This email is already linked to an account!</p>
                    }

                    {passwordLength &&
                        <p className="create_msg">Password must be greater than seven characters</p>
                    }

                    {blankInputs &&
                        <p className="create_msg">All fields must be filled</p>
                    }


                    <button onClick={() => {validateInputs()}}>Create!</button>


                </div>
                
            </div>
            
        </>
    );
}

export default createAccount;