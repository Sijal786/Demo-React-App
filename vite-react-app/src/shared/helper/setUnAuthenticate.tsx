export default function isAuthenticated() {
    const unAuthenticate = localStorage.remove("token");
    return !!unAuthenticate;
}