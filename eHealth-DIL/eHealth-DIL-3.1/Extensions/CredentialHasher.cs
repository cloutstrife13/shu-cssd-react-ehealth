using System;
using System.Security.Cryptography;
using eHealth_DataBus.Models;

namespace eHealth_DataBus.Extensions
{
    /// Inspired by: https://stackoverflow.com/questions/4181198/how-to-hash-a-password/10402129#10402129
    /// <summary>The CredentialHasher class is responsible for encrypting the user's password for security purposes.</summary>
    public class CredentialHasher
    {
        /// <summary>Default constructor of the CredentialHasher class</summary>
        public CredentialHasher() {}

        /// <summary>Encrypts the user's password based on a random salt generator that will hash the password.</summary>
        /// <param name="obj">Represents the Credential instance.</param>
        /// <param name="password">Optional parameter representing the user's password for rehashing by a new random salt.</param>
        /// <returns>Transformed Credential instance with the hashed password.</returns>
        public Credential EncryptUserPassword(Credential obj, string password = "")
        {
            if (password == "")
                password = obj.Password;

            // Generate random salt value
            byte[] salt;
            new RNGCryptoServiceProvider().GetBytes(salt = new byte[16]);

            // Generate hash value by salt
            byte[] hash = GenerateHashFromPassword(password, salt);

            // Append the salt to the hash to produce the hashed password
            byte[] hashBytes = GeneratePasswordHashBySalt(hash, salt);

            // Assign the hashed password and salt to the Credential instance
            obj.Password = Convert.ToBase64String(hashBytes);
            obj.Salt = Convert.ToBase64String(salt);

            return obj;
        }

        /// <summary>Validates the login credentials of a user against their details stored in the database.</summary>
        /// <param name="loginPassword">Represents the password issued by the login process.</param>
        /// <param name="dbPassword">Represents the encrypted password stored in the database.</param>
        /// <returns>Boolean value of the validation process.</returns>
        public bool ValidateUser(string loginPassword, string dbPassword)
        {
            // Extract bytes from password hash for salt
            byte[] hashBytes = Convert.FromBase64String(dbPassword);

            // Derive the salt from password hash
            byte[] salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);

            // Generate the hash from login password
            byte[] hash = GenerateHashFromPassword(loginPassword, salt);

            // Append the salt to the login hash to produce the password hash
            byte[] passwordHash = GeneratePasswordHashBySalt(hash, salt);

            return Convert.ToBase64String(passwordHash) == dbPassword;
        }

        /// <summary>Generates the hash value of the password based on a salt.</summary>
        /// <param name="password">The password required for the hashing process.</param>
        /// <param name="salt">The salt required for the hashing process.</param>
        /// <returns>The hash value of the password and salt.</returns>
        public byte[] GenerateHashFromPassword(string password, byte[] salt)
        {
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            return pbkdf2.GetBytes(20);
        }

        /// <summary>Generates the hashed password as part of the encryption process.</summary>
        /// <param name="hash">The password's hash value required for the encryption process.</param>
        /// <param name="salt">The salt required for the encryption process.</param>
        /// <returns>The encrypted password.</returns>
        public byte[] GeneratePasswordHashBySalt(byte[] hash, byte[] salt)
        {
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return hashBytes;
        }
    }
}
