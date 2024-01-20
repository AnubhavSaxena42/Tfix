import { faker } from "@faker-js/faker";
import {
  ATTACHMENT_TYPES,
  COMPANIES,
  REQUEST_STATUS,
} from "../constants/constants";
import dayjs from "dayjs";

export const lerp = (x, y, a) => x * (1 - a) + y * a;

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const generateData = () => {
  const numberOfRequests = getRandomInt(0, 12);
  const dataArray = [...Array(numberOfRequests)].map((_, i) => {
    return {
      id: faker.string.uuid(),
      subject: `${faker.person.fullName()}:Sent you a mail`,
      time: dayjs().format("HH:mm"),
      status:
        Math.random() < 0.5 ? REQUEST_STATUS.PENDING : REQUEST_STATUS.PROCESSED,
      company: COMPANIES[Math.floor(Math.random() * COMPANIES.length)],
      attachments: [...Array(getRandomInt(1, 3))].map((_, i) => {
        return {
          type: ATTACHMENT_TYPES[
            Math.floor(Math.random() * ATTACHMENT_TYPES.length)
          ],
        };
      }),
    };
  });
  return dataArray;
};
