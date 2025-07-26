const userModel = require('../models/user.model')

const registerService = async ({ firstname, lastname, email, age, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required!')
    }
    
   const user = await userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        age,
        password
    })

    return user
}

module.exports = {registerService}