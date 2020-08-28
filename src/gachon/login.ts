import axios from 'axios';
import tough from 'tough-cookie';
import LoginCredentials from './interface';

export async function loginGachon(credentials: LoginCredentials) {
  const {username, password} = credentials;

  const jar = new tough.CookieJar();

  const resp = await axios.get(
    `https://att.gachon.ac.kr/ajax/PU_MNMN01_SVC/PU_MNMN01_LOGIN.do?USER_ID=${username}&USER_PW=${password}&isMobile=true&language=ko`,
    {
      jar: jar,
      withCredentials: true,
    },
  );

  if (!resp.data.loginChk) throw new Error("Invalid Credentials!");

  return {
    success: resp.data.loginChk,
    cookieJar: jar,
    rawData: resp.data,
  }
}
