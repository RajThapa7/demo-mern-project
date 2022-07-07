const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const  LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT();
  localStorage.setItem("authKey", `Bearer ${token}`)
  res.status(StatusCodes.OK).json({ data: token, user,message: "logged in successfully" });
}

const logout = (req, res)=>{
  localStorage.removeItem("authKey")
res.send('/')
}

module.exports = {
  register,
  login,
  logout
}
