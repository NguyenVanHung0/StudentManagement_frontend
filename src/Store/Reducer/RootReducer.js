const initState = {
    account: {},
    navActive: "Trang chủ",
    teacherId: ""
}

function RootReducer(state = initState, action) {
    switch (action.type) {
        case 'SET_ACCOUNT':
            return { ...state, account: action.payload }
        case 'SET_NAV':
            return { ...state, navActive: action.payload }
        case 'SET_TEACHERID':
            return { ...state, teacherId: action.payload }
        default:
            return state;
    }

}

export default RootReducer;