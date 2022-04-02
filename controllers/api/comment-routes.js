
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");


// GET a comment
router.get("/", (req, res) => {
    Comment.findAll({
        attributes: [
            "comment_text", 
            "user_id",
            "post_id"
        ],
        order: [["created_at", "DESC"]],
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST a comment
router.post("/", withAuth, (req, res) => {
    // check if session exists
    if(req.session){
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// DELETE comments
router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(400).json({ message: "No post found with this id" });
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;