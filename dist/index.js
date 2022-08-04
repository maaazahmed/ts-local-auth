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
class SignUp {
    constructor() {
        this.username = document.querySelector("#user-name");
        this.password = document.querySelector("#password");
        this.confirmPassword = document.querySelector("#confirm-password");
        this.email = document.querySelector("#user-email");
        this.submitButtom = document.querySelector("#create-button");
        this.assignEventListeners();
    }
    submit() {
        const signUpData = {
            username: (this.username.value = "Maaz"),
            password: (this.password.value = "pass"),
            confirmPassword: (this.confirmPassword.value = "pass"),
            email: (this.email.value = "email"),
        };
        const varification = inputVerification(signUpData);
        if (varification) {
            const fetched = fetching.storeData(signUpData);
        }
        else {
            console.log("all fields are required");
        }
    }
    assignEventListeners() {
        console.log(this.submitButtom);
        this.submitButtom.addEventListener("click", this.submit.bind(this));
    }
}
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
    }
    getData() {
        const data = localStorage.getItem("userList");
        return data;
    }
    checkUser(data, fetched) {
        const isValidEmail = fetched.find((x) => x.email === data.email);
        if (!isValidEmail) {
            return true;
        }
        else {
            return false;
        }
    }
    saveData(data) {
        localStorage.setItem("userList", JSON.stringify(this.userList));
    }
    async storeData(data) {
        const userData = {
            username: data.username,
            email: data.email,
            password: data.password,
            userID: (Math.random() *
                1023423423423 *
                Math.random() *
                1324232350).toString(),
        };
        const fetched = await this.getData();
        if (!fetched) {
            this.userList.push(userData);
        }
        else {
            this.userList = JSON.parse(fetched);
            this.userList.push(userData);
            console.log(this.userList, "fetched");
        }
        this.saveData(this.userList);
    }
}
const signUp = new SignUp();
const fetching = HandleData.getInstance();
