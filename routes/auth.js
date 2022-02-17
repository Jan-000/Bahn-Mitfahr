const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User")

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const res = require("express/lib/response");
const { findById } = require("../models/User");

// SIGNUP
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});


router.post("/signup", (req, res, next) => {
  const { lastName, firstName, email, creditcard, password} = req.body;
  console.log(req.body)
  

  if (!email) {
     res.render("auth/signup", { errorMessage: "Please provide your email." });
      return
  }

  if (password.length < 6) {
     res.render("auth/signup", { errorMessage: "Your password needs to be at least 6 characters long.",
    })
    return;
  }
	User.findOne({ email: email })
		.then(userFromDB => {
			if (userFromDB !== null) {
				res.render('auth/signup', { errorMessage: 'Email is already taken' })
			} else {
				// we can use that username
				// and hash the password
				const salt = bcrypt.genSaltSync()
				const hash = bcrypt.hashSync(password, salt)
				// create the user
  
  User.create({ lastName, firstName, email, creditcard, password : hash})

  //creates user
  .then(createdUser => {
    console.log(createdUser)
    res.redirect('/auth/login')
  })
  .catch(err => next(err))
}})
})
        
  //   ! This use case is using a regular expression to control for special characters and min length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).render("signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

//________________________________________________________________________________________

// LOGIN

router.get('/login', (req, res, next) => {
	res.render('auth/login')
});

router.post('/login', (req, res, next) => {
	const { email, password } = req.body
console.log("LoginAttempt")
	// do we have a user with that email
	User.findOne({ email: email })
		.then(userFromDB => {
			console.log('user: ', userFromDB)
			if (userFromDB === null) {
				// this user does not exist
				res.render('auth/login', { errorMessage: 'Invalid credentials' })
				return
			}
			// email is correct =>
			// we check the password against the hash in the database
				if (bcrypt.compareSync(password, userFromDB.password)) {
      console.log('authenticated')
				// it matches -> credentials are correct
				// we log the user in
				// req.session.<some key (normally user)>
				req.session.user = userFromDB
				console.log(req.session)
				// redirect to the profile page
				res.redirect('/auth/userprofile')
			}
		})
});

router.get('/logout', (req, res, next) => {
	// to log the user out we destroy the session
	req.session.destroy()
	res.render('index')
});
//________________________________________________________________________________________

// SEARCH page for aviliable groups
// accessible incl. non-loged-in users for viewing the offerings  
router.get("/search", (req, res, next) => {
  const { from, to, date } = req.body;

  if (!from) {
    return res
      .status(400)
      .render('search', { errorMessage: 'please provide a valid starting point'})
  }

  if (!to) {
    return res
      .status(400)
      .render('search', { errorMessage: 'please provide a valid destination point'})
}

if (!date) {
  return res      
  .status(400)
  .render('search', { errorMessage: 'please provide a valid date'})
}})
//________________________________________________________________________________________

// USERPAGE Page
// router.get("/userprofile", isLoggedOut, (req, res, next) => {
//   res.render("auth/login")
// })

router.get("/userprofile", (req, res, next) => {
console.log(req.session.user)
  const user = req.session.user
  console.log(req.session.user.creditcard.toString().length)
  // only showing the last four digits
const lastDigit = req.session.user.creditcard.toString().substring(req.session.user.creditcard.toString().length-4)
// const lastNumb 
  res.render("userprofile", { user: user, lastDigit: lastDigit})
  });
 
  // USERUPDATE / edit and update profile

router.get("/userupdate", (req, res, next) => {
    const user = req.session.user

    res.render("userupdate", {user: user})
 })

router.post("/userupdate", (req, res, next) => {

  
  const {firstName} = req.body;
console.log(req.body)
console.log('gets updated')


 const user = req.session.user
 mongoose.Collection()
 mongoose.users.updateOne(
  {firstName: firstName},
  {$set: {firstName: updatefirstName}})
// if (err) throw err;
// console.log("1 document updated");
// db.close();
//  })


res.render("userupdate", {user: user})
})

router.get('/delete', (req, res, next) => {
  console.log('tried to delete User')
  //later feature delete groups owned by this user as well
  User.findByIdAndDelete(req.session.user).then(()=>{
    //destroy session and delete database entry
    req.session.destroy()
    res.redirect('/auth/signup')
  })
});


module.exports = router;
