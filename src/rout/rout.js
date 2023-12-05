const express = require("express");
const rout = express.Router();
const pool = require("../database");
const multer = require("multer");
const path = require("path");
const upload = multer({
    storage: multer.diskStorage({
        destination: './src/Public/user_img',
        filename: (req, file, done) => {
            done(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }

    })
}).single('img');

function name(params) {

}

rout.get("/ShowPublic", async (req, res) => {
    console.log(await pool.query("show tables;"));
    res.json({ "new": { id: 12, name: "New" } });
});

async function verifi(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const {Name,Email,Number} = data;
            const rows = await pool.query("INSERT INTO data_user SET ?", { Name:(Name == '') ? null : Name ,Email:(Email == '') ? null : Email,Number:(Number == '') ? null : Number});
            reject(rows.insertId);
        } catch (error) {
            if(error.sqlMessage == "1"){
                resolve(null);
            }else{
                reject(null)
            }
        }
    });
}

rout.post("/du", async (req, res) => {
    const { Name, Email, Number } = req.body;
    verifi(req.body)
    .then(async()=>{try{await pool.query(`DELETE FROM data_user WHERE Number = '${Number}';`);}catch{res.sendStatus(400);}})
    .then(async()=>{try{const rows = await pool.query("INSERT INTO data_user SET ?", { Name, Email, Number });res.json(rows.insertId)}catch{res.sendStatus(400);}})
    .catch((error)=>{if(error == null){res.sendStatus(400);} else{res.json(error);}});
});



rout.post("/NewPulic", upload, (req, res) => {
});
rout.post("/new");
module.exports = rout;