import {
    ZONG,
    BANK,
    PRODUCT,
    ADDLIST
} from './actionTypes'
import { 
    getWalletHoldingsStatistic, 
    findInvestorBankDetailsToSell,
    findWalletHoldingsFunds
} from '../api'

const getZongAction = (dispatch) => {
    getWalletHoldingsStatistic().then(res => {
        dispatch({
            type: ZONG,
            data: res.data
        })
    })
}

const getBankAction = (dispatch) => {
    findInvestorBankDetailsToSell().then(res => {
        dispatch({
            type: BANK,
            data: res.data
        })
    })
}

const getProductAction = (dispatch) => {
    findWalletHoldingsFunds().then(res => {
        dispatch({
            type: PRODUCT,
            data: res.data
        })
    })
}

const getListAction = (data) => {
    return{
        type: ADDLIST,
        data
    }
}

export default {
    getZongAction,
    getBankAction,
    getProductAction,
    getListAction
}