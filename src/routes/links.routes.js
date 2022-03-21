import { Router } from "express";
import Link from "../Models/Links";
import User from "../Models/Users";
const route = Router();

route.get("/", async (req, res) => {
  const links = await Link.find({}).populate("user");
  if (links < 1) {
    return res.send("there are not results yet");
  }
  res.send(links);
});

route.post("/", async (req, res) => {
  try {
    const { name, link, user } = req.body;
    const insertLinkToUser = await User.findById(user);
    const getLink = new Link({ name, link, user });
    const saveLink = await getLink.save();
    insertLinkToUser.links = insertLinkToUser.links.concat(saveLink._id);
    await insertLinkToUser.save();
    res.json(saveLink);
  } catch (error) {
    console.log(error);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    await Link.remove({ _id: req.params.id });
    res.send("link removed");
  } catch (error) {
    console.log(error);
  }
});

export default route;
