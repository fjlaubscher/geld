import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

// config
const S3_BUCKET = process.env.S3_BUCKET || 'bucket_name';
const S3_REGION = process.env.S3_REGION || 'region_name';
const IDENTITY_POOL_ID = process.env.IDENTITY_POOL_ID || 'aws_cognito_pool_id';

// set AWS config
AWS.config.update({
  region: S3_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IDENTITY_POOL_ID
  })
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: S3_BUCKET }
});

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${new Date().toISOString()}-${file.originalname}`);
    }
  })
});

export const getSignedUrl = async (key: string) =>
  await s3.getSignedUrlPromise('getObject', {
    Bucket: S3_BUCKET,
    Key: key
  });

export const deleteKey = async (key: string) =>
  new Promise((resolve, reject) =>
    s3.deleteObject({ Bucket: S3_BUCKET, Key: key }, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve();
    })
  );
