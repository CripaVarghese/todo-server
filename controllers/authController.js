import jwt from 'jsonwebtoken';
import config from '../config';
import * as authService from '../services/authService';

let refreshTokens = [];

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.token;
    if (refreshToken == null) return res.status(401);
    if (!refreshTokens.includes(refreshToken)) return res.status(403)
    try {
        const user = await jwt.verify(refreshToken, config.auth.refresh.secret);
        const accessToken = await jwt.sign({ user }, config.auth.secret, { expiresIn: config.auth.expiry });
        return res.status(200).send({
            accessToken
        })
    } catch (error) {
        return res.status(403).send();
    }
}

export const loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (username && email && password) {
        try {
            const dbUser = await authService.getUserByEmail(email);
            const { password: hash, ...user } = dbUser;
            const isAuthenticated = await authService.authenticateUser(dbUser, { username, password });
            if (isAuthenticated) {
                const accessToken = await jwt.sign({ user }, config.auth.secret, { expiresIn: config.auth.expiry });
                const refreshToken = await jwt.sign({ user }, config.auth.refresh.secret)
                refreshTokens.push(refreshToken)
                return res.status(200).send({
                    accessToken,
                    refreshToken,
                    success: true,
                    message: 'Successfully logged in'
                });
            }
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({
                success: false,
                message: 'Failed to login'
            });
        }
    }
    return res.status(400).send({
        success: false,
        message: `Failed to login. Please fill  in all the fields`
    })
}

export const registerUser = async (req, res) => {
    console.log({ body: req.body })
    const { username, email, password, confirmedPassword } = req.body;
    if (!(username && email && password && confirmedPassword)) {
        return res.status(400).send({
            success: false,
            message: `Failed to create user. Please fill  in all the fields`
        })
    }
    if (password !== confirmedPassword) {
        return res.status(400).send({
            success: false,
            message: `passwords do not match.`
        })
    }
    if (password.length < 6) {
        return res.status(400).send({
            success: false,
            message: `password should be atleast 6 characters`
        })
    }

    const newUser = {
        username,
        email,
        password,
        confirmedPassword
    }
    try {
        const newUserResponse = await authService.createUser(newUser);
        if (newUserResponse.success) {
            const accessToken = await jwt.sign({ username, email }, config.auth.secret, { expiresIn: config.auth.expiry });
            res.cookie('act', accessToken, { httpOnly: true, maxAge: 10000, sameSite: 'none',
            secure: true});
            return res.status(200).send({
                username,
                email,
                accessToken,
                message: "You have succesfully registered"
            });
        }
        return res.status(400).send({
            username,
            email,
            message: "Sorry... A user has already registered with this address"
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            success: false,
            message: 'Failed to create user.'
        });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        const accessToken = await jwt.sign(authHeader, "", { expiresIn: 10 }, (logout, err) => {
            if (logout) {
                return res.status(200).send({
                    accessToken,
                    success: true,
                    message: 'successfully logged out'
                });
            }
        })
    }
    catch (err) {
        return res.status(400).send({
            success: false,
            message: 'Failed to logout'
        });
    }
}



// {
//     "username" : "rintu",
//     "email":"rintu@gmail.com",
//     "password":"testtest",
//     "confirmedPassword":"testtest"
// }





