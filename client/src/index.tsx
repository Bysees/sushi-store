import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider, SnackbarProviderProps } from 'notistack'
import MainRouter from './components/common/MainRouter'
import AuthProvider from './components/AuthProvider'
import App from './App'
import store from './redux/store'

const snakbarOptions: SnackbarProviderProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  autoHideDuration: 3000,
  style: { fontSize: '1.3rem' }
} as const

ReactDOM.render(
  <MainRouter>
    <Provider store={store}>
      <AuthProvider>
        <SnackbarProvider {...snakbarOptions}>
          <App />
        </SnackbarProvider>
      </AuthProvider>
    </Provider>
  </MainRouter>,
  document.getElementById('root')
)
