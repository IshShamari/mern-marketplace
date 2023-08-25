import { Request, Response } from 'express';
import Product from "../models/Product";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({message: 'Product not found'});
        res.json(product);
    } catch (err) {
        res.status(500).json({message: 'Server Error'});
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        // Create logic
        const { name, price, stock, description, imageUrl} = req.body;

        // Create a new product (duplicates are acceptable)
        let newProduct = new Product({
            name,
            description,
            price,
            stock,
            imageUrl
        });

        newProduct = await newProduct.save();

        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const { name, price, stock, description, imageUrl} = req.body;

        if (!productId) {
            return res.status(400).json({message: 'Product ID was not supplied'});
        }

        if (!name && !price && !stock && !description && !imageUrl) {
            return res.status(400).json({mesage: 'No updated values were provides'});
        }
        // Check if product exists
        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({message: 'Product does not exist'});
        }

        // Update values if provided
        if (name) product.name = name;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (description) product.description = description;
        if (imageUrl) product.imageUrl = imageUrl;

        product = await product.save()

        res.status(200).json({message: 'Product was updated successfully', product})

    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({message: 'Product ID was not supplied'});
        }

        // Check if product exists
        let product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({message: 'Product does not exist'});
        }

        await product.deleteOne(); // Deletes the product

        res.status(200).json({message: 'Product was deleted successfully', product})

    } catch (err) {
        res.status(500).json({message: 'Server error'})
    }
}