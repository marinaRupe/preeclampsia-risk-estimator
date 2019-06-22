export const userRoles = {
	Admin: {
		key: 0,
		value: 'admin',
		hr: 'Admin (VSS)',
		en: 'Admin',
	},
	Supervisor: {
		key: 1,
		value: 'supervisor',
		hr: 'Supervisor (VSS)',
		en: 'Supervisor',
	},
	Standard: {
		key: 2,
		value: 'standard',
		hr: 'Standard (SSS/VŠS)',
		en: 'Standard',
	},
};

export const userRolesList = Object.values(userRoles).map(u => u.value);
