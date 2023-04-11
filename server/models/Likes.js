const { Schema } = require('mongoose');

const likeSchema = new Schema(
  {
  event: {
    type: String,
    required: true
  },
  link: { type: String },
  type: { type: String },

}
)

module.export = likeSchema;