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
  type: {
    type: [String],
    required: true
  }
});

const Soundtrack = mongoose.model('Soundtrack', SoundtrackSchema);

module.exports = Soundtrack;