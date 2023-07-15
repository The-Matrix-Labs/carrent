import multer from "multer";
const crypto = require('crypto');
import { claimImagesUploadDir } from '../config';
import fs from 'fs';
import { verifyJWTToken } from '../helpers/auth';

const storage = multer.diskStorage({
    destination: claimImagesUploadDir,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);

            let ext;

            switch (file.mimetype) {
                case 'image/jpeg':
                    ext = '.jpeg';
                    break;
                case 'image/png':
                    ext = '.png';
                    break;
            }

            cb(null, raw.toString('hex') + ext);
        })
    }
});

const upload = multer({ storage });

function removeFile(fileName) {

    if (fs.existsSync(claimImagesUploadDir + fileName)) {
        fs.unlink(claimImagesUploadDir + fileName, (err) => {
            if (err) throw err;
            console.log('successfully deleted');
        });
    }
}

async function checkUserLoggedIn(req) {
    let isUserLoggedIn = req.user;
    if (req.headers && req.headers.auth && !isUserLoggedIn) isUserLoggedIn = await verifyJWTToken(req.headers.auth);
    if (!isUserLoggedIn || !isUserLoggedIn.id) return 400;
    else return 200;
}

const claimImagesUpload = app => {
    app.post('/claim/photos', upload.array('file'), async function (req, res) {
        if ((await checkUserLoggedIn(req)) !== 200) {
            res.send({ status: 400 });
            return;
        }
        let files = req.files;
        res.send({ status: 200, files });

    })

    app.post('/remove/claim/photos', async function (req, res) {
        if ((await checkUserLoggedIn(req)) !== 200) {
            res.send({ status: 400 });
            return;
        }
        removeFile(req.body.filename)
        res.send({ status: 200 });
    })
}

export default claimImagesUpload;