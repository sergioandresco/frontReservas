import React, { FC, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginRegister.css'
import Cookies from 'js-cookie';

const LoginRegister: FC = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            const accessToken = data.data.access;
            
            Cookies.set('accessToken', accessToken, { expires: 1 });
            console.log(accessToken);

            navigate('/components/Home');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRegisterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/create-user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, first_name: firstName, last_name: lastName, email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
       <div className="container-form-login">
         <div className="main22">
           <input type="checkbox" id="chk" aria-hidden={true} />
   
           <div className="login22">
             <form className="form22" onSubmit={handleLoginSubmit}>
               <label className="label22" htmlFor="chk" aria-hidden={true}>Log in</label>
               <input className="input22" type="text" name="username" value={username} placeholder="Username" required={true} onChange={(e) => setUsername(e.target.value)} />
               <input className="input22" type="password" name="pswd" value={password} placeholder="Password" required={true} onChange={(e) => setPassword(e.target.value)} />
               <button>Log in</button>
             </form>
           </div>
   
           <div className="register22">
             <form className="form22" onSubmit={handleRegisterSubmit}>
               <label className="label22" htmlFor="chk" aria-hidden={true}>Register</label>
               <input className="input22" type="text" name="username" placeholder="Username" required={true} value={username} onChange={(e) => setUsername(e.target.value)} />
               <input className="input22" type="text" name="first_name" placeholder="First Name" required={true} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
               <input className="input22" type="text" name="last_name" placeholder="Last Name" required={true} value={lastName} onChange={(e) => setLastName(e.target.value)} />
               <input className="input22" type="email" name="email" placeholder="Email" required={true} value={email} onChange={(e) => setEmail(e.target.value)} />
               <input className="input22" type="password" name="pswd" placeholder="Password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
               <button>Register</button>
             </form>
           </div>
         </div>
       </div>
    );
};

export default LoginRegister;
