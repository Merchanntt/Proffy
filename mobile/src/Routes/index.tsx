import React from 'react'
import { UseAuth } from '../hooks/auth'

import AuthRoutes from './auth.route.Stack'
import AppRoutes from './app.route.Stack'

const Routes: React.FC = () => {
  const {user} = UseAuth()

  return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes