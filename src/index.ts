console.log("app is starting");

interface SignUpData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

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

class SignUp {
  username: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  email: HTMLInputElement;
  submitButtom: HTMLButtonElement;

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
    this.assignEventListeners();
  }

  submit() {
    const signUpData: SignUpData = {
      username: (this.username.value = "Maaz"),
      password: (this.password.value = "pass"),
      confirmPassword: (this.confirmPassword.value = "pass"),
      email: (this.email.value = "email"),
    };

    const varification: boolean = inputVerification(signUpData);
    if (varification) {
      const fetched = fetching.storeData(signUpData);
    } else {
      console.log("all fields are required");
    }
  }

  private assignEventListeners() {
    console.log(this.submitButtom);
    this.submitButtom.addEventListener("click", this.submit.bind(this));
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
  public getData() {
    const data = localStorage.getItem("userList");
    return data;
  }

  checkUser(data: UserCollection, fetched: UserCollection[]): boolean {
    const isValidEmail = fetched.find((x) => x.email === data.email);
    if (!isValidEmail) {
      return true;
    } else {
      return false;
    }
  }

  saveData(data: UserCollection[]) {
    localStorage.setItem("userList", JSON.stringify(this.userList));
  }

  public async storeData(data: SignUpData) {
    const userData: UserCollection = {
      username: data.username,
      email: data.email,
      password: data.password,
      userID: (
        Math.random() *
        1023423423423 *
        Math.random() *
        1324232350
      ).toString(),
    };
    const fetched = await this.getData();
    if (!fetched) {
      this.userList.push(userData);
    } else {
      this.userList = JSON.parse(fetched);
      this.userList.push(userData);
      console.log(this.userList, "fetched");
    }
    this.saveData(this.userList);
  }
}

const signUp = new SignUp();
const fetching = HandleData.getInstance();
