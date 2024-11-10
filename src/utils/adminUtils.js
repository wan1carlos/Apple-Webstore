// List of admin email addresses
const ADMIN_EMAILS = ['admin@gmail.com'];

// Default admin credentials
export const DEFAULT_ADMIN = {
  email: 'admin@gmail.com',
  password: 'admin123'
};

export const isAdmin = (user) => {
  return user && ADMIN_EMAILS.includes(user.email);
}; 