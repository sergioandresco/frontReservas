import React, { FC, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginRegister.css'
import Cookies from 'js-cookie';
import { Perfil } from '../Perfil/index.tsx'
import { useAuth } from '../../Context/index.tsx';

const LoginRegister: FC = () => {

    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { setAccessToken, setUserId } = useAuth();


    // const handleLoginSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:8000/auth/', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ username, password }),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Login failed');
    //         }

    //         const data = await response.json();
    //         console.log(data)
    //         const accessToken = data.data.access;

    //         Cookies.set('accessToken', accessToken, { expires: 1 });
    //         setAccessToken(accessToken);
    //         setIsLoggedIn(true);
    //         // window.location.reload(); // Marcar al usuario como autenticado

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/auth/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            const accessToken = data.data.access;

            Cookies.set("accessToken", accessToken, { expires: 1 });
            setAccessToken(accessToken);
            setIsLoggedIn(true);

            // Obtener el ID del usuario
            const userResponse = await fetch("http://localhost:8000/all-user/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!userResponse.ok) {
                throw new Error("Failed to fetch user data");
            }

            const userData = await userResponse.json();
            const userId = userData.user_id;

            Cookies.set("userId", userId, { expires: 1 });
            setUserId(userId);
            console.log("User ID:", userId);

        } catch (error) {
            console.error("Error:", error);
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

            const data = await response.json();
            const accessToken = data.data.access;

            Cookies.set('accessToken', accessToken, { expires: 1 });
            setAccessToken(accessToken);
            setIsLoggedIn(true);
            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Si el usuario está autenticado, renderizar el componente Perfil
    if (isLoggedIn) {
        window.location.reload();
        return <Perfil />;
    }

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
