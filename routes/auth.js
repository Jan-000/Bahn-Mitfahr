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
  const { email, password } = req.body;
  console.log(req.body)
  

  // if (!email) {
  //    res
  //     .status(400)
  //     .render("auth/signup", { errorMessage: "Please provide your email." });
  //     return
  // }

  // if (password.length < 6) {
  //    render("auth/signup", { errorMessage: "Your password needs to be at least 6 characters long.",
  //   })
  //   return;
  // }
  // User.create({ username, password })
	// 				.then(createdUser => {
	// 					console.log(createdUser)
	// 					res.redirect('/login')
	// 				})
	// 				.catch(err => next(err))

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

  // // Search the database for a user with the email submitted in the form
  // email.findOne({ email })
  // .then((found) => {
  //   // If the email is found, send the message email is taken
  //   if (found) {
  //      res
  //       .status(400)
  //       .render("auth/signup", { errorMessage: "email already taken." });
  //       return}
 
  //   // if user is not found, create a new user - start with hashing the password
  //   return bcrypt
  //     .genSalt(saltRounds)
  //     .then((salt) => bcrypt.hash(password, salt))
  //     .then((hashedPassword) => {
  //       // Create a user and save it in the database
  //       console.log("password gets hashed");
  //        User.create({
  //         email,
  //         password: hashedPassword,
  //       });
  //     })
  //     .then((user) => {
  //       // Bind the user to the session object
  //       req.session.user = user;
  //       res.redirect("/");
  //     })
  //     .catch((error) => {
  //       if (error instanceof mongoose.Error.ValidationError) {
  //         return res
  //           .status(400)
  //           .render("auth/signup", { errorMessage: error.message });
  //       }
  //       if (error.code === 11000) {
  //         return res.status(400).render("auth/signup", {
  //           errorMessage:
  //             "email need to be unique. The email you chose is already in use.",
  //         });
  //       }
  //       return res
  //         .status(500)
  //         .render("auth/signup", { errorMessage: error.message });
  //     });
  // });
});
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
				res.render('auth/login', { message: 'Invalid credentials' })
				return
			}
			// email is correct 
			// we check the password against the hash in the database
		//=========> pw match request with and without hashing
      //	if (bcrypt.compareSync(password, userFromDB.password)) {
				if (password, userFromDB.password) {
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
  res.render("userprofile", { user: user })
  });
 


module.exports = router;
