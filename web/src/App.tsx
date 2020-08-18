import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthContext';

import './styles/global.css';

import Router from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Router />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
