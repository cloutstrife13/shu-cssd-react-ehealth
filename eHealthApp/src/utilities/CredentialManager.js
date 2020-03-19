import Base64 from "crypto-js/enc-base64";
import hmacSHA1 from "crypto-js/hmac-sha1";

/**
 * Exports a singleton instance of the CredentialEncryptor class
 * as a means of encrypting the password.
 */
export default new (class CredentialEncryptor {
  /**
   * The default constructor of the CredentialEncryptor class.
   * @returns {CredentialEncryptor} Returns the singleton instance
   * of this client.
   */
  constructor() {
    /**
     * Encrypts the user's password based on the username and password.
     * @param {string} privateKey Represents the username.
     * @param {string} secret Represents the password.
     * @returns {string} Hash value based on the username and password.
     */
    this.EncryptAccesscode = (privateKey, secret) => {
      // Encrypt password based on username
      let hash = hmacSHA1(secret, privateKey);
      return Base64.stringify(hash);
    };
  }
})();
