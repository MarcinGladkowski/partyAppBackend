import bcrypt from 'bcrypt';

export async function hashString(password) {
    var hashPwd = await bcrypt.hash(password, 10);
    return hashPwd;
}