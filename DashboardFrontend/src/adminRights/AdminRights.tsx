import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Route,
  Switch, Redirect
} from 'react-router-dom';
import AppHeader from '../common/AppHeader';
import Metrics from '../metrics/Metrics';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import PrivateRoute from '../common/PrivateRoute';
import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './AdminRights.css';
import { login } from '../util/APIUtils';
import { StandardLayout, VerticalLayout } from '../styledComponent/SideLayout';



const AdminInput = styled.input`
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  display: inline-block;
  padding: 4px 11px;
  width: 100%;
  height: 45px;
  font-size: 0.87em;
  color: rgba(0,0,0,.80);
  background-color: #fff;
  background-image: none;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  transition: all .3s;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  outline: 0;
  &:focus {
    box-shadow: 0 0 0 2px rgba(24,144,255,.2);  
    border-color: #40a9ff;
  }
  &:hover{
    border-color: #40a9ff;
    border-right-width: 1px!important;
  }

`;
const AdminContainerLabel = styled.h1`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.65);
`;

const AdminContainer = styled.div`
  background: #fff;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
  
  border-radius: 2px;
  width: 600px;
  display: inline-block;
  margin-top: 80px;
  vertical-align: middle;
  position: relative;    
  padding: 35px;
  text-align: center;

`;
const AdminDialog = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.65);

`;

const ShowAllButton = styled.button`
  margin-bottom: 18px;
  width: 100%;
  color: #fff;
  background-color: #2098f3;
  border-color: #2098f3;
  border-radius: 4px;
	border-style: solid;

  height: 45px;
  outline: none;

  font-size: 14px;
  font-weight: 400;
&:hover {
  background-color: #40a9ff;
  border-color: #40a9ff; 
}`;

interface AdminRightsProps {

  authenticated: boolean
  // [key: string]: any;



}
interface IUser {
  name: String;
}

const AdminRights: React.FC<AdminRightsProps> = (props) => {
  const [isResolvedList, setIsResolvedList] = useState(true);
  const [resolvedList, setResolvedList] = useState<Array<IUser>>([{ name: 'default-John' }, { name: 'default-Tim' }]);
  const history = useHistory();
  const [adminEmailOrName, setAdminEmailOrName] = useState('');
  const userInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const user = event.target.value;
    setAdminEmailOrName(user);
    if (user.includes('@')) {

    }
    else {

    }

  }

  useEffect(() => {
    console.log('History check A-R: ', history, ' state: ', history.location.state);

  }, []);

  // const selectedUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const selectedUser = (e: any) => {


    console.log('Clicked User: ', e.target.textContent);
  }

  function ListItemLink(props: any) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <StandardLayout /* bColor={basicGold} */ top='50px' wrap='column'>
      <AdminContainer>
        < AdminContainerLabel>
          Distribute rights
         </AdminContainerLabel>
        <AdminDialog>
          <AdminInput type='text' placeholder='Insert email or username' value={adminEmailOrName} onChange={userInputChanged} />
        </AdminDialog>
        <ShowAllButton type='button'> Show all users </ShowAllButton>
        <List style={{ display: isResolvedList ? 'block' : 'none' }} component="nav" aria-label="result userlist">
          {resolvedList.map((ele, index) => {
            return (
              <ListItem key={ele.name + index.toString()} style={{ borderRadius: '4px' }} onClick={selectedUser} button>
                <ListItemText primary={ele.name} />
              </ListItem>
            )
          })}
        </List>

      </AdminContainer>

    </StandardLayout >
  );
}



export default AdminRights;
