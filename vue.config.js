const crypto = require('crypto');
/* https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported */
/**
 * The MD4 algorithm is not available anymore in Node.js 17+ (because of library SSL 3).
 * In that case, silently replace MD4 by the MD5 algorithm.
 */
try {
  crypto.createHash('md4');
} catch (e) {
  console.warn('Crypto "MD4" is not supported anymore by this Node.js version');
  const origCreateHash = crypto.createHash;
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
  };
}

const WorkerPlugin = require('worker-plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/qrcode2stl/' : '/',
  configureWebpack: {
    output: {
      globalObject: 'this',
    },
    plugins: [
      new WorkerPlugin(),
    ],
  },
};
