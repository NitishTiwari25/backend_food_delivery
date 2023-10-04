const mongoose = require("mongoose");

//const path="mongodb://127.0.0.1:27017/go_food";

// const mongoDB=async()=>{
//   await mongoose.connect("mongodb://127.0.0.1:27017/go_food",{ useNewUrlParser:true },
// async(err,result)=>{
//     if(err)  console.log("invalid ",err);
//         else{
//         console.log("connected");
//     // const fetched_data= await mongoose.connection.db.collection("foodCategory");
//     // fetched_data.find({}).toArray(function(err,data){
//     //     if(err){
//     //         console.log(err);
//     //     }
//     //     else{
//     //         console.log(data);
//     //     }
//     // })
//     }
// });
// }
// module.exports = mongoDB();




// //create a database
// //mongoose.connect("mongodb://config.host+":"+config.port+'/'+config.db)
const mongoDB = async () => {
    await mongoose.connect("mongodb+srv://nitish9318306726:admin931@cluster0.wo1mjin.mongodb.net/go_food?retryWrites=true&w=majority&appName=mernstack", {
        // useCreateIndex:true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    ).then(() => {
        console.log("connection successful");

        const fetched_data = mongoose.connection.db.collection("foodData2");
        fetched_data.find({}).toArray( function (err, data) {
            const foodCatogory=  mongoose.connection.db.collection("foodCatogory");

            foodCatogory.find({}).toArray(function (err, catdata) {
                if (err) {
                    console.log(err);
                }
                else {
                    global.foodData2 = data;
                    global.foodCatogory= catdata;

                    console.log(global.foodCatogory);
                    console.log(global.foodData2);
                }
            })

            // if(err){
            //     console.log(err);
            // }
            // else{
            //     global.foodData2=data;
            //    // console.log(global.foodData2);
            // }
        })

        // }
    }).catch((error)=>{
            console.log(`unable to connect${error}`);
        })
}
// .catch((error)=>{
// //     console.log(`unable to connect${error}`);
// // })

module.exports = mongoDB();


