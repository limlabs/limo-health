import crypto from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Encryption constants
const IV_LENGTH = 16; // For AES, this is always 16 bytes
const ENV_KEY_NAME = 'ENCRYPTION_KEY';
const ENV_FILE_PATH = path.resolve(process.cwd(), '.env');

/**
 * Gets or generates an encryption key
 * - First tries to use the key from environment variable
 * - If not available, generates a new key and updates the .env file
 */
async function getEncryptionKey(): Promise<Buffer> {
  // Check if key exists in environment
  const envKey = process.env[ENV_KEY_NAME];
  
  // Validate if the key is a valid hex string of correct length
  if (envKey && /^[0-9a-f]{64}$/i.test(envKey)) {
    return Buffer.from(envKey, 'hex');
  }
  
  console.log('No valid encryption key found in environment, generating a new one');
  
  // Generate a new key
  const newKey = crypto.randomBytes(32);
  const hexKey = newKey.toString('hex');
  
  try {
    // Read current .env content
    let envContent = '';
    try {
      envContent = await fs.readFile(ENV_FILE_PATH, 'utf8');
    } catch {
      // File doesn't exist, create it
      envContent = '# Encryption settings\n';
    }
    
    // Update or add the encryption key
    if (envContent.includes(`${ENV_KEY_NAME}=`)) {
      envContent = envContent.replace(
        new RegExp(`${ENV_KEY_NAME}=.*`),
        `${ENV_KEY_NAME}=${hexKey}`
      );
    } else {
      envContent += `\n${ENV_KEY_NAME}=${hexKey}`;
    }
    
    // Write back to .env file
    await fs.writeFile(ENV_FILE_PATH, envContent, 'utf8');
    
    // Update process.env
    process.env[ENV_KEY_NAME] = hexKey;
    
    console.log('Generated new encryption key and updated .env file');
    return newKey;
  } catch (error) {
    console.error('Error updating .env file with encryption key:', error);
    // Still return the key even if we couldn't save it
    return newKey;
  }
}

/**
 * Encrypts data using AES-256-CBC
 * @param data - Data to encrypt (object or array)
 * @returns Encrypted data string
 */
export async function encrypt(data: any): Promise<string> {
  const key = await getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  
  const jsonData = JSON.stringify(data);
  let encrypted = cipher.update(jsonData, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Prepend IV to the encrypted data (IV doesn't need to be secret)
  return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypts data using AES-256-CBC
 * @param encryptedData - Encrypted data string
 * @returns Decrypted data as object or array
 */
export async function decrypt(encryptedData: string): Promise<any> {
  // If the data isn't encrypted yet (for backward compatibility)
  if (!encryptedData.includes(':')) {
    try {
      return JSON.parse(encryptedData);
    } catch {
      return [];
    }
  }

  const key = await getEncryptionKey();
  const [ivHex, encryptedHex] = encryptedData.split(':');
  
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return JSON.parse(decrypted);
}

/**
 * Checks if data is encrypted
 * @param data - Data string to check
 * @returns Boolean indicating if data is encrypted
 */
export function isEncrypted(data: string): boolean {
  return data.includes(':') && 
         /^[0-9a-f]{32}:[0-9a-f]+$/i.test(data);
}
