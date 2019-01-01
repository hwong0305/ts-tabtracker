export interface User {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface userLogin {
    username: string;
    password: string;
}

export interface LoginForm {
    username: string;
    password: string;
    formError: boolean;
    usernameError: string;
    passwordError: string;
}

export interface RegisterForm {
    formError: boolean;
    username: string;
    usernameError: string;
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    firstName: string;
    firstNameError: string;
    lastName: string;
    lastNameError: string;
}
