// el store de redux va a necesitar que le indiquemos cuál es su reducer

import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;