const express = require('express');
const router = express.Router();
//const User = require('../models/User');
//const Group = require('../models/Group');

router.get('/create', (req, res, next) => {
    res.render('groups/creation.hbs')
});




router.post('/', (req, res, next) =>{
    
    res.redirect('/groups/mygroups')
    
});

router.get('/mygroups', (req, res, next) => {
    console.log ('tried to open redirect')
    res.render('groups/mygroups.hbs')
});


module.exports = router;