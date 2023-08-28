const BaseUrl = 'http://localhost:3000/api/'

export const api = {
    // Auth apis start here 
        Register: `${BaseUrl}create_new_User`,
        OTP: `${BaseUrl}otp_verify`,
        Login: `${BaseUrl}login`,
        Logout: `${BaseUrl}logout`,
        Show_Profile: `${BaseUrl}profile`,
    // Resend_OTP : `${BaseUrl}resend-otp`,
    // Forget_Password: `${BaseUrl}forget-password`,
    // Update_Password: `${BaseUrl}update-password`,
    // Change_Password: `${BaseUrl}change-password`,
    // Update_Profile: `${BaseUrl}update-profile`,
    // Auth apis end here 

    // Task apis start here
        CreateTask: `${BaseUrl}createtask`,
        GetTask: `${BaseUrl}get`,
    // Task apis end here
   
};