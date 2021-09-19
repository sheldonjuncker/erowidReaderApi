import mongoose = require('mongoose');

const { Schema } = mongoose;

const musicOptionSchema = new Schema(
  {
    spotifyPlaylistId: String,
    spotifyDeviceId: String,
    localPlaylistFolder: String,
  },
  { timestamps: false }
);

const MusicOption = mongoose.models.MusicOption || mongoose.model('musicOption', musicOptionSchema);

export { musicOptionSchema };
export default MusicOption;
