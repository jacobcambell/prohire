export const AdminLogin = (p) => {
    // Returns true if the provided admin password is correct, and false if incorrect
    if (p === process.env.ADMIN_PASSWORD) {
        return true;
    }
    else {
        return false;
    }
}