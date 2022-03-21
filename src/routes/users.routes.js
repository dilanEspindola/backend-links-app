import { Router } from "express";
import bcryptjs from "bcryptjs";
import User from "../Models/Users";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate("links");
    if (users < 1) return res.json({ msg: "there are not users yet" });
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcryptjs.hash(password, 9);
    const getUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    const saveUser = await getUser.save();
    res.json(saveUser);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const getUser = await User.findOne({
      username: username,
    });
    if (getUser) {
      const validatePassword = await bcryptjs.compare(
        password,
        getUser.password
      );
      if (validatePassword) {
        console.log(getUser);
        res.send("logged");
      } else {
        res.send("password invalid");
      }
    } else {
      res.status(400).send("user not found");
    }
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.remove({ _id: req.params.id });
    res.json({ msg: "user deleted" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
