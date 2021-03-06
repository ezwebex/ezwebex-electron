import { Application } from 'express';
import { GachonLoginSession, GachonUserData } from '../gachon/interface';
import { loginGachon } from '../gachon/login';
import { getTimetable } from '../gachon/timetable';
import { CookieJar } from 'tough-cookie';
import axios from 'axios';
    
const sessions: {
  [a: string]: GachonLoginSession;
} = {};

export function registerRouter(app: Application) {

  app.get('/login', async (req, res) => {
    const username = req.query['username'];
    const password = req.query['password'];

    if (!username || !password) {
      res.status(400);
      res.send({
        success: false,
        error: "Invalid Request"
      });
    }

    try {
      const loginRes = await loginGachon({
        username: username as string,
        password: password as string
      });

      const rawData = loginRes.rawData['USER_INFO'];

      const userData: GachonUserData = {
        major: {
          code: rawData['major_CD'],
          name: rawData['major_NM'],
        },
        gender: {
          code: rawData['gender'],
          name: rawData['sexdstn_NM'],
        },
        grade: rawData['grade'],
        name: rawData['user_NM'],
        id: rawData['user_NO'],
        metadata: {
          isProfessor: rawData['professor'],
          isStudent: rawData['student'],
          isAdmin: rawData['admin'],
          universityCode: rawData['univ_CD'],
          userState: rawData['user_ST_NM'],
        }
      };

      sessions[req.session.id] = {
        jar: loginRes.cookieJar,
        userData
      };

      res.send({
        success: true,
        userData
      });
  
      return;
    

    } catch(e) {
      console.error(e);
      res.status(403);
      res.send({
        success: false,
        error: e
      })
    }
  });

  app.get('/timetable', async (req, res) => {
    if (!sessions[req.session.id]) {
      res.status(403);
      res.send({
        success: false,
        error: "You are not signed in!"
      });
      return;
    }

    try {
      const session = sessions[req.session.id];
      const timetableRes = await getTimetable(session.jar as CookieJar, new Date());

      res.send({
        success: true,
        data: timetableRes
      });
    } catch(e) {
      res.status(403);
      console.error(e);
      res.send({
        success: false,
        error: e
      })
    }
  });


  app.get('/timetable/:date', async (req, res) => {
    if (!sessions[req.session.id]) {
      res.status(403);
      res.send({
        success: false,
        error: "You are not signed in!"
      });
      return;
    }

    const date = req.params.date;

    try {
      const session = sessions[req.session.id];
      const timetableRes = await getTimetable(session.jar as CookieJar, new Date(date));

      res.send({
        success: true,
        data: timetableRes
      });
    } catch(e) {
      res.status(403);
      console.error(e);
      res.send({
        success: false,
        error: e
      })
    }
  });

  app.get('/get_webex', async (req, res) => {

    const { year, semester, subjectCode, professorCode } = req.query;
    const date = new Date();

    try {

      const url = `http://sg.gachon.ac.kr/main?attribute=lectPlan&year=${year}&hakgi=${semester}&p_subject_cd=${subjectCode}&p_member_no=${professorCode}&lang=ko&fake=${date}`;

      const data = await axios.get(url);

      const webexLinkRegex = /(http|https):\/\/gachon.webex.com\/(webappng\/sites\/gachon\/dashboard\/pmr\/|meet\/)([A-Za-z0-9\._-]+)/g;

      const content = data.data;
      
      const parsed = webexLinkRegex.exec(content);

      console.log(parsed);

      if (parsed !== null) {
        res.send({
          success: true,
          data: "https://gachon.webex.com/meet/"+parsed[3]
        });
      } else {
        console.log(content);
        throw new Error("수강신청 서버에서 웹엑스 주소를 찾을 수 없었습니다!");
      }
    } catch(e) {
      res.status(403);
      console.error(e);
      res.send({
        success: false,
        error: e
      })
    }
  });
}