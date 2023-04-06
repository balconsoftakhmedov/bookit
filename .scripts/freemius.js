const { deploy, release } = require('deploy-freemius');

deploy(process.env.FS_ZIP_PATH || './', process.env.FS_ZIP_NAME)
  .then(tag => {
    release(tag);
  });
