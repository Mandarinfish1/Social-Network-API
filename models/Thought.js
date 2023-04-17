const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/date");

const ideaSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Must leave a thought!",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

IdeaSchema.virtual("reactionCount").get(function () {
  return this.reactions.length
})

const Thought = model("Thought", ideaSchema)

module.exports = Thought;
