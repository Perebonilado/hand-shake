import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezome from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezome);

export default dayjs;