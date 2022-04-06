export const LoginDetailsSave = (id, MobileNumber, created_at, login_token) => {
    return {
        type: "LoginDetailsSave",
        payload: {
            id: id,
            MobileNumber: MobileNumber,
            created_at: created_at,
            login_token: login_token
        }
    }
}

export const LogoutUser = () => {
    return {
        type: "LogoutUser"
    }
}


