const router = require('express').Router();
// import todo model
const todoItemsModel = require('../models/todoItems');

// create our first route -- we will add todo item to our database
router.post('/api/item',async (req,res)=>{
    try{
        const newItems = new todoItemsModel({
            item: req.body.item
        })
        const saveItem = await newItems.save()
        res.status(200).json(saveItem);
    }catch(err){
        res.json(err);
    }
})

// create second route --get data from database
router.get('/api/item',async(req,res)=>{
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems)
    } catch (err) {
        res.json(err);        
    }
})

// Update Item
router.put('/api/item/:id',async(req,res)=>{
    try {
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id,{$set: req.body});
        res.status(200).json("Item Updated");
    } catch (err) {
        res.json(err);
    }
})

// Delete Item
router.delete('/api/item/:id',async(req,res)=>{
    try {
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Item Deleted");
    } catch (err) {
        res.json(err);
    }
})

// exports router
module.exports = router;