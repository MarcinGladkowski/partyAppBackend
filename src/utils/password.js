import bcrypt from 'bcrypt';

export async function hashString(password) {
    return await bcrypt.hash(password, 10);
}