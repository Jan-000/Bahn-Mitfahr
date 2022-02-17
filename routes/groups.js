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
     
});

router.get('/mygroups', (req, res, next) => {
    console.log ('tried to open redirect')
    Group.find({ owner : req.session.user._id}).then((groups)=> {
        res.render('groups/mygroups.hbs', {groups})
    })
    
});


//results of group search
router.post('/groupsearchUrl', (req, res, next) => {
    console.log ('tried to open redirect')
    const { startStation, endStation, date } = req.body;
    Group.find({ startStation }).then((groups)=> {
        console.log("LOL IT WORKED")

        res.render('groups/groupresult.hbs', {groups})
    })
});


router.get("/joingroup", (req, res, next) => {
    console.log("joingroup route was initiated");
    
  });



// router.get('/joingroup', (req, res, next) => {
//     console.log(req.body)
//   //  const { guests } = [1,2,3];
//   res.render('groups/mygroups.hbs')
// })


module.exports = router;