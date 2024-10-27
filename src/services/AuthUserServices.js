class AuthUserServices{

    static async handleSignOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("phone");
        localStorage.removeItem("role");
        localStorage.removeItem("userData");
    }

    static async isUserLoggedIn(){
        if (localStorage.getItem("token")) {
            return true;
        }
        return false;
    }
}

export default AuthUserServices;