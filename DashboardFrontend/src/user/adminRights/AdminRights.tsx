import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Route,
  Switch, Redirect
} from 'react-router-dom';
import { BASIC_BLUE, basicWhite, BASIC_GOLD, ROW_COLUMN_BREAK_POINT } from '../../styledComponent/StyleConstants';

import AppHeader from '../../common/AppHeader';
import Metrics from '../../metrics/Metrics';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Profile from '../profile/Profile';
import OAuth2RedirectHandler from '../oauth2/OAuth2RedirectHandler';
import NotFound from '../../common/NotFound';
import LoadingIndicator from '../../common/LoadingIndicator';
import { getAllUsers, getUser } from '../../util/APIUtils';
import { ACCESS_TOKEN, RequestTyp } from '../../constants';
import PrivateRoute from '../../common/PrivateRoute';
import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './AdminRights.css';
import { login } from '../../util/APIUtils';
import { CheckboxFilter, CheckboxBlock } from '../../styledComponent/Molecule/Filter';
import DataPickers from '../../styledComponent/Molecule/DatePicker'
import { StandardLayout, VerticalLayout } from '../../styledComponent/SideLayout';
import { Checkboxes } from '../../styledComponent/Molecule/Filter'



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

const AdminContainer = styled.div<{ destrictWidth?: string }>`
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

  @media (max-width: ${ROW_COLUMN_BREAK_POINT}) {
    margin-top: ${props => props.destrictWidth ? '10px' : '80px'};
    margin-left: 0 !important;
  }

`;
const AdminDialog = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 30px;
  color: rgba(0, 0, 0, 0.65);

`;

const SearchButton = styled.button`
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
  id: number;
  name: String;
  email: String;
  root: boolean
}

