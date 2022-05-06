const { Schema, model, Types } = require("mongoose");

//reaction field's subdocument schema in the Thought model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    Thoughtname: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //getter method to format the timestamp
      get: (createdAtValue) => dateFormat(createdAtValue),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtValue) => dateFormat(createdAtValue),
    },
    Thoughtname: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },

  //virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// initialize Thought model ThoughtSchema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
