const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;


/*route displaying the group-search*/
router.get("/groupsearchUrl", (req, res) => {
  res.render("groupsearch");
});