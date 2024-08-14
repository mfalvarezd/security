/* Autorización */

var authorizationSession = (req, res, next) => {
    const userRole = req.session.role;

    if(userRole === 'user') {
        
        return res.render("token", { title: "Token user" ,username:req.cookies['username']});
    } else if(process.env.ALL_GRANTED.includes(userRole)) {
       
        return next();
    } else {
        
        return res.redirect("/");
    }
}

module.exports = authorizationSession;