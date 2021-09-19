import mongoose = require('mongoose');

const { Schema } = mongoose;

const substanceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    resources: [
      {
        name: String,
        url: String,
      },
    ],
    dosing: {
      units: mongoose.Schema.Types.String,
      unitsDescription: mongoose.Schema.Types.String,
      threshold: mongoose.Schema.Types.Number,
      light: mongoose.Schema.Types.Number,
      moderate: mongoose.Schema.Types.Number,
      strong: mongoose.Schema.Types.Number,
      heavy: mongoose.Schema.Types.Number,
      weightMod: {
        multiplier: mongoose.Schema.Types.Number,
        cap: mongoose.Schema.Types.Number,
        minDose: mongoose.Schema.Types.Number,
        maxDose: mongoose.Schema.Types.Number,
      },
    },
    duration: {
      units: String,
      min: mongoose.Schema.Types.Number,
      max: mongoose.Schema.Types.Number,
    },
    onset: {
      units: String,
      min: mongoose.Schema.Types.Number,
      max: mongoose.Schema.Types.Number,
    },
    effects: [String],
    warnings: [String],
  },
  { timestamps: false }
);

const Substance = mongoose.models.Substance || mongoose.model('substance', substanceSchema);

export { substanceSchema };
export default Substance;
