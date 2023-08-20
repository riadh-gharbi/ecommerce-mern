const Cart = require('../models/Cart');
const Item = require('../models/Item');

module.exports.getCartItems = async (req, res) => {
    const userId = req.params.id;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart && cart.items.length > 0) {
            res.send(cart);
        }
        else {
            res.send(null);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong with the server");
    }

}


module.exports.addCartItem = async (req, res) => {
    const userId = req.body.userId;
    const { productId, quantity } = req.body.productId;
    try {
        let cart = await Cart.findOne({ userId });
        let item = await Item.findOne({ _id: productId });
        if (!item) {
            res.status(404).send("Item not found");
        }
        const price = item.price;
        const name = item.title;

        if (cart) {
            //if there is a cart for the user
            let itemIndex = cart.items.findIndex(
                p => p.productId == productId
            )
            //item index is used to find out if the item is already in the cart
            if (itemIndex > -1) {
                //if index is 0 or more (it means it's in the cart)
                let productItem = cart.items[itemIndex];
                productItem.quantity += quantity;
                cart.items[itemIndex] = productItem;
                //update the product item in the cart to increment its quantity then
            }
            else {
                cart.items.push({ productId, name, quantity, price });
                //insert new item in the cart
            }
            cart.bill += quantity * price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else {
            const newCart = await Cart.create({
                userId,
                items: [{ productId, name, quantity, price }],
                bill: quantity * price
            });
            return res.status(201).send(newCart);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong with the server");
    }
}


module.exports.deleteItem = async (req,res) => {
    const userId = req.params.userId;
    const productId = req.params.itemId;
    try{
        let cart = await Cart.findOne({userId});
        let itemIndex = cart.items.findIndex(p => p.productId == productId);
        if(itemIndex > -1)
        {
            let productItem = cart.items[itemIndex];
            cart.bill -= productItem.quantity*productItem.price;
            cart.items.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}