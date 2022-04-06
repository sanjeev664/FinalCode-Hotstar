const initialStateList = {
    LoginDetails: []
}

function Commands(state = initialStateList, action) {
    switch (action.type) {
        case "LoginDetailsSave":
            return {
                LoginDetails: [{ id: action.payload.id, MobileNumber: action.payload.MobileNumber, created_at: action.payload.created_at, login_token: action.payload.login_token }]
            }
        case "LogoutUser":
            return {
                LoginDetails: []
            }
        default: return state
    }
}

export default Commands;

