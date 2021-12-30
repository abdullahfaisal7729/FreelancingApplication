const router = require('express').Router();
const User = require('../models/user');
const async = require('async');


//GET request to /
router.get('/', (req, res, next) => 
{
    Gig
        .find({}, function (err, gigs) {
            res.render('main/home', {gigs: gigs})
        })
});

router
    .route('/search')
    .get((req, res) => {
        if (req.query.q) {
            index
                .search(req.query.q, function (err, content) {
                    res.render('main/search_results', {
                        content: content,
                        search_result: req.query.q
                    });
                })
        }
    })
    .post((req, res) => {
        res.redirect('/search/?q=' + req.body.search_input)
    })



//Handle GET and POST request to /add-new-gig
router
    .route('/add-new-gig')
    .get((req, res) => {
        res.render('main/add-new-gig');
    })
    .post((req, res) => {
        async.waterfall([function (callback) {
                let gig = new Gig();
                gig.owner = req.user._id;
                gig.title = req.body.gig_title;
                gig.category = req.body.gig_category;
                gig.about = req.body.gig_about;
                gig.price = req.body.gig_price;
                gig.save(function (err, gig) {
                    User
                        .update({
                            _id: req.user._id
                        }, {
                            $push: {
                                gigs: gig._id
                            }
                        }, function (err, count) {
                            res.redirect('/gigs');
                        })
                });
            }
        ]);
    });

//Handle single gig req
router.get('/service_detail/:id', (req, res, next) => {
    Gig
        .findOne({ _id: req.params.id })
        .populate('owner')
        .exec(function (err, gig) {
            res.render('main/service_detail', {gig: gig});
        })
})


module.exports = router;
// these are some comments