const mongoose = require('mongoose');
const router = require('express').Router();   
//const User = mongoose.model('User');
const {User} = require('../models/user')
const passport = require('passport');
const utils = require('../lib/utils');
const asyncWrapper = require('../middleware/async')
const do_request = require('../make_request').do_request
const axios = require('axios')

//console.log("qqqq")
//console.log(do_request)
//console.log("qqqq")
//console.log(typeof(User))

//do_request()
const exportObj = {}

let user = new User({
    username: "fr",
    hash: "fr",
    salt: "fr"
});

exports.do_request = do_request


/*
const express = require('express')
const router = express.Router()

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router
*/

const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({})
    res.status(200).json({ users })
})

router.get('/all-users', getAllUsers);

  

// TODO
router.get('/protected', passport.authenticate('jwt', {'session': false}), (req, res, next) => {
    console.log("aaaaaaaaaaaaaaaaa")

    
    res.setHeader("Authorization", req.headers.authorization);
    //deprecated
    //console.log(res.header()._headers)
    
    //must be lowercase
    console.log(res.getHeaders()['authorization'])

    res.status(200).json({'message':'You are authenticated!', 
                          'Authorization': JSON.stringify(req.headers.authorization)})
});
 

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {

    /* pay attantion: password field name is pw, must match with options obj in passport.js
       or eliminate obj
    */
    const form = '<h1>Login Page</h1><form method="POST" id="login_form" action="/users/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>\
    <a href="/users/protected">Click here to enter protected route</a><br>\
    <a id="protected" href="#">Click here to enter protected route via axios</a>\
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.js" integrity="sha512-rozBdNtS7jw9BlC76YF1FQGjz17qQ0J/Vu9ZCFIW374sEy4EZRbRcUZa2RU/MZ90X2mnLU56F75VfdToGV0RiA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>\
    <script src="http://localhost:3000/events.js"></script>';

    res.send(form);

});

// TODO
router.post('/login', function(req, res, next){
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) 
                return res.status(401).json({ success: false, message: "could not find user"})
            
            if (!utils.validPassword(req.body.password, user.hash, user.salt))
                return res.status(401).json({ success: false, message: "you just entered a wrong password!" })
        
            const tokenObj = utils.issueJWT(user)
            //console.log(tokenObj)

            //export to be automatically used with axios
            exportObj.tokenObj = tokenObj
            console.log("tokkkken vale")
            console.log(exportObj.tokenObj)
           
            return res.status(200).json({ success: true, token: tokenObj.token, expiresIn: tokenObj.expires })
        })
        .catch((err) => { next(err) })
});



// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><label for="admin"> Im an admin</label>\
                    <input type="checkbox" id="admin" name="admin" value="1">\
                    </input><br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});



// TODO
router.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    var admin = false

    if (req.body.admin) admin=true

    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
        admin: admin
    });

    newUser.save()
        .then((user) => {
            const jwt = utils.issueJWT(user)
            res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires })
        })
});

