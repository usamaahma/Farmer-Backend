const allRoles = {
  user: ['getUsers', 'manageUsers'],
  admin: ['getUsers', 'manageUsers'],
  farmer: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
