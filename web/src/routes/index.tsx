import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './auth.routes';

import LogIn from '../pages/LogIn';
import CreateAccount from '../pages/CreateAccount';
import ForgotPassword from '../pages/ForgotPassword';
import RecoverPassword from '../pages/RecoverPassword';
import CreateUserPage from '../pages/SuccessPage/CreateUserPage';
import SendEmailPage from '../pages/SuccessPage/SendEmailPage';
import RecoverPasswordPage from '../pages/SuccessPage/RecoverPasswordPage';
import CreateClassPage from '../pages/SuccessPage/CreateClassPage';
import Landing from '../pages/landing';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeacherList';
import UserPerfil from '../pages/UserPerfil';

const Router: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LogIn} />

    <Route path="/create-account" component={CreateAccount} />
    <Route path="/success-user" component={CreateUserPage} />

    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/success-send" component={SendEmailPage} />

    <Route path="/recover-password" component={RecoverPassword} />
    <Route path="/success-recover" component={RecoverPasswordPage} />

    <Route path="/landing" component={Landing} isPrivate />
    <Route path="/perfil" component={UserPerfil} isPrivate />
    <Route path="/study" component={TeacherList} isPrivate />

    <Route path="/give-classes" component={TeacherForm} isPrivate />
    <Route path="/success-class" component={CreateClassPage} isPrivate />
  </Switch>
);

export default Router;
