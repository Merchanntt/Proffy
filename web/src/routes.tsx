import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';

const Router: React.FC = () => (
  <BrowserRouter>
    <Route path="/" exact component={Landing} />
    <Route path="/give-classes" component={TeacherForm} />
    <Route path="/study" component={TeacherList} />
  </BrowserRouter>
);

export default Router;
