import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const secretKey = 'yourSecretKey'; // Replace with your actual secret key

function useTokenStorage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState(null);

  // Encrypt and store the token in local storage
  const saveToken = (plainToken) => {
    const encryptedToken = CryptoJS.AES.encrypt(plainToken, secretKey).toString();
    localStorage.setItem('encryptedToken', encryptedToken);
    setToken("Good");
  };

  // Retrieve and decrypt the token from local storage
  const loadToken = () => {
    const encryptedToken = localStorage.getItem('encryptedToken');
    if (encryptedToken) {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
      setToken(decryptedToken);
      return decryptedToken;
    }
    return null;
  };

  // Clear the token from local storage
  const clearToken = () => {
    localStorage.removeItem('encryptedToken');
    setToken(null);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return {
    saveToken,
    loadToken,
    clearToken,
  };
}

export default useTokenStorage;
