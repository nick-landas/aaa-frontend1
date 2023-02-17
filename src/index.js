import React, { createContext } from 'react'
import { createRoot }from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import actionCable from 'actioncable'

import Auth0ProviderWithNavigate from './Auth0ProviderWithNavigate'
import App from './App'
import store from './store'
import theme from './theme'
import { WS_ROOT } from './api/iluvlachat'
import { fetchUsers } from './features/users/usersSlice'

store.dispatch(fetchUsers())

const CableApp = {}
CableApp.cable = actionCable.createConsumer(WS_ROOT)

export const ActionCableContext = createContext()

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <Provider store={store}>
      <Auth0ProviderWithNavigate>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ActionCableContext.Provider value={CableApp.cable}>
            <App />
          </ActionCableContext.Provider>
        </ThemeProvider>
      </Auth0ProviderWithNavigate>
    </Provider>
  </Router>,
)
