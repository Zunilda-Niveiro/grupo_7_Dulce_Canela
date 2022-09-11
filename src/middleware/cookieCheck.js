module.exports = (req,res,next) => {
    if(req.cookies.DulceCanela){
        req.session.userLogin = req.cookies.DulceCanela
    }
    next()
}