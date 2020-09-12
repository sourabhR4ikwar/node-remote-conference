const User = require('../../models/User');

exports.changeDisplayName = (req, res) => {
    const userId = req.body.userId;
    const newName = req.body.displayName;

    // console.log(newName, userId);
    User
    .findOne({_id: userId})
    .then(user => {
        // console.log(user);
        user.displayName = newName;
        return user.save();
    })
    .then(() => {
        // console.log('save successfull');
        res.json({
            success: true
        });
    })
    .catch(err => res.status(500).json({"message": "server error"}));
}