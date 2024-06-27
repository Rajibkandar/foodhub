const mongoose = require('mongoose');

const url = 'mongodb+srv://Foodhub:Foodhub@cluster0.bbs9khp.mongodb.net/Foodhub?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url);

    console.log('MongoDB connected successfully');
   const fetchedData= mongoose.connection.db.collection('food_items');
   const foodCategory= mongoose.connection.db.collection('foodCategory');

   const data = await fetchedData.find({}).toArray();

    const foodcat= await foodCategory.find({}).toArray();

//    console.log('Fetched data:', data);
    global.food_items=data;
    global.foodCategory=foodcat;
    // console.log(global.food_items)
    // console.log(global.foodCategory)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectToMongoDB;
