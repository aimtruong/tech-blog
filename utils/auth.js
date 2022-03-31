
// function to only get authorization if session is being used
const withAuth = (req, res, next) => {
    if(!req.session.user_id){
        res.redirect("/login");
    }
    else{
        next();
    }
};

module.exports = withAuth;