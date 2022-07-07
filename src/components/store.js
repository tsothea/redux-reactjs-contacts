import {createStore} from 'redux';
import reducer from './reducer'


const contacts = createStore(reducer);

export default contacts;