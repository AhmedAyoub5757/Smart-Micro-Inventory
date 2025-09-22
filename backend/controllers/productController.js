import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message: "Product Not Fount"})
        }

        res.json(product);

    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
        // console.log("Post Successful");
        
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

        if(!updatedProduct){
            res.status(404).json({message: "Not Found"})
        }
        res.json(updatedProduct)
        
    } catch (error) {
        res.status(500).json({message:"Server Error", error: error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if(!deletedProduct){
            res.status(404).json({message: "Not Found"});
        }

        res.json("Product Deleted");
    } catch (error) {
        res.status(500).json({message: "Error", error: error.message});
    }
}