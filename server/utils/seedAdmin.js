const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminEmail = 'admin@school.com';
    const adminUser = await User.findOne({ username: adminEmail });

    if (!adminUser) {
      const newAdmin = new User({
        username: adminEmail,
        password: 'admin123', // Default seeded password
        role: 'Super Admin',
        email: adminEmail,
        isFirstLogin: false, // Don't block seeding testing
      });
      await newAdmin.save();
      console.log('-------------------------------------------');
      console.log('Default Admin Account Seeded successfully!');
      console.log('Username: admin@school.com');
      console.log('Password: admin123');
      console.log('Role: Super Admin');
      console.log('-------------------------------------------');
    } else {
      console.log('Admin account already exists. Seeding skipped.');
    }
  } catch (error) {
    console.error(`Error seeding admin account: ${error.message}`);
  }
};

module.exports = seedAdmin;
