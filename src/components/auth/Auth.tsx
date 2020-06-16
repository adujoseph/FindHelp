import React, { useState } from 'react';
import './Auth.css';
import { Card, Input, Button, notification } from 'antd';
import {SmileOutlined} from '@ant-design/icons';
import FirebaseApp from '../../config/firebase';





const Auth = (props: any) => {
    const [showForm, setShowForm] = useState<string>('register');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const openNotification = (t: string) => {
        let mssg;
        if (t === 'register') {
            mssg = 'Registration Successful'
        } else if (t === 'login') {
            mssg = 'Login Successful'
        }
        notification.open({
            message: mssg,
            description: 'Welcome to FindHelp, Find help around you',
            icon: <SmileOutlined  style={{ color: '#108ee9' }} />,

        });
        // props.history.push('/search')
    };

    const handleRegister = () => {
        if(email === '' || password === ''){
            setError('You cannot submit an empty field');
        } else {
            FirebaseApp.auth().createUserWithEmailAndPassword(email, password)
            .then(resp => {
                console.log('sign up resp: ',resp.user);

                if (resp) {
                    openNotification('register');
                }
            })
            .catch(function (error) {
                // Handle Errors here.
                //var errorCode = error.code;
                var errorMessage = error.message;
                setError(errorMessage);
                // ...
            });
        }

    }
    const handleLogin = () => {
        if(email === '' || password === ''){
            setError('You cannot submit an empty field');
        } else {
            FirebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then((resp ) => {
                console.log('login reponse', resp)

                if (resp) {
                    openNotification('login');
                }
            })
            .catch(function (error) {
                // Handle Errors here.
                //var errorCode = error.code;
                var errorMessage = error.message;
                setError(errorMessage);
                // ...
            });
        }
 
    }

    const changeEmail = (e: any) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    const changePassword = (e: any) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    }

    return (
        <div className='wrapper'>
            <div className='formwrapper'>
                {
                    showForm === 'login' ?
                        <Card title="Login" className='cardStyle'>
                            <Input
                                placeholder="Enter your email"
                                name="email"
                                type='email'
                                onChange={changeEmail}
                                style={{ margin: 10 }}
                            />
                            <Input
                                placeholder="Enter your password"
                                name="password"
                                type='password'
                                onChange={changePassword}
                                style={{ margin: 10 }}
                            />
                            <Button onClick={handleLogin} className={'margin'}>Login</Button>
                            {error ? <p>{error}</p> : null}
                            <p onClick={() => setShowForm('register')} className={'margin'}>Don't have an account? <span>Register.</span></p>
                        </Card>
                        :

                        <Card title="Register" className='cardStyle'>
                            <Input
                                placeholder="Enter your email"
                                name="email"
                                type='email'
                                onChange={changeEmail}
                                style={{ margin: 10 }}

                            />
                            <Input
                                placeholder="Enter your password"
                                name="password"
                                type='password'
                                onChange={changePassword}
                                style={{ margin: 10 }}
                            />
                            <Button onClick={handleRegister} className={'margin'}>Register</Button>
                            {error ? <p>{error}</p> : null}
                            <p onClick={() => setShowForm('login')} className={'margin'}>Already have an account? <span>Login Here</span></p>
                        </Card>
                }


            </div>

           
        </div>
    );
}



export default Auth;