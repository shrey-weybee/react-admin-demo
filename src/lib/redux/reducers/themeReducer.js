const initialState = {
    sidebarShow: true,
}
const themeReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case '[THEME] set':
            return { ...state, ...rest }
        default:
            return state
    }
}
export default themeReducer