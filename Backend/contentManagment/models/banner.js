const mongoose = require('mongoose');

const bannerSchema =  new mongoose.Schema(
    {
  title:{type: 'string', required: true},
  description:{type: 'string', required: true}
    }
)

const banner = mongoose.model('Bannercontent',bannerSchema);
module.exports = banner