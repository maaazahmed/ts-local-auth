"use strict";
console.log("app is starting");
function inputVerification(data) {
    if (data.username !== "" &&
        data.email !== "" &&
        data.password !== "" &&
        data.confirmPassword !== "") {
        return true;
    }
    return false;
}
;
function emailValidation(newMail, users) {
    const user = users.find((x) => x.email == newMail);
    console.log(user);
    if (user) {
        return user;
    }
    return null;
}
function userId() {
    return "id_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
}
;
class Authentication {
    constructor() {
        this.username = document.querySelector("#user-name");
        this.password = document.querySelector("#password");
        this.confirmPassword = document.querySelector("#confirm-password");
        this.email = document.querySelector("#user-email");
        this.submitButtom = document.querySelector("#create-button");
    }
    ;
}
;
class SignUp extends Authentication {
    constructor() {
        super();
        this.assignEventListeners();
    }
    ;
    assignEventListeners() {
        this.submitButtom.addEventListener("click", this.submit.bind(this));
    }
    ;
    submit() {
        const signUpData = {
            username: (this.username.value = "Maaz"),
            password: (this.password.value = "pass"),
            confirmPassword: (this.confirmPassword.value = "pass"),
            email: this.email.value,
        };
        const varification = inputVerification(signUpData);
        if (varification) {
            const fetched = fetching.getData();
            const userID = userId();
            const user = {
                userID: userID,
                username: signUpData.username,
                password: signUpData.password,
                email: signUpData.email,
            };
            if (fetched && fetched.length) {
                const isEmailAvailble = emailValidation(user.email, fetched);
                if (isEmailAvailble) {
                    alert("Email is not available please use deffernt email address");
                }
                else {
                    fetched.push(user);
                    fetching.saveData(fetched);
                }
            }
            else {
                fetched.push(user);
                fetching.saveData(fetched);
            }
            ;
        }
        ;
    }
    ;
}
;
class UserCollection {
    constructor(userID, username, email, password) {
        this.userID = userID;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
class HandleData {
    constructor() {
        this.userList = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new HandleData();
            return this.instance;
        }
        ;
    }
    ;
    getData() {
        const data = localStorage.getItem("userList");
        if (data) {
            console.log(data, "-000000000000000000");
            return JSON.parse(data);
        }
        else {
            return [];
        }
        ;
    }
    ;
    saveData(data) {
        if (data) {
            localStorage.setItem("userList", JSON.stringify(data));
        }
        else {
            localStorage.setItem("userList", JSON.stringify(this.userList));
        }
        ;
    }
    ;
}
;
const fetching = HandleData.getInstance();
const signUp = new SignUp();
