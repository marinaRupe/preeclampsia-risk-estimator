export const userRoles = {
  Admin: {
    key: 0,
    value: 'admin',
    hr: 'Admin (VSS)',
  },
  Supervisor: {
    key: 1,
    value: 'supervisor',
    hr: 'Supervisor (VSS)'
  },
  Standard: {
    key: 2,
    value: 'standard',
    hr: 'Standard (SSS/VŠS)',
  },
};

export const userRolesList = Object.values(userRoles).map(u => u.value);
