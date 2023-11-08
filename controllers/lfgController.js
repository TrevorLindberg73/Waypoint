exports.dashboard = (req,res) => {
    res.render('./LFG/LFG_dashboard');
}

exports.create = (req,res) => {
    res.render('./LFG/createGroup');
}

exports.view = (req,res) => {
    res.render('./LFG/viewGroup');
}