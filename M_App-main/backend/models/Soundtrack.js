const mongoose = require('mongoose');

const SoundtrackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  brief_description: {
    type: String,
    required: true
  },

  description: {
    type: mongoose.Schema.Types.Mixed,  
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  url: { //url for sound
    type: String,
    required: true
  },

  imageUrl: {  
    type: String,
    required: true
  },

  free: {
    type: Boolean,
    default: false
  },

  category: {
    type: [String],
    required: true
  },

  // New category fields
  category2: {
    type: [String]
  },

  category3: {
    type: [String]
  },

  category4: {
    type: [String]
  },

  duration: {
    type: Number,
    required: true,
    validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
    }
}


});

const Soundtrack = mongoose.model('Soundtrack', SoundtrackSchema);

module.exports = Soundtrack;
