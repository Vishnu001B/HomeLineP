const mongoose = require('mongoose');

const privacyPolicySchema  = new mongoose.Schema(
    {
        title:{
            type : String,
        },
        description: {
            type: String,
          
          }
    }
)

const PrivacyPolicy = mongoose.model('PrivacyPolicy' , privacyPolicySchema);

module.exports = PrivacyPolicy