const router = require('express').Router();
const Gig = require('../models/gig');
const User = require('../models/user');
const Order = require('../models/order');
const fee = 3.15;
const async = require('async');
const passport = require('passport');

router.get(
    '/checkout/single-package/:id',
    passportConfig.isAuthenticated,
    (req, res, next) => {
        Gig.findOne(
            {
                _id: req.params.id
            },
            function(err, gig) {
                var totalPrice = gig.price + fee;
                req.session.gig = gig;
                req.session.price = totalPrice;
                res.render('checkout/single-package', {
                    gig: gig,
                    totalPrice: totalPrice
                });
            }
        );
    }
);

//List all items in the cart
router.get('/checkout/process_cart', (req, res) => {
    User.findOne({ _id: req.user._id })
        .populate('cart')
        .exec(function(err, user) {
            console.log(user.cart);
            var price = 0;
            var cartIsEmpty = true;
            if (user.cart.length > 0) {
                user.cart.map(function(item) {
                    price += item.price;
                });
                var totalPrice = price + fee;
            } else {
                cartIsEmpty = false;
            }

            req.session.price = totalPrice;
            req.session.gig = user.cart;
            res.render('order/cart', {
                foundUser: user,
                totalPrice: totalPrice,
                sub_total: price,
                cartIsEmpty: cartIsEmpty
            });
        });
});



router.get('/users/:id/manage_orders', (req, res, next) => {
    Order.find({ seller: req.user._id })
        .populate('buyer')
        .populate('seller')
        .populate('gig')
        .exec((err, orders) => {
            res.render('order/order-seller', { orders: orders });
        });
});

router.get('/users/:id/orders', (req, res, next) => {
    Order.find({ buyer: req.user._id })
        .populate('buyer')
        .populate('seller')
        .populate('gig')
        .exec((err, orders) => {
            res.render('order/order-buyer', { orders: orders });
        });
});

//Add item to cart
router.post('/add-to-cart', (req, res, next) => {
    const gigId = req.body.gig_id;
    User.update(
        {
            _id: req.user._id
        },
        {
            $push: {
                cart: gigId
            }
        },
        function(err, count) {
            res.json('Added to cart');
        }
    );
});

//Remove item from cart
router.post('/remove-item', (req, res, next) => {
    const gigId = req.body.gig_id;
    async.waterfall([
        function(callback) {
            Gig.findOne(
                {
                    _id: gigId
                },
                function(err, gig) {
                    callback(err, gig);
                }
            );
        },

        function(gig, callback) {
            User.update(
                {
                    _id: req.user._id
                },
                {
                    $pull: {
                        cart: gigId
                    }
                },
                function(err, count) {
                    var totalPrice = req.session.price - gig.price;
                    res.json({ totalPrice: totalPrice, price: gig.price });
                }
            );
        }
    ]);
});

module.exports = router;
