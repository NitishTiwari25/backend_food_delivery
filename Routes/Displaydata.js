const express = require("express")
const router = express.Router()



router.post("/foodData2", async (req, res) => {

    try {
        //console.log(global.foodData2)
 res.send([global.foodData2,global.foodCatogory])

    } catch (error) {
        console.log(error)
        res.send("server error")
       
    }

})

module.exports = router;