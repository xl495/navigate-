import {
    SET_IS_SETING
} from './mutations-types'
export default {
    [SET_IS_SETING](state, type) {
        state.is_setting = type
    }
}