var express 	= require("express");
var router 		= express.Router();
var passport 	= require("passport");
var User 		= require("../models/user");

//Index route
router.get("/", function(req, res){
	res.render("index");
});

//register route
router.get("/register", function(req, res){
	res.render("register");
});

//Post of the register route
router.post("/", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log("ERROR: " + err);
			res.redirect("register");
		} else{
			passport.authenticate("local")(req, res, function(){
				res.redirect("/lobby");
			});
		}
	});
});

//login route
router.post("/login", passport.authenticate("local", {
	successRedirect: "/lobby",
	failureRedirect: "/"
}), function(req, res){
	res.send("LOGIN LOGIC");
});

//lobby route
router.get("/lobby", isLoggedIn, function(req, res){
	console.log(req.user);
	res.render("lobby", {currentUser: req.user});
});

//=====================================
//MIDDLEWARE
//=====================================
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	console.log("User is not logged in");
	res.redirect("/");
}




module.exports = router;