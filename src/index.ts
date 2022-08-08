interface SignInData {
  userEmail: string;
  userPassword: string;
}

interface SignUpData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

type EmailValidation = UserCollection | null;
type SaveDateType = UserCollection[] | null;

function inputVerification(data: SignUpData): boolean {
  if (
    data.username !== "" &&
    data.email !== "" &&
    data.password !== "" &&
    data.confirmPassword !== ""
  ) {
    return true;
  }
  return false;
}

function inputVerificationForSignin(data: SignInData): boolean {
  if (data.userEmail !== "" && data.userPassword !== "") {
    return true;
  }
  return false;
}

function emailValidation(newMail: string, users: UserCollection[]) {
  const user = users.find((x) => x.email == newMail);
  console.log(user);
  if (user) {
    return user;
  }
  return null;
}

function userId(): string {
  return "id_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

class Authentication {
  username: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  email: HTMLInputElement;
  submitButtom: HTMLButtonElement;

  // Login feilds
  loginEmail: HTMLInputElement;
  loninButton: HTMLButtonElement;
  userPass: HTMLInputElement;

  constructor() {
    this.username = document.querySelector("#user-name") as HTMLInputElement;
    this.password = document.querySelector("#password") as HTMLInputElement;
    this.confirmPassword = document.querySelector(
      "#confirm-password"
    ) as HTMLInputElement;
    this.email = document.querySelector("#user-email") as HTMLInputElement;
    this.submitButtom = document.querySelector(
      "#create-button"
    ) as HTMLButtonElement;
    this.loginEmail = document.querySelector("#email") as HTMLInputElement;
    this.userPass = document.querySelector("#pass") as HTMLInputElement;
    this.loninButton = document.querySelector(
      "#login-button"
    ) as HTMLButtonElement;
  }
}

class SignUp extends Authentication {
  constructor() {
    super();
    this.assignEventListeners();
  }
  private assignEventListeners() {
    this.submitButtom.addEventListener("click", this.submit.bind(this));
  }

  submit() {
    const signUpData: SignUpData = {
      username: (this.username.value = "Maaz"),
      password: (this.password.value = "pass"),
      confirmPassword: (this.confirmPassword.value = "pass"),
      email: this.email.value,
    };

    const varification: boolean = inputVerification(signUpData);
    if (varification) {
      const fetched = fetching.getData();
      const userID = userId();
      const user: UserCollection = {
        userID: userID,
        username: signUpData.username,
        password: signUpData.password,
        email: signUpData.email,
      };
      if (fetched && fetched.length) {
        const isEmailAvailble: EmailValidation = emailValidation(
          user.email,
          fetched
        );
        if (isEmailAvailble) {
          alert("Email is not available please use deffernt email address");
        } else {
          fetched.push(user);
          fetching.saveData(fetched);
        }
      } else {
        fetched.push(user);
        fetching.saveData(fetched);
      }
    }
  }
}

class SignIn extends Authentication {
  constructor() {
    super();
    this.assignEventListeners();
  }

  private assignEventListeners() {
    this.loninButton.addEventListener("click", this.submit.bind(this));
  }
  submit() {
    const email = this.loginEmail.value;
    const password = this.userPass.value;
    const varification = inputVerificationForSignin({
      userEmail: email,
      userPassword: email,
    });
    if (varification) {
      const userData: UserCollection[] = fetching.getData();
      const validation = emailValidation(email, userData);
      if (validation?.password == password) {
        console.log(validation, "---------------");
        fetching.setCurrentUser(validation);
      } else {
        alert("Invalid email or passwrod");
      }
    }
  }
}

class UserCollection {
  constructor(
    public userID: string,
    public username: string,
    public email: string,
    public password: string
  ) {}
}

class HandleData {
  private static instance: HandleData;
  userList: UserCollection[] = [];
  constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new HandleData();
      return this.instance;
    }
  }

  public getData(): UserCollection[] {
    const data = localStorage.getItem("userList");
    if (data) {
      console.log(data, "-000000000000000000");
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  saveData(data: SaveDateType) {
    if (data) {
      localStorage.setItem("userList", JSON.stringify(data));
    } else {
      localStorage.setItem("userList", JSON.stringify(this.userList));
    }
  }

  setCurrentUser(user: UserCollection) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
}

const fetching = HandleData.getInstance();
const signUp = new SignUp();
const signIn = new SignIn();
