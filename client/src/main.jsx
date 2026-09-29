import { createRoot } from 'react-dom/client'
import './index.css'
import MainRoute from './routes/MainRoute.jsx'
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { Store } from './app/Store.jsx';
createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <MainRoute/>
        <ToastContainer/>
    </Provider>    
)
