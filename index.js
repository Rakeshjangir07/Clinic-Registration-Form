
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const path = require('path')




const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('public') );








mongoose.connect('mongodb://localhost:27017/database ',{ useNewUrlParser: true, useUnifiedTopology: true });


var db = mongoose.connection;
db.on('error',()=>console.log("ERROR in connecting to database"))
db.once('open',()=>console.log('connected to the database'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const barcodeSchema = new mongoose.Schema({
    code: String
});
const Barcode = mongoose.model('Barcode', barcodeSchema);


const checkBox = mongoose.model("checkbox", {
    checkbox: String
});


app.post('/submit-payment', (req, res) => {
    const { paymentType, barcode } = req.body;
    // Here, you can handle the payment processing logic.
    // For now, we'll just send a success response.
    res.send({ status: 'success', message: 'Payment processed successfully', barcode: barcode });
});


app.post("/sign_up",(req,res)=>{
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var phone = req.body.phone
    var gender = req.body.gender
    var testdate = req.body.testdate
    var testname  = req.body.testname
    var Doctorname = req.body.Doctorname  
    var address = req.body.address
    var vials = req.body.vials
 var remark = req.body.remark
    


    var data = {
        "name":name,
        "age":age,
        "email":email,
        "phone":phone,
        "gender":gender,
        
        "Doctorname ":Doctorname ,
        "address":address,
        "vials":vials,
        "remark":remark,
        "testdate":testdate,
        "testname":testname


        
        
    }
    
    
     db.collection('user').insertOne(data,(err,collection)=> {
        if(err){
            throw err;
        }
        console.log("Record insterted successfully")


        
    })
 
    return res.redirect('barcode.html')
})


app.post('/api/barcodes', async (req, res) => {
    console.log('Received POST request at /api/barcodes'); // Log when the endpoint is hit
    console.log('Request body:', req.body); // Log the request body
    try {
        const barcode = new Barcode({ code: req.body.code });
        await barcode.save();
        console.log('Barcode saved:', barcode); // Log the saved barcode
        res.status(201).send(barcode);
    } catch (error) {
        console.error('Error saving barcode:', error); // Log any errors
        res.status(500).send({ message: 'Failed to save barcode', error });
    }
});



app.post("/payment_done",(req,res)=>{
    var amount = req.body.amount
    var PatientName = req.body.PatientName

    var data = {
        "amount":amount,
        "PatientName":PatientName
    }
    db.collection('Payment').insertOne(data,(err,collection)=> {
        if(err){
            throw err;
        }
        console.log("Record insterted successfully")
    })
 
    return res.redirect('signup_succesful.html')
})

app.post("/payment_done1",(req,res)=>{
    var amount = req.body.amount
    var PName = req.body.PName
    var cardnumber= req.body.cardnumber
    var expirydate= req.body.expirydate
    var cvv = req.body.cvv

    var data = {
        "amount":amount,
        "PName":PName,
        "cardnumber":cardnumber,
        "cvv":cvv,
        "expirydate":expirydate

    }
    db.collection('Payment').insertOne(data,(err,collection)=> {
        if(err){
            throw err;
        }
        console.log("Record insterted successfully")
    })
 
    return res.redirect('signup_succesful.html')
})





    

app.post("/payment_done2",(req,res)=>{
    var amount = req.body.amount
    var Pname = req.body.Pname
    var description= req.body.description

    var data = {
        "amount":amount,
        "Pname":Pname,
        
        "description":description

    }
    db.collection('Payment').insertOne(data,(err,collection)=> {
        if(err){
            throw err;
        }
        console.log("Record insterted successfully")
    })
 
    return res.redirect('signup_succesful.html')
})
app.post("/payment_done3",(req,res)=>{
    var amount = req.body.amount
    var Pname = req.body.Pname
   

    var data = {
        "amount":amount,
        "Pname":Pname
      
    }
    db.collection('Payment').insertOne(data,(err,collection)=> {
        if(err){
            throw err;
        }
        console.log("Record insterted successfully")
    })
 
    return res.redirect('signup_succesful.html')
})

app.get("/",(req,res)=>{
    res.set({"Allow-access-Allow-origin ":'*'

}
);


return res.redirect('index.html')
}).listen(8000);

console.log("listening on port 8000")