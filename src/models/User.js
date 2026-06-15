const bcrypt = require('bcryptjs');

/**
 * User Model
 * Represents a user with email and password credentials
 */
class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }

  /**
   * Hash the password using bcrypt
   * @returns {Promise<string>} Hashed password
   */
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return this.password;
  }

  /**
   * Compare plain password with hashed password
   * @param {string} plainPassword - Plain password to compare
   * @returns {Promise<boolean>} True if passwords match
   */
  async comparePassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  /**
   * Get user data without sensitive information
   * @returns {object} User data without password
   */
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;
