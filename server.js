const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const multer = require("multer");
const bodyParser = require("body-parser");

const externalRequest = require("./middleware/external-requests");

const { saveImage, saveImages } = require("./helpers/images");
const {sendEmail} =require("./helpers/Email/sendEmail")
const {htmlContent} =require("./helpers/Email/template")
const {resetHtmlContent} =require("./helpers/Email/resetTemplate")
const { saveImageAsync}=require("./helpers/Images/images")
const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(externalRequest);
app.use(isAuth);

app.use(
    "/graphql",
    expressGraphQL({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);

const upload = multer({
    dest: "/uploads"
});

app.get("/reset/:id",(req,res)=>{
    var tryFetch = {response: `resetting ${req.params.id}`};
    res.status(200).json(tryFetch);
})

app.post("/reset",(req,res)=>{
    console.log("resetmethod")
    console.log(req.body.email)
    console.log(req.body.id)
    const emailContent={
        name:"oscar",
        email:req.body.email,
        phone:"6862645073",
        topic:"duda existencial",
        body:"porque no vuelves",
        siteName:"oscar site",
        id:req.body.id
    }
    const content=resetHtmlContent(emailContent)
    console.log(content)
    const emailInfo={
        to:"oscaralonso11@hotmail.com",
        subject:"Reset Password",
        htmlContent:content
    }
    sendEmail(emailInfo);
    var tryFetch = {response: 'Email sent'};
    res.status(200).json(tryFetch);
})

app.post("/sometrial",(req,res)=>{
    console.log("sometrialmethod")
    // res.send("hehe")
    // sendEmail()
    // htmlContent;
    console.log(req.body.firstParam)
    const emailContent={
        name:"oscar",
        email:"oscaralonso11@hotmail.com",
        phone:"6862645073",
        topic:"duda existencial",
        body:"porque no vuelves"
    }
    const content=htmlContent(emailContent)
    console.log(content)
    const emailInfo={
        to:"oscaralonso11@hotmail.com",
        subject:"correo importante",
        htmlContent:content
    }
    sendEmail(emailInfo);
    var tryFetch = {myString: 'I am working fetch'};
    res.status(200).json(tryFetch);

});

app.post('/uploadImage', upload.single("file"), (req, res) => {
    saveImage(req, res);
});

app.post('/uploadImages', upload.array("files"), (req, res) => {
    saveImages(req, res);
});

app.post('/uploadUserImage', upload.array("files"), async (req, res) => {
    const folder=req.body.folder
    console.log(`folder donde se guardara: ${folder}`)
    await saveImageAsync(req,res,folder);

});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
        }@admincluster-zdvxr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    ,{ useNewUrlParser: true })
    .then(() => app.listen(5000))
    .catch(err => console.log(err));