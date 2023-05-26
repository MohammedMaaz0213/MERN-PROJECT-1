import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });
    console.log(password);
    console.log(existingUser.password);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) return res.status(400).json("Invalid Credentials");

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);

    res.status(400).json("SOMETHING WENT WRONG");
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, creator } =
    req.body;

  console.log(req.body);
  console.log("rerererereerererreqreeeree");

  try {
    const existingUser = await User.find({ email });

    console.log(existingUser === true);
    console.log(existingUser.length);
    if (existingUser.length !== 0)
      return res.status(404).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "passwords dont match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("userrrererererererererererererrrrrrrrrrrrrrr");
    console.log(req.userId);
    const result = await User.create({
      creator,
      email,
      password: hashedPassword,
      name: `${firstName}, ${lastName}`,
    });
    console.log("lololololololololololololol", result);

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(400).json("SOMETHING WENT WRONG");
  }
};
