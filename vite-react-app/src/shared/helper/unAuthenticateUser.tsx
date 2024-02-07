export default function unAuthenticateUser() {
    localStorage.remove("token");
    console.log("The Customer is Log out ");
    
}