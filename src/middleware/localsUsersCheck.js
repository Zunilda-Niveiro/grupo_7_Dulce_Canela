module.exports = (req,res,next) => {
    if(req.session.DulceCanela){
        res.locals.userLogin = req.session.userLogin
    }
    next()
}