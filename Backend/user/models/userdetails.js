const mongoose = require('mongoose');
const userDetailsSchema = new mongoose.Schema({
    name:{type: 'string', required: true},
    phoneNumber:{type: 'string', required: true},
    


});

const userDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = userDetails;