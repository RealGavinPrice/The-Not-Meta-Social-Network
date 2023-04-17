const {
    Thought,
    User
} = require('../models');
const thoughtController ={

    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //GET one thought
    getThoughtById({
        params
    }, res) {
        Thought.findOne({
            _id: params.id
        })
        .select('-__v')
        .sort({
            _id: -1
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({
                    message: 'Not a single thought found !!'
                });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //CREATE thought
    addThought({
        body
    }, res) {
        Thought.create(body)
            .then((thoughtData) =>{
                return User.findOneAndUpdate(
                    {
                        _id: body.userId
                    }, {
                        $addToSet: {
                            thoughts: thoughtData._id
                        }
                    }, {
                        new: true
                    }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found -- look around !!'
                    });
                    return;
                }
                    res.json(dbUsersData)
            })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                });
    },
    //UPDATE thought
    updateThought({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        }, {
            $set: body
        }, {
            runValidators: true,
            new: true
        })
        .then(updateThought => {
            if (!updateThought){
                return res.status(404).json({
                    message: 'No thoughts here !!'
                });
            }
            return res.json({
                message: 'Thought updated !!'
            });
        })
        .catch(err => res.json(err));
    },
    //DELETE thought
    removeThought({
        params
    }, res) {
        Thought.findOneAndDelete({
            _id: params.thoughtId
        })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({
                    message: 'Already no thoughts here !!'
                });
            }
            return User.findOneAndUpdate({
                thoughts: params.thoughtId
            }, {
                $pull: {
                    thoughts: params.thoughtId
                }
            }, {
                new: true
            });
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({
                    message: 'No thoughts found here !!'
                });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //CREATE reactions
    addReaction({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $push: {
                    reactions: body
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(updatedThought => {
                if (!updatedThought) {
                    res.status(404).json({
                        message: 'No reactions here !!'
                    });
                    return;
                }
                res.json(updatedThought);
            })
            .catch(err => res.json(err));
    },
    // DELETE reaction
    removeReaction({
        params
    }, res) {
        Thought.findOneAndUpdate({
                    _id: params.thoughtId
                },
                {
                    $pull: {
                        reactions: {
                            reactionId: params.reactionId
                        }
                    }
                }, {
                    new: true
                }
            )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({
                        message: 'No reaction found with this id.'
                    });
                    return;
                }
                res.json(thought)
            })
            .catch(err => res.json(err));
    },
}

module.exports = thoughtController;