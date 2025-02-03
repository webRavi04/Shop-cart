import { Request, Response } from "express";
import { Sequelize } from 'sequelize';
const db = require('../models');

// Define associations after importing models
db.Cart.hasMany(db.CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
db.CartItem.belongsTo(db.Cart, { foreignKey: 'cartId' });

db.Product.hasMany(db.CartItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
db.CartItem.belongsTo(db.Product, { foreignKey: 'productId', as: 'product' });

export const addToCart = async (req: Request, res: Response) => {
  try {
    let { cartId, products } = req.body;
    
    if(!cartId) {
      const newCart = await db.Cart.create();
      cartId = newCart.id;
    } else {
      const cart = await db.Cart.findByPk(cartId);
      if(cart === null) {
        res.status(500).json({ message: "Cart not found!" });
      }
    }
    for (const product of products) {
      const { id: productId, quantity } = product;
      
      await db.CartItem.create({ cartId, productId, quantity });
    }
    
    res.status(201).json({ cartId, message: "Cart item created successfully." });
   
    console.log('All products added/updated in the cart.');
  } catch (error) {
    console.error('Error adding/updating cart items:', error);
  }
}

export const getCartById = async (req: Request, res: Response) => {
  try {
    const cartId = req.params.id;
    const whereCondition = cartId ? { cartId } : {};
    
    const cart = await db.CartItem.findAll({
      where: whereCondition,
      attributes: [
        'cartId',
        [Sequelize.fn('JSON_AGG', Sequelize.literal(`
          JSON_BUILD_OBJECT(
            'id', "product"."id",
            'name', "product"."name",
            'price', "product"."price",
            'category', "product"."category",
            'quantity', "CartItem"."quantity"
          )
        `)), 'products']
      ],
      include: [
        {
          model: db.Product,
          as: 'product', // Ensure this matches the alias in associations
          attributes: [] // Select relevant fields
        }
      ],
      group: ['cartId']
    })
    res.json(cart);
  } catch (error) {
    console.error('Error adding/updating cart items:', error);
  }
}