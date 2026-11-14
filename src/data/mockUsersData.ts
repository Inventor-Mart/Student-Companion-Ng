import { RegisteredUserProfile } from '../types';

// Strictly retains Super Admins only. All test/sample student, parent, tutor,
// and school admin personas and synthetic credits have been purged.
export const INITIAL_USER_DIRECTORY: RegisteredUserProfile[] = [
  {
    id: 'usr-dev-martorefe',
    role: 'admin',
    fullName: 'Martin Omorefe',
    email: 'martorefe@gmail.com',
    emailVerified: true,
    isSuperAdmin: true,
    isDeveloper: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    adminData: {
      schoolName: 'Student Companion Central Administration',
      schoolType: 'Super Admin & Development Directorate'
    }
  }
];
