import { CookieJar } from "tough-cookie";

interface LoginCredentials {
  username: string;
  password: string;
}

export interface GachonLoginSession {
   jar: CookieJar;
   userData: GachonUserData;
}

export interface GachonUserData {
  major: {
    code: string;
    name: string;
  };
  gender: {
    code: string;
    name: string;
  };
  grade: string;
  name: string;
  id: string;
  metadata: {
    isProfessor: boolean;
    isStudent: boolean;
    isAdmin: boolean;
    universityCode: string;
    userState: string;
  };
}

export default LoginCredentials;
