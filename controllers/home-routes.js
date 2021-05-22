const router = require("express").Router();
const { Picture, Phrase } = require("../models");

// GET all galleries for homepage
router.get("/", async (req, res) => {
  try {
    const dbPictureData = await Picture.findAll({
      include: [
        {
          model: picture,
          attributes: ["id", "url"],
        },
      ],
    });

    const pictures = dbPictureData.map((meme) => meme.get({ plain: true }));
    res.render("homepage", {
      pictures,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get("/picture/:id", async (req, res) => {
  try {
    const dbPictureData = await Picture.findByPk(req.params.id, {
      include: [
        {
          model: picture,
          attributes: ["id", "url", "description"],
        },
      ],
    });

    const dbPhraseData = await Phrase.findAll({
      where: {
        picture_id: req.params.id,
      },
      include: [
        {
          model: Phrase,
          attributes: ["id", "upper_text", "lower_text", "phrase_picture_id"],
        },
      ],
    });

    const picture = dbPictureData.get({ plain: true });
    //res.render ---> Make sure that the handlebar page looks the same replace 'meme'

    const phrase = dbPhraseData.get({ plain: true });
    res.render("picture", { picture, phrase, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one painting
// router.get("/template/:id", async (req, res) => {
//   try {
//     const dbTemplateData = await Template.findByPk(req.params.id);

//     const meme = dbTemplateData.get({ plain: true });
//     res.render("template", { meme, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

module.exports = router;
