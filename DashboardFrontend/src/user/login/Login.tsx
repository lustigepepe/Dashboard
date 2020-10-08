import React, { Component, useEffect, useState } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import { login } from '../../util/APIUtils';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import Alert from 'react-s-alert';
import AppState from '../../app/App';
import { useLocation, useHistory, Link } from 'react-router-dom';

interface LoginProps {
    authenticated: boolean,
    login: (loginRequest: any) => Promise<any>
}

const Login: React.FC<LoginProps> = (props) => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
        // Here we display the error and then remove the error query parameter from the location.
        // if (location.state && props.error) {
        //     setTimeout(() => {
        //         Alert.error(props.error, {
        //             timeout: 5000
        //         });
        //         history.replace({
        //             pathname: location.pathname,
        //             state: {}
        //         });
        //     }, 100);
        // }

        if (props.authenticated) {
            if (history.location.state /* && history.location.state.from */) {
                const state = history.location.state as any;
                history.replace({ pathname: state.from.pathname });
            } else {
                history.push({
                    pathname: '/metrics',
                    state: { location }
                });
            }
        }
    });

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to Urban Media Dashboard</h1>
                <LoginForm {...props} />
                <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
            </div>
        </div>
    );
}

interface LoginFormState {
    [key: string]: any;
}

const LoginForm: React.FC<LoginProps> = (props) => {
    const history = useHistory();
    const [loginFormState, setLoginFormState] = useState<LoginFormState>({
        email: '',
        password: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const inputName: string = target.name;
        const inputValue: string = target.value;

        let temp = {} as LoginFormState;
        temp = loginFormState;
        temp[inputName] = inputValue;
        setLoginFormState({ ...loginFormState });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const loginRequest = Object.assign({}, loginFormState);
        props.login(loginRequest).then(() => {
            history.push("/metrics");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
            console.error(error && error.message);
        });

        // login(loginRequest)
        //     .then(response => {
        //         localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        //         props.authenticated = true;
        //         Alert.success("You're successfully logged in!");
        //         history.push("/metrics");
        //     }).catch(error => {
        //         Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
        //     });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input type="email" name="email"
                    className="form-control" placeholder="Email"
                    value={loginFormState.email || ""} onChange={handleInputChange} required />
            </div>
            <div className="form-item">
                <input type="password" name="password"
                    className="form-control" placeholder="Password"
                    value={loginFormState.password || ""} onChange={handleInputChange} required />
            </div>
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">Login</button>
            </div>
        </form>
    );
}

export default Login
