const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name is unique"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    profileImage: String,
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is unique"],
      lowercase: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      minLength: [6, "too short password"],
    },
    passwordChangedAt: Date,
    // passwordResetCode: String,
    // passwordResetExpires: Date,
    // passwordResetVerified: Boolean,

    role: {
      type: String,
      enum: ["user", "merchant", "industry","manager"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timeseries: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const SetImageUrl = (doc) => {
  if (doc.profileImage) {
    const ImageUrl = `${process.env.BASE_URL}/profileimage/${doc.image}`;
    doc.profileImage = ImageUrl;
  }
};

UserSchema.post("init", function (doc) {
  SetImageUrl(doc);
});


UserSchema.post("save", (doc) => {
  SetImageUrl(doc);
});
const user = mongoose.model("User", UserSchema);


module.exports = user;
