import { Request, Response } from "express";
// import { Product } from '../models/product';

const db = require('../models');

export const createProduct = async (req: Request, res: Response) => {
    try {
        console.log("Hello");
        const { name, category, price } = req.body;
        const newProduct = await db.Product.create({ name, category, price });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error in create Product', error })
    }
}

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await db.Product.findAll();
        console.log("product", products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};