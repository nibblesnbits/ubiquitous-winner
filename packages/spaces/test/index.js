const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  endpoint: "https://nyc3.digitaloceanspaces.com",
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_ACCESS_SECRET,
});

exports.main = (args) => {
  return s3.upload(
    {
      Bucket: process.env.S3_BUCKET,
      Key: args.filename,
      Body: args.fileBody,
    },
    (err, _data) => {
      if (err) {
        return console.error(err);
      }
      return {
        headers: { "content-type": "text/plain" },
        body: "Success",
      };
    }
  );
};

if (process.env.TEST) exports.main({ text: "hello" }).then(console.log);
