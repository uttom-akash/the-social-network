import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter} from 'react-router-dom'

import { loadProgressBar } from 'axios-progress-bar'
import 'axios-progress-bar/dist/nprogress.css'

import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './redux/reducers/RootReducer'
import {refresh} from './redux/actions/AccountAction'

const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

if(!!localStorage.getItem('user')){
   store.dispatch(refresh())
}

loadProgressBar()

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

serviceWorker.unregister();
