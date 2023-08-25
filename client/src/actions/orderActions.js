import axios from 'axios';
import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getOrders = (id) => dispatch => {
    dispatch(setOrdersLoading());
    axios.get(`/api/orders/${id}`)
        .then(res => dispatch({
            type: GET_ORDERS,
            payload: res.data
        })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const checkout = (id, source) => dispatch => {
    axios.post(`/api/orders/${id}`, { source })
        .then(res => dispatch({
            type: CHECKOUT,
            payload: res.data
        })).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setOrdersLoading = () => {
    return {
        type: ORDERS_LOADING
    }
}
