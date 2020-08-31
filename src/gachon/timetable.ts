import axios from 'axios';
import { default as axiosCookieJarSupport } from 'axios-cookiejar-support';
import tough from 'tough-cookie';
import { dateToString } from './common';

export async function getTimetable(jar: tough.CookieJar, date: Date) {

  const timetableResult = await axios.get(
    `https://att.gachon.ac.kr/ajax/ST_SALA02_SVC/ST_SALA02_R01.do?FROM_YMD=${dateToString(date)}&DT=${dateToString(date)}`,
    {
      jar: jar,
      withCredentials: true,
    },
  );
  
  if (timetableResult.data.errmsg) throw new Error("Timetable Load Failed!");

  const timetable = [];

  const timetableData = timetableResult.data;
  const dateStringJSON = dateToString(date).replace(/-/g, '');

  for (const subject of timetableData) {
    let duplicate = false;
    for (const eachTimetable of timetable) {
      if (eachTimetable.id === subject.LECT_CD) {
        duplicate = true;
      }
    }
    if (duplicate) {
      continue;
    }

    if (dateStringJSON === subject.LECT_YMD) {
      if (!subject.FROM_HM) subject.FROM_HM = "0000";
      if (!subject.TO_HM) subject.TO_HM = "0000";

      timetable.push({
        name: subject.LECT_NM,
        date: subject.LECT_YMD,
        startTime: subject.FROM_HM,
        endTime: subject.TO_HM,
        id: subject.LECT_CD,
        professorCode: subject.PROF_NO,
        professorName: subject.PROF_NM,
        semesterCode: subject.TERM,
        subjectCode: subject.LECT_CD,
      });
    }
  }

  timetable.sort((a, b) => a.startTime - b.startTime);

  return timetable;
}
