const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');

router.get('/create', (req, res, next) => {
    res.render('groups/creation.hbs')
});



//take us to the view of "my groups"
router.post('/', (req, res) =>{
    

	const { startStation, endStation, date } = req.body;
        console.log(req.session)
	  Group.create({startStation, endStation, date}).then(()=> 
      {console.log("test");
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