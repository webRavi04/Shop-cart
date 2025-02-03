import { Request, Response } from "express";
// import { Product } from '../models/product';

const db = require('../models');

export const createProduct = async (req: Request, res: Response) => {
    try {
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

export const getProductById = async (req: Request, res: Response) => {
    try {
        console.log("test", req.params);
        const { id } = req.params;
        const product = await db.Product.findByPk(id);
        console.log(product)
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, category, price } = req.body;
        const product = await db.Product.findByPk(id);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price || product.price;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error in update product', error });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await db.Product.findByPk(id);
        console.log(product);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error in delete product', error });
    }
}