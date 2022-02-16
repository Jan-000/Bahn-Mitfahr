const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');

router.get('/create', (req, res, next) => {
    User.findById(req.session.user._id).then(user=>{res.render('groups/creation.hbs', {user})
    })
    //console.log(req.session.user._id)
    
});



//take us to the view of "my groups"
router.post('/', (req, res) =>{
    

	const { startStation, endStation, date } = req.body;
        console.log(req.session.user)
        const owner = req.session.user._id
	  Group.create({startStation, endStation, date, owner}).then(()=> {

        res.redirect('/groups/mygroups')
	})

	.catch(err => {next(err)
    });
    
    // res.redirect('/groups/mygroups')
     
});

router.get('/mygroups', (req, res, next) => {
    console.log ('tried to open redirect')
    res.render('groups/mygroups.hbs')
});


module.exports = router;