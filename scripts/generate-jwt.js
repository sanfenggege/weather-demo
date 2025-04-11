// generate-jwt.js (根目录下)
import { webcrypto } from 'node:crypto';
globalThis.crypto = webcrypto;
import { SignJWT, importPKCS8 } from "jose";
import dotenv from 'dotenv';

// 加载.env文件
dotenv.config();

// 从process.env获取变量
const YourPrivateKey = process.env.VITE_PRIVATE_KEY;

if (!YourPrivateKey) {
  console.error('错误：未找到VITE_PRIVATE_KEY环境变量');
  process.exit(1);
}

importPKCS8(YourPrivateKey, 'EdDSA').then((privateKey) => {
  const customHeader = {
    alg: 'EdDSA',
    kid: 'T4WMJUB8EA' // 项目的凭据ID
  };

  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + 86400;

  const customPayload = {
    sub: '38E4M5Q9QR', // 项目ID
    iat: iat,
    exp: exp
  };

  new SignJWT(customPayload)
    .setProtectedHeader(customHeader)
    .sign(privateKey)
    .then(token => console.log('JWT: ' + token))
    .catch(err => console.error('签名失败:', err));
}).catch((error) => console.error('密钥导入失败:', error));