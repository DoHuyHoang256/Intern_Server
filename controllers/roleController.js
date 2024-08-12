const { getRoles } = require('../models/roleModel');

const getRolesAPI = async (req, res) => {
    try {
        const roles = await getRoles();
        res.json(roles);
    } catch (err) {
        res.status(500).send('Error retrieving roles');
    }
};

module.exports = {
    getRolesAPI
};
