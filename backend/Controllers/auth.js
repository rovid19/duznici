import User from "../Models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const jwtSecret = "markomarkodarkodarko";
const salt = bcrypt.genSaltSync(10);

export const createUser = async (req, res) => {
  const { username, password } = req.body;

  const newUser = User.create({
    username: username,
    password: bcrypt.hashSync(password, salt),
  });

  res.json(newUser);
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  console.log(user);
  if (user) {
    const checkPass = bcrypt.compareSync(password, user.password);
    if (checkPass) {
      jwt.sign(
        { username: user.username, id: user._id },
        jwtSecret,
        {},
        async (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "").json("done");
};
