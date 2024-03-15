import { getRandomArrayElement } from "../utils";
import { TRANSPORT_IMAGES } from "./const";

const mockPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    base_price: 800,
    date_from: '2019-07-13T22:55:00.845Z',
    date_to: '2019-07-13T23:46:00.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    is_favorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'drive',
  },
  {
    id: 'f5b62099-293f-4c3d-a702-94eec4a2808c',
    base_price: 1100,
    date_from: '2019-07-19T22:55:56.845Z',
    date_to: '2019-07-20T12:22:13.375Z',
    destination: 'cfe516cq-10xa-ye10-8077-2fs9a01edcab',
    is_favorite: true,
    offers: [
      'b5c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'taxi'
  },
  {
    id: 'f6b62099-293f-4c3d-a702-94eec4a2808c',
    base_price: 2100,
    date_from: '2019-07-14T22:55:56.845Z',
    date_to: '2019-07-16T23:22:13.375Z',
    destination: 'cfe616cq-10xa-ye10-8077-2fs9a01edcab',
    is_favorite: false,
    offers: [
      'b6c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'bus'
  },
  {
    id: 'f7b62099-293f-4c3d-a702-94eec4a2808c',
    base_price: 350,
    date_from: '2019-07-14T22:55:56.845Z',
    date_to: '2019-07-16T23:22:13.375Z',
    destination: 'cfe716cq-10xa-ye10-8077-2fs9a01edcab',
    is_favorite: false,
    offers: [
      'b7c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: 'bus'
  }

]

function getRandomPoint() {
  const randPoint = getRandomArrayElement(mockPoints);
  return randPoint;
}

export { getRandomPoint };