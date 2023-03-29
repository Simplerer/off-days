const { Schema } = require('mongoose');

const likeSchema = new Schema(
  {
  event: {
    type: String,
    required: true
  },
  link: { type: String }
}
)

module.export = likeSchema;