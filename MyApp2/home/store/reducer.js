import {
    ZONG,
    BANK,
    PRODUCT,
    ADDLIST
} from './actionTypes'

const defaultState = {
    data: [1],
    zong: [],
    bank: [],
    product: [],
    list: []
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case ZONG:
            return Object.assign({}, state, {
                zong: action.data
            })
        case BANK:
            return Object.assign({}, state, {
                bank: action.data
            }) 
        case PRODUCT:
            return Object.assign({}, state, {
                product: action.data,
                list: action.data.slice(0,2)
            })
        case ADDLIST:
            return Object.assign({}, state, {
                list: action.data
            })
        default:
            return state
    }
}