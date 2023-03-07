const { Schema } = require('mongoose');

const likeSchema = new Schema(
  {
  event: {
    type: String,
    required: true
  }
}
)

module.export = likeSchema;