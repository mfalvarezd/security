/* Autorización */

var authorizationSession = (req, res, next) => {
    const userRole = req.session.role;

    if(userRole === 'user') {
        // Redirige a la vista token si el rol es "user"
        return res.render("token", { title: "Token user" });
    } else if(process.env.ALL_GRANTED.includes(userRole)) {
        // Permite el acceso si el rol está en ALL_GRANTED
        return next();
    } else {
        // Redirige a la página principal si no está autorizado
        return res.redirect("/");
    }
}

module.exports = authorizationSession;