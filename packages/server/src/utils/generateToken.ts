import jwt from 'jsonwebtoken';
interface Params {
    type: number;
}
export default (params: Params, expiresIn = 86400, key = process.env.HASH_1_SECRET as string) => {
    return jwt.sign(params, key, {
        expiresIn
    })

}