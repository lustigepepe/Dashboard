import React, {  useEffect } from 'react';
import {  NavLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from 'react-s-alert';

import './AppHeader.css';
// import { createMuiTheme } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//     palette: {
//         primary: {
//             light: '#757ce8',
//             main: '#3f50b5',
//             dark: '#002884',
//             contrastText: '#fff',
//         },
//         secondary: {
//             light: '#ff7961',
//             main: '#f44336',
//             dark: '#ba000d',
//             contrastText: '#000',
//         },
//     },
// });

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export const sides = { ADMIN_RIGHTS: 'Admin Rights', METRICS: 'Metrics' };

interface HeaderState {
    authenticated: boolean,
    onLogout: () => void,
}

const AppHeader: React.FC<HeaderState> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [action, setAction] = React.useState("");
    const changeToSide = (event: any) => {
        setAction(event.target.value);
        
        if (!props.authenticated){
            Alert.error('You are logged out!');
            return;
        }
        if (event.target.value === sides.METRICS)
            history.push("/metrics");
        if (event.target.value === sides.ADMIN_RIGHTS)
            history.push("/admin");
    };

    const logoClicked = () => {
        history.push('/');
    }

    useEffect(() => {
        // console.log('header history: ', props.authenticated);

    });

    const setLogout = () => {
        props.onLogout();
        history.push('/login');

    }

    const setLogin = () => {
        history.push('/login');
    }

    return (
        <header className="header-header">
            <div className="header-container">
                <div className="header-logo">
                    <svg style={{ margin: "20px 0 0 45px" }} height="35" width="122" stroke="rgba(0,0,0,0.65)" fill="#fff" viewBox="0 0 122 35.046701" onMouseDown={logoClicked}>
                        <path d="M36.3 1v22.3h13.4a3.743 3.743 0 0 0 2.68-1.096c.349-.35.623-.748.818-1.2.194-.455.291-.942.291-1.46v-9.25c0-.52-.097-1.01-.291-1.46-.2-.36-.5-.76-.8-1.11-.4-.34-.8-.61-1.2-.81-.5-.19-1-.29-1.5-.29h-10.3v-5.48h-3.15zM1 6.49v13c0 .519.098 1.01.293 1.46.195.451.466.849.816 1.2.351.345.754.616 1.21.809.457.191.948.287 1.47.287h9.64a3.743 3.743 0 0 0 2.68-1.096 3.686 3.686 0 0 0 1.111-2.66v-13h-3.1v13a.609.609 0 0 1-.191.447.617.617 0 0 1-.451.189h-9.7a.621.621 0 0 1-.453-.189c-.13-.1-.19-.2-.19-.4v-13H.975zm24.1 0a3.7 3.7 0 0 0-1.47.289 3.813 3.813 0 0 0-1.21.809c-.3.34-.6.74-.8 1.19-.2.46-.3.94-.3 1.42v13h3.15v-13a.61.61 0 0 1 .191-.449.624.624 0 0 1 .453-.188h9.46v-3.06h-9.46zm30.6 0v3.12h13.4c.176 0 .327.063.453.188s.189.276.189.449v3.06h-14.1v6.19c0 .519.099 1.01.293 1.46.196.451.467.849.816 1.2.35.345.755.616 1.21.809.456.191.951.287 1.47.287h13.4v-13c0-.52-.096-1.01-.289-1.46-.2-.5-.4-.9-.8-1.25-.3-.34-.7-.62-1.2-.81s-1-.29-1.5-.29h-13.4zm19.7 0v16.8h3.16v-13c0-.173.06-.324.188-.449s.28-.188.455-.188h9.64c.174 0 .325.063.453.188a.612.612 0 0 1 .189.449v13h3.15v-13c0-.52-.096-1.01-.291-1.46-.2-.47-.5-.87-.8-1.21-.4-.35-.8-.62-1.2-.81-.5-.19-1-.29-1.5-.29h-13.4zm37.4.504c-.43 0-.783.35-.783.779l-.004 3.01a.78.78 0 0 0 .781.777l3.05.002c.428 0 .781-.35.781-.777l.006-3.01a.782.782 0 0 0-.781-.78l-3.05-.001zm-72.9 2.62h9.63c.176 0 .326.063.453.188s.189.276.189.449v9.25a.607.607 0 0 1-.189.447.62.62 0 0 1-.453.189H39.9a.623.623 0 0 1-.453-.189.605.605 0 0 1-.191-.447v-9.25c0-.173.064-.324.191-.449s.277-.188.453-.188zm63 1.95c-.627 0-1.13.5-1.13 1.12v5.92c0 .618.505 1.12 1.13 1.12h5.98c.625 0 1.13-.503 1.13-1.12v-5.9c0-.621-.507-1.12-1.13-1.12zm8.33 4.41v3.86c0 .618-.505 1.12-1.13 1.12h-3.17v6.86c0 1.04.853 1.88 1.9 1.88h10.1c1.05 0 1.91-.844 1.91-1.88v-9.96c0-1.04-.854-1.89-1.91-1.89h-7.66zm-52.2.4h10.9v3.7h-10.3a.617.617 0 0 1-.451-.189.607.607 0 0 1-.193-.447v-3.07zm38.4 7.54a1.41 1.41 0 0 0-1.41 1.4v7.27c0 .77.633 1.4 1.41 1.4h6.99c.773 0 1.41-.63 1.41-1.4v-7.27c0-.769-.633-1.4-1.41-1.4zm-14.9.043a.303.303 0 0 0-.305.301v.875a.303.303 0 0 0 .301.303h.881a.304.304 0 0 0 .303-.303l.004-.873a.303.303 0 0 0-.301-.303h-.9zm-3.06.023v2.47h-4.62a1.686 1.686 0 0 0-1.211.492 1.673 1.673 0 0 0-.498 1.197v4.16c0 .234.043.455.131.658.087.204.21.385.367.543a1.695 1.695 0 0 0 1.211.49h6.04v-10h-1.4zm-27.9 2.47v7.54h1.42v-5.85a.27.27 0 0 1 .084-.203.285.285 0 0 1 .205-.086h3.02a.28.28 0 0 1 .203.086.274.274 0 0 1 .086.203v5.85h1.42v-5.85c0-.079.028-.146.084-.203a.288.288 0 0 1 .205-.086h3.01c.087 0 .16.03.219.086a.28.28 0 0 1 .084.203v5.85h1.41v-5.85c0-.235-.045-.454-.135-.656a1.741 1.741 0 0 0-.363-.543 1.754 1.754 0 0 0-.547-.36 1.704 1.704 0 0 0-.664-.132h-9.74zm14.5 0c-.237 0-.457.044-.662.131a1.695 1.695 0 0 0-.916.904 1.62 1.62 0 0 0-.131.656v4.16c0 .234.042.454.131.656.087.205.212.385.369.543a1.72 1.72 0 0 0 1.209.49h6.04v-1.4h-6.04a.275.275 0 0 1-.203-.088.264.264 0 0 1-.086-.199v-1.38h6.33v-2.78c0-.235-.045-.454-.133-.656a1.69 1.69 0 0 0-.912-.904 1.7 1.7 0 0 0-.664-.13h-4.34zm16.2 0v7.54h1.42v-7.54zm2.76 0v1.4h6.04c.08 0 .147.03.205.086a.28.28 0 0 1 .084.203v1.38h-6.33v2.79c0 .234.041.454.131.656.087.205.21.385.367.543.157.153.341.275.547.361.205.087.424.13.662.13h6.04v-5.85a1.65 1.65 0 0 0-.131-.657 1.736 1.736 0 0 0-.367-.543 1.703 1.703 0 0 0-1.211-.492h-6zm-18.9 1.5h4.34a.29.29 0 0 1 .205.086.272.272 0 0 1 .084.203v1.38h-4.91v-1.38c0-.079.029-.146.086-.203a.283.283 0 0 1 .203-.086zm8.73 0h4.33c.082 0 .148.03.207.086a.283.283 0 0 1 .084.203v4.16a.273.273 0 0 1-.084.201.28.28 0 0 1-.207.088h-4.33a.276.276 0 0 1-.205-.088.267.267 0 0 1-.086-.2v-4.16c0-.08.028-.146.086-.204a.28.28 0 0 1 .205-.086zm11.6 3.07h4.91v1.67h-4.62a.272.272 0 0 1-.203-.088.268.268 0 0 1-.086-.198v-1.38z"></path>
                    </svg>
                </div>
                <div className="header-sides" >
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Action</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={action}
                            onChange={changeToSide}
                            label="Action"
                        >
                            <MenuItem value={sides.ADMIN_RIGHTS}>{sides.ADMIN_RIGHTS}</MenuItem>
                            <MenuItem value={sides.METRICS}>{sides.METRICS}</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="header-options">
                    <nav className="header-nav">
                        {props.authenticated ? (
                            <ul>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                <li>
                                    <a onClick={setLogout}>Logout</a>
                                </li>
                            </ul>
                        ) : (
                                <ul>
                                    <li>
                                        <a onClick={setLogin}>Login</a>
                                    </li>
                                    <li>
                                        <NavLink to="/signup">Signup</NavLink>
                                    </li>
                                </ul>
                            )}
                    </nav>
                </div>
            </div>
        </header >
    )
}

export default AppHeader;