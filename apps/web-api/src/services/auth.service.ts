export const authService = {
  // TODO: Implement user creation
  async createUser(_email: string, _password: string, _name?: string) {
    // Hash password
    // Save to database
    // Return user data
  },

  // TODO: Implement user login
  async loginUser(_email: string, _password: string) {
    // Find user by email
    // Verify password
    // Generate JWT token
    // Return token
  },

  // TODO: Implement token verification
  async verifyToken(_token: string) {
    // Verify JWT token
    // Return user data from token
  },
};
