//We need the user model since auth deals with users
const User = require('../models/User');
//we need this to create json web tokens which we can store and verify if the user has been authenticated
const jwt = require('jsonwebtoken');
//to access the json we stored there
const config = require('config');
//Hash the passwords before storing them in the database
const bcrypt = require('bcryptjs');

module.exports.signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exists' });
            const newUser = new User({
                name, email, password
            });

            // salt and hash for the password
            bcrypt.genSalt(10, (err, salt) => {
                becrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user =>
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }

                                    });
                                }
                            )
                        )    
                })
            })
        
        }
    )
}
                  
module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ msg: 'Please enter all fields' });
    }
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });
            
            //check password (validation)
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                   if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }

                            });
                        })
                    
                })
        })
}

module.exports.get_user = (req,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}

