import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";



export default function Register() {
    const navigate = useNavigate();

    useEffect(() => {
        let data = localStorage.getItem('user');
        if(data) {
            navigate('/home');
        }
    }, [])

    const [isUserRegister, setIsUserRegister] = useState(true);
    const [isUserLogin, setIsUserLogin] = useState(false);
    const [data, setData] = useState('');
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [resisterInfo, setRegisterInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        type: ''
    });

    const handleLoginChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    }

    const handleRegisterChange = (event) => {
        setRegisterInfo({ ...resisterInfo, [event.target.name]: event.target.value });
    }

    const handleLoginSubmit = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        console.log(loginInfo);
        fetch('http://localhost:8000/api/user/userLogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo)
        }).then((response) => response.json())
            .then((json) => {
                setData(json['token'])
                localStorage.setItem('user', JSON.stringify(json['user']));
            })
            .catch((error) => console.log('Error: ', error));

        console.log('data: ', data);
        sessionStorage.setItem('loginToken', data);

        setLoginInfo({
            email: '',
            password: ''
        })

        navigate('/home');

    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();

        console.log(resisterInfo);

        fetch('http://localhost:8000/api/user/createUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resisterInfo)
        }).then((response) => response.json())
            .then((json) => {
                setData(json['token'])
                localStorage.setItem('user', JSON.stringify(json['user']));
            })
            .catch((error) => console.log('Error: ', error));

            sessionStorage.setItem('loginToken', data);

            setRegisterInfo({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone: '',
                type: ''
            })
            navigate('/home');
    }

    const swapForm = () => {
        setIsUserLogin(!isUserLogin);
        setIsUserRegister(!isUserRegister);
    }

    return (
        <div>
            {isUserLogin ? (
                <div>
                    Login
                    <form onSubmit={handleLoginSubmit}>
                        <h3>Login Form</h3>
                        <input type="text" name="email" value={loginInfo.email} onChange={handleLoginChange} />
                        <input type="password" name="password" value={loginInfo.password} onChange={handleLoginChange} />
                        <button>Submit</button>
                    </form>

                    <button type="button" onClick={swapForm} >Don't have account ? Sign Up</button>
                </div>
            ) : (
                <div>
                    Register
                    <form onSubmit={handleRegisterSubmit}>
                        <h3>Registration Form</h3>
                        <input type="text" name="firstName" value={resisterInfo.firstName} onChange={handleRegisterChange} />
                        <input type="text" name="lastName" value={resisterInfo.lastName} onChange={handleRegisterChange} />
                        <input type="email" name="email" value={resisterInfo.email} onChange={handleRegisterChange} />
                        <input type="phone" name="phone" value={resisterInfo.phone} onChange={handleRegisterChange} />
                        <input type="password" name="password" value={resisterInfo.password} onChange={handleRegisterChange} />
                        <select name="type" value={resisterInfo.type} id="" onChange={handleRegisterChange}>
                            <option value='' >Select</option>
                            <option value='admin' >admin</option>
                            <option value='user'>user</option>
                        </select>
                        <button>submit</button>

                        <button type="button" onClick={swapForm} >Already have an account ? Login</button>
                    </form>

                </div>
            )
            }
        </div>
    )
}