const AdminRights: React.FC<AdminRightsProps> = (props) => {
  const [checkboxColumnOne, setCheckboxColumnOne] = useState<Array<Checkboxes>>([
    { label: 'Select all', checked: false },
    { label: 'Ad Manager', checked: false },
    { label: 'Appnexus', checked: false },
    { label: 'OpenX', checked: false },
    { label: 'Outbrian', checked: false },
    { label: 'Just Premium', checked: false }
  ]);
  const [checkboxColumnTwo, setCheckboxColumnTwo] = useState<Array<Checkboxes>>([
    { label: 'Unselect all', checked: false },
    { label: 'YieldLab', checked: false },
    { label: 'Teads', checked: false }

  ]);
  const [isResolvedList, setIsResolvedList] = useState(true);
  const [resolvedList, setResolvedList] = useState<Array<IUser>>([]);
  const [editUser, setEditUser] = useState<IUser | null>();
  const history = useHistory();
  const [adminEmailOrName, setAdminEmailOrName] = useState<string>('');
  const userInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const user = event.target.value;
    setAdminEmailOrName(user);
    if (user.includes('@')) {

    }
    else {

    }

  }
  const onCheckboxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {

    // setState({ ...state, [event.target.name]: event.target.checked });
    var boxes: Array<Checkboxes>;
    var column: number = -1;
    if (e.currentTarget.name === 'one') {
      boxes = checkboxColumnOne;
      column = 1;
    } else {
      boxes = checkboxColumnTwo;
      column = 2

    }
    for (let ob of boxes) {
      if (ob.label === e.currentTarget.value) {
        if (ob.label === 'Select all') {
          selectAll();
          break;

        } else if (ob.label === 'Unselect all') {
          unSelectAll();
          break;
        }

        ob.checked = !ob.checked;
        if (column === 1) {
          setCheckboxColumnOne([...boxes]);
        } else if (column === 2) {
          setCheckboxColumnTwo([...boxes]);
        }
      }
    }
    console.log('lkjhgfds---', e.currentTarget.value, ' && ', e.currentTarget.checked, ' %% ', e.currentTarget.name);
  }

  const selectAll = () => {
    var checkColumnOne = checkboxColumnOne;
    var checkColumnTwo = checkboxColumnTwo;

    for (var ob of checkColumnOne) {
      ob.checked = true;
    }
    for (var ob of checkColumnTwo) {
      ob.checked = true;
    }
    setCheckboxColumnOne([...checkColumnOne]);
    setCheckboxColumnTwo([...checkColumnTwo]);
  }

  const unSelectAll = () => {
    var checkColumnOne = checkboxColumnOne;
    var checkColumnTwo = checkboxColumnTwo;

    for (var ob of checkColumnOne) {
      ob.checked = false;
    }
    for (var ob of checkColumnTwo) {
      ob.checked = false;
    }
    setCheckboxColumnOne([...checkColumnOne]);
    setCheckboxColumnTwo([...checkColumnTwo]);

  }
  useEffect(() => {
    // getAllUsers()
    //   .then(response => {
    //     const responseData = [];
    //     for (let x of response) {
    //       responseData.push({ id: x.id, name: x.name, root: x.root, email: x.email });
    //     }
    //     setResolvedList(responseData);
    //   });
  }, []);

  // const selectedUser = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  const selectedUser = (e: number) => {

    console.log('Clicked User: ', e);
    setEditUser(resolvedList[e]);
    setResolvedList([]);
    // console.log('Clicked User: ', e.target.textContent);
  }

  function validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const searchUser = () => {
    if (editUser) {
      setEditUser(null);
    }
    console.log('asminrr::: ', adminEmailOrName.includes('@'));
    getUser(adminEmailOrName, adminEmailOrName.includes('@') ? RequestTyp.Email : RequestTyp.Name)
      .then(response => {
        const responseData = [];
        for (let x of response) {
          responseData.push({ id: x.id, name: x.name, root: x.root, email: x.email });
        }
        (responseData.length === 1) ? setEditUser(responseData[0]) : setResolvedList([...responseData]);
        console.log('everthing: ', response);
      }).catch((e) => {
        Alert.error(`Probably input field is empty!  / Error:  ${e.error}`);
      });
  }
  const allUsers = () => {
    if (editUser) {
      setEditUser(null);
    }
    getAllUsers()
      .then(response => {
        const responseData = [];
        for (let x of response) {
          responseData.push({ id: x.id, name: x.name, root: x.root, email: x.email });
        }
        (responseData.length === 1) ? setEditUser(responseData[0]) : setResolvedList([...responseData]);
        console.log('All data:', responseData);
      });
  }
  function ListItemLink(props: any) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <StandardLayout /* bColor={basicGold} */ top='50px' direction='column'>
      <AdminContainer>
        < AdminContainerLabel>
          Distribute rights
         </AdminContainerLabel>
        <AdminDialog>
          <AdminInput type='text' placeholder='Insert email or username' value={adminEmailOrName} onChange={userInputChanged} />
        </AdminDialog>
        <SearchButton type='button' onClick={searchUser}> Search for user*</SearchButton>

        <SearchButton type='button' onClick={allUsers}> Show all users </SearchButton>
        <List style={{ display: isResolvedList ? 'block' : 'none' }} aria-label="result userlist">
          {resolvedList.map((ele, index) => {
            return (
              <ListItem key={ele.name + index.toString()} style={{ borderRadius: '4px' }} onClick={() => selectedUser(index)} button>
                <ListItemText primary={ele.name} style={{ flex: '40%' }} />
                <ListItemText primary={ele.email} style={{ flex: '60%' }} />
              </ListItem>
            )
          })}
        </List>
      </AdminContainer>
      {editUser &&
        <AdminContainer style={{ marginLeft: '10px' }} destrictWidth='true'>
          <CheckboxFilter checkboxes={{ columnOne: checkboxColumnOne, columnTwo: checkboxColumnTwo }} onCheckboxChanged={onCheckboxChanged} />
        </AdminContainer>
      }
    </StandardLayout >
  );
}
/* style={{ flexShrink: 1} */



export default AdminRights;
