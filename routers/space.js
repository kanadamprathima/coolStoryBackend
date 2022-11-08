const { Router } = require("express");
const Space = require("../models").space;
const Story = require("../models").story;
const User = require("../models").user;
const authMiddleware = require("../auth/middleware");
const router = new Router();
router.get("/", async (req, res, next) => {
  const allSpaces = await Space.findAll({
    raw: true,
    include: [User],
  });
  res.send(allSpaces);
});
router.delete(
  "/:spaceId/stories/:storyId",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { spaceId, storyId } = req.params;
      const story = await Story.findByPk(storyId, { include: [Space] });
      if (!story) {
        return res.status(404).send("Story not found");
      }

      // Check if this user is the owner of the space
      if (story.space.userId !== req.user.id) {
        return res
          .status(401)
          .send("You're not authorized to delete this story");
      }

      await story.destroy();

      res.send({ message: "Story deleted", storyId });
    } catch (e) {
      next(e);
    }
  }
);
// F2 - GET space by id, include stories - http GET :4000/spaces/1
router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    console.log("id", id);
    const spaceById = await Space.findByPk(id, {
      include: [Story],
      order: [["createdAt", "DESC"]],
    });
    if (spaceById) {
      res.send(spaceById);
    } else {
      res.status(404).send({ message: "Space not found!" });
    }
  } catch (e) {
    next(e.message);
  }
});
router.post("/:id/stories", authMiddleware, async (req, res, next) => {
  try {
    const space = await Space.findByPk(req.params.id);
    if (space === null) {
      return res.status(404).send("This space doesn't exists");
    }
    if (!space.userId === req.user.id) {
      return res.status(403).send("unauthorized to update this space");
    }
    const { name, imageUrl, content } = req.body;
    if (!name) {
      return res.statue(400).send({ message: "A story must have a name" });
    }
    const story = await Story.create({
      name,
      imageUrl,
      content,
      spaceId: space.id,
    });
    return res.status(201).send({ message: "New Story created", story });
  } catch (e) {
    next(e.message);
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  const space = await Space.findByPk(req.params.id);
  if (!space.userId === req.user.id) {
    return res
      .status(403)
      .send({ message: "You are not authorized to update this space" });
  }

  const { title, description, backgroundColor, color } = req.body;

  await space.update({ title, description, backgroundColor, color });

  return res.status(200).send({ space });
});
module.exports = router;
