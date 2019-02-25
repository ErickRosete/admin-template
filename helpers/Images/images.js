const path = require("path");
const fs = require("fs");
const { pathImages}=require("./constants")
// further reading
// https://stackoverflow.com/questions/4482686/check-synchronously-if-file-directory-exists-in-node-js
// https://flaviocopes.com/node-folders/
// https://stackoverflow.com/questions/17699599/node-js-check-exist-file
// https://stackoverflow.com/questions/30400603/when-working-with-nodejs-fs-mkdir-what-is-the-importance-of-including-callbacks/30400761
// https://nodejs.org/dist/latest-v10.x/docs/api/fs.html
// https://stackoverflow.com/questions/50954538/javascript-can-you-throw-an-object-in-an-error
// https://dev.to/maxart2501/gotchas-about-asyncawait-and-promises-9di

exports.saveImageAsync = async (req, res, folder) => {
  console.log(`path images ${pathImages}`)
  const imageLinks = [];
  var contador=0;
  // al usar el middleware en lugar de estar en image [console.log(req.body.image);] se va a files de multer
  console.log(req.files);
  req.files.forEach(file => {
      contador++;
    saveImageAux(file, res, folder).then(imageLink => {
      console.log(`imagelink obtenido: ${imageLink}`)
      if(imageLink=="fail")return
      imageLinks.push(imageLink);
      if (req.files.length == imageLinks.length && imageLinks[0]!=null) {
        console.log("todo bien")
        console.log(`contador ${contador}`)
        res.status(200).json(imageLinks);
      }
    })
    .catch((err)=>{
      // example checkFileExists is not defined(on saveimage aux put following line)
      // console.log(`asincrono \n archivo ${targetDir} existe:  ${await checkFileExists(checkDirectoryExists2)}`)
      // console.log("hubo un error")
      // console.log(Object.getOwnPropertyNames(err))
      console.log(err.message)
      const error={
        errorMessage:err.message
      }
      console.log(error)
      res.status(500).json(error);
    });
    // console.log(result)
  });
};

function checkDirectoryExists(filepath){
  // returns a promise which resolves true if file exists:
  // https://stackoverflow.com/questions/17699599/node-js-check-exist-file
  // let checkFileExists = s => new Promise(r=>fs.access(s, fs.F_OK, e => r(!e)))
  return new Promise((resolve, reject) => {
    // fs.access para asincrono
    fs.access(filepath, fs.F_OK, (error) => {
      resolve(!error);
    });
  });
}

function createDirectory(filepath){
  // https://nodejs.org/dist/latest-v10.x/docs/api/fs.html
  return new Promise((resolve, reject) => {
    fs.mkdir(filepath, { recursive: false }, (error) => {
      resolve(!error);
    });
  });
}

function renameFile(tempPath,targetPath){
  return new Promise((resolve, reject) => {
    fs.rename(tempPath, targetPath, (error) => {
      resolve(!error);
    });
  });
}

function removeFile(path){
  return new Promise((resolve,reject)=>{
    fs.unlink(path, (err) => {
      resolve(!err);
    })
  })
}

const handleServerError=(err,customMessage,code,res)=>{
  const error={errorMessage: customMessage + ", mensaje original:" +err.message}
  console.log(error)
  res.status(code).json(error);
}

const forbiddenError=(customMessage,code,res)=>{
  const error={errorMessage: customMessage }
  console.log(error)
  res.status(code).json(error);
}

const saveImageAux = async (file, res, folder) => {
  const folderImages = `../../public/images/`;
  const folderPath = `../../public/images/${folder}/`;
  console.log(folderPath);
  console.log(path.join(__dirname, folderPath, file.originalname));
  const tempPath = file.path;
  const targetDir=path.join(__dirname,folderImages)
  const targetDir2=path.join(__dirname,folderPath)
  const targetPath = path.join(__dirname, folderPath, file.originalname);
  let imageLink = `${pathImages}/${folder}/${file.originalname}`;

  const fileExt = path.extname(file.originalname).toLowerCase();
  console.log(`Extension: ${fileExt}`)
  if (fileExt === ".png" || fileExt === ".jpg" || fileExt === ".jpeg" || fileExt === ".bmp" || fileExt === ".gif") {
    // console.log(`asincrono \n archivo ${targetDir} existe:  ${await checkDirectoryExists(targetDir)}`)
    await checkDirectoryExists(targetDir2).then(async (existencia) => {
      console.log(`${targetDir2} existe: ${existencia}`)
      if(!existencia){
        console.log(`creando directorio ${targetDir2}`)
        await createDirectory(targetDir2).then(async (stuff)=>{
          console.log(`se creo archivo, status ${stuff}`)
          await renameFile(tempPath,targetPath).then((bool)=>{
            console.log(`se renombro archivo en directorio creado : ${bool}`)
            // imageLink="folder creado"
          }).catch((err)=>{
            handleServerError(err,"error al renombrar en directorio creado",500,res)
          })
        }). catch((err)=>{
          handleServerError(err,"error al crear directorio",500,res)
        })
      }
      else{
        console.log("ya existia")
        await renameFile(tempPath,targetPath).then((bool)=>{
          console.log(`se renombro archivo en directorio existente previamente : ${bool}`)
          // imageLink="ya existia folder"
        }).catch((err)=>{
          handleServerError(err,"error al renombrar en directorio existente previamente",500,res)
        })
      }
    })
  }
  else{
    console.log("formato inadecuado")
    await removeFile(tempPath).then((bool)=>{
      console.log(`Archivo temporal ${tempPath} eliminado: ${bool}`)
      forbiddenError("Formato Inadecuado",403,res)
      imageLink="fail"
    }).catch((err)=>{
      handleServerError(err,"Formato Inadecuado y error al eliminar archivo temporal",500,res)
    })
  }

  return imageLink
};