var setheader = () => {
    const https = require('https');

    const options = {
        hostname: '127.0.0.1:3000',
        path: '/protected',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzAxNGIxMjQzOGMxNDM3OWU1YmUzNmEiLCJpYXQiOjE2NjEwMzA1NTg4NDAsImV4cCI6MTY2MTAzMDY0NTI0MH0.nDW8T5HaJkNk-CsACzQkYO9BaC0kHzNlkF2Z9e0atiMFqpVK7OUOUvv1rDC9FXINecSGX6po1Rt5RstyaAL37RJpoi9x_VBXjNNRyajvHOm87jUrN_PsALKXeGrmwvOi2bxx4jhWgvUiK0RTfFYsLIdHEYLmQzJp7fOGoiCnkRghxPeMKfuPD8FOnTSxl-MnF3r630L4XCICZzggVBoVwPodTLG-WhYNbZ8zZd8FFk1JZq9D2o8C0VkvCevW-WXSEGIPtmv9bg2jxT6s6uF0WQ8zcMUl6NhbME9_ruNrhSY-T6qn-6dujC2Bu-1kxQKR7nnSs9HWM9SNDcL2Fdq3otjVYYXrt5f8X-GVlZAeK1s6W4cQ1XfGowHnjq1oIhKaI8zfmSoXQ9TFGFgmSHGSxgbBdsOBQGjds45HPO28-2oMmf2o6B6yYeceCCCTeTU3jdr2Bwjav-eATeVxoiiZZHcA6zf-ZaOKNyh7bSaCfXQCHYBqv-nQnptRgIvpebe5vR5MpA5w-brE3zlK5lfJhniWrzVkdiCHknyZeAW6nW9WMZWOdv5CoKeCbN8k7up2_0WlrQlhrSNuTsfCuR8u8dqtC6vCdTNaQFk-ep4DsvzvkgpPAUanr1zjfvWJxxiTJoCGzU5YK7AA51Wecso9cA0UPPb4Q0H9WY_nmF2AwA4'
        }
    }

    https.get(options, (response) => {

        var result = ''
        response.on('data', function (chunk) {
            result += chunk;
        });

        response.on('end', function () {
            console.log(result);
        });

    });

}


var setheader = () => {

const userObject = {
  name: 'Kylian Mbappe',
  email: 'mbappe@fifa.com',
  profession: 'Footballer',
  goals: 555,
}

const emptyObj = {}  

const headerOptions = {
  headers: { 
    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzAxNGIxMjQzOGMxNDM3OWU1YmUzNmEiLCJpYXQiOjE2NjEwMzY0Mzc1MjcsImV4cCI6MTY2MTAzNjUyMzkyN30.CAVxaPN0cmo4Iwl65v7vU9-nAYBrJ6Y_T96d53J6Xiq9SZPCqno6MSWsTNU2OfpDPgwunC6GT9FxZwhamKR0Smfd8UG9Hei9b0WHzz_EigyUL-mezVj1e5Ew8Pc-htAkNcPvJ39iFNjMPpNFW-8gEvTLCHh2G7i74_iAgtTDcJ4A4SB_wLSNPKh4ZOviKEFNg9cUNSrVlUUL_ccmVE7YpYQE-vnmIeUz9ENhmuil22YPGeqLwxAFiRedJcs7d2YLZurJnuB1711ETb7GpdZva2l7rUQ3M1tyCvwG0zD6exIIw2GhJ0_7zRzwYUGSxGfxQr4VGqFFXlNKGskXCBDpboS7LoldGIGQUYxk_VNvR5Qr1GhY7VbhFNVLr_yGSHMlpngI0R-eFFo5PxreCFymxRdb1bJbfIyp8Fk0xNQbfw_GW_vonPV9X2lnsL5CY4xQk01I8rbkNoQpfby8_pn2iODgD6Lg4s2tlnSg8-ZmQzaUz5S-RrI-OURwWL5z3464oykRUNo_5oJsrmaaJ0r5EIPZdQvoQk8Gi4ggQW9ArVbOeR1jdqqajGzdSKiRCq8OWwuZbE9j2pHI3gthKRYwLeLqujEYUMpoXU-byizVogE8G9uKH3EUD7Peny7K-7v313nZWl0Mu2PJs1u5j14RYdRP-Xbj1UTtnLtoWEWswbI'  
}  
}

if (1===2) {
    axios
    .get('http://localhost:3000/users/protected', headerOptions)
    .then((res) => {
        if (res.status === 200) {
        console.log('Request body :', res.data)
        console.log('Request header :', res.headers)
        }
    })
    .catch((e) => {
        console.error('Error occurred : ' + e)
    })
    }
    //setheader()
}

console.log(exportObj)
//module.exports = router;
exports.router = router;
exports.exportObj = exportObj;
