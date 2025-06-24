export interface User {
  id: string;
  fullName: string;
  email: string;
  isRegistered: boolean;
  lastLogin?: Date;
  educationalCategory?: string;
  ageGroup?: string;
  fieldOfInterest?: string[];
  avatar?: string;
  score?: number;
  isPremium: boolean;
}

export interface SessionOptions {
  type: 'individual' | 'group' | 'community' | 'explanation';
  duration: 15 | 25 | 30 | 45 | 50 | 60;
  isPremium: boolean;
}

export interface FilterOptions {
  educationalCategory: string[];
  ageGroup: string[];
  academicSubjects: {
    enabled: boolean;
    highSchool: {
      enabled: boolean;
      subjects: string[];
    };
    university: {
      enabled: boolean;
      subjects: string[];
    };
  };
  selfLearning: {
    enabled: boolean;
    topics: string[];
  };
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
}