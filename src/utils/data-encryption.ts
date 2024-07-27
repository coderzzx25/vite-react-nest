import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
/**
 * 加密
 * @param {string} password - 密码
 * @returns {string} - 加密后的密码
 */
export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // 加盐强度
  const handlePassword = await bcrypt.hash(password, saltRounds);
  return handlePassword;
};

/**
 * 比对
 * @param {string} password - 密码
 * @param {string} hash - 加密后的密码
 * @returns {boolean} - 是否相等
 */
export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};

const algorithm = 'aes-256-cbc'; // 加密算法
const key = crypto.randomBytes(32); // 32位密钥
const iv = crypto.randomBytes(16); // 16位向量

/**
 * 加密
 * @param {string} data - 数据
 * @returns {string} - 加密后的数据
 */
export const encryptData = (data: string): string => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

/**
 * 解密
 * @param {string} encrypted - 加密后的数据
 * @returns {string} - 解密后的数据
 */
export const decryptData = (encrypted: string): string => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
