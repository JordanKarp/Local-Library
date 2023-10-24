const User = require("../models/user");

const passport = require('passport')
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const { genPassword } = require("../config/passwordUtils");



exports.register = asyncHandler( async(req, res, next) => {
    const saltHash = genPassword(req.body.password);
    const {salt, hash} = saltHash;

    const newUser = new User({
        username:req.body.username,
        hash: hash,
        salt: salt,
        isAdmin: false
    });

    await newUser.save()
    res.redirect('/login')
  });

exports.login = passport.authenticate('local', {
    failureMessage: 'Login Unsuccessful',
    failureRedirect: '/login',
    successRedirect: '/catalog'
  });

exports.logout =(req,res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
    };


// Display list of all Users.
exports.user_list = asyncHandler(async(req,res, next) => {
    const allUsers = await User.find().sort({ username: 1 }).exec();
    res.render("user_list", {
      title: "User List",
      user_list: allUsers,
      current_user: req.user,
    });
  });

// Display detail page for a specific User.
exports.user_detail = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const user = await User.findById(req.params.id).exec();
  
    if (user === null) {
      // No results.
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("user_detail", {
      title: "User Detail",
      user: user,
    });
  });
  

  // Display Users delete form on GET.
exports.user_delete_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec()
  if (user === null) {
      // No results.
      res.redirect("/catalog/users");
    }
    res.render("user_delete", {
      title: "Delete user",
      user: user,
    });
});


// Handle User delete on POST.
exports.user_delete_post = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (user === req.user) {
      this.logout()
      res.redirect("/login");
    }
    else {
      res.redirect("/catalog/users");
    }
});
