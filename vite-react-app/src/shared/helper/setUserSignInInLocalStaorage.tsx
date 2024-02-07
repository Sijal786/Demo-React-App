const setUserSignInInLocalStorage = (token: string, email: any) => {
  localStorage.setItem("email", email);
  localStorage.setItem("token", token);
};

export default setUserSignInInLocalStorage;
