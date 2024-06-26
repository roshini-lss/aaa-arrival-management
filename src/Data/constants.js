import { driveImageIds } from "../constants/static-assets";
import { getDriveImageUrl } from "../utils/url-utils";

export const cardsData = [
  {
    title: "AZ",
    color: "green",
    img: getDriveImageUrl(driveImageIds["ca-image"]),
    totalWO: 1598,
    assingedPTA: 1561,
    delays: 83,
    unassigned: 37,
    problemCode: [
      {
        title: "Battery Jump",
        img: getDriveImageUrl(driveImageIds["battery-jump"]),
        totalWO: 150,
        assingedPTA: 145,
        delays: 10,
        unassigned: 5,
      },
      {
        title: "Battery Service",
        img: getDriveImageUrl(driveImageIds["battery-service"]),
        totalWO: 254,
        assingedPTA: 248,
        delays: 12,
        unassigned: 8,
      },
      {
        title: "Extrication Recovery",
        img: getDriveImageUrl(driveImageIds["extraction-recovery"]),
        totalWO: 35,
        assingedPTA: 34,
        delays: 8,
        unassigned: 5,
      },
      {
        title: "Flat Tyre No Spare",
        img: getDriveImageUrl(driveImageIds["flat-tyre"]),
        totalWO: 127,
        assingedPTA: 120,
        delays: 10,
        unassigned: 4,
      },
      {
        title: "Tow Accident",
        img: getDriveImageUrl(driveImageIds["tow-accident"]),
        totalWO: 170,
        assingedPTA: 168,
        delays: 12,
        unassigned: 7,
      },
      {
        title: "Tow Motorcycle",
        img: getDriveImageUrl(driveImageIds["tow-motorcycle"]),
        totalWO: 321,
        assingedPTA: 316,
        delays: 10,
        unassigned: 5,
      },
      {
        title: "Tow Mechanical",
        img: getDriveImageUrl(driveImageIds["tow-mechanical"]),
        totalWO: 222,
        assingedPTA: 220,
        delays: 8,
        unassigned: 1,
      },
      {
        title: "Lockout",
        img: getDriveImageUrl(driveImageIds["lockout"]),
        totalWO: 319,
        assingedPTA: 310,
        delays: 13,
        unassigned: 2,
      },
    ],
  },
  {
    title: "MT",
    color: "green",
    img: getDriveImageUrl(driveImageIds["mt-image"]),
    totalWO: 346,
    assingedPTA: 324,
    delays: 15,
    unassigned: 22,
    problemCode: [
      {
        title: "Battery Jump",
        img: getDriveImageUrl(driveImageIds["battery-jump"]),
        totalWO: 30,
        assingedPTA: 27,
        delays: 2,
        unassigned: 3,
      },
      {
        title: "Battery Service",
        img: getDriveImageUrl(driveImageIds["battery-service"]),
        totalWO: 42,
        assingedPTA: 40,
        delays: 3,
        unassigned: 2,
      },
      {
        title: "Extrication Recovery",
        img: getDriveImageUrl(driveImageIds["extraction-recovery"]),
        totalWO: 26,
        assingedPTA: 23,
        delays: 1,
        unassigned: 3,
      },
      {
        title: "Flat Tyre No Spare",
        img: getDriveImageUrl(driveImageIds["flat-tyre"]),
        totalWO: 60,
        assingedPTA: 57,
        delays: 2,
        unassigned: 3,
      },
      {
        title: "Tow Accident",
        img: getDriveImageUrl(driveImageIds["tow-accident"]),
        totalWO: 35,
        assingedPTA: 33,
        delays: 2,
        unassigned: 2,
      },
      {
        title: "Tow Motorcycle",
        img: getDriveImageUrl(driveImageIds["tow-motorcycle"]),
        totalWO: 42,
        assingedPTA: 39,
        delays: 2,
        unassigned: 3,
      },
      {
        title: "Tow Mechanical",
        img: getDriveImageUrl(driveImageIds["tow-mechanical"]),
        totalWO: 55,
        assingedPTA: 51,
        delays: 2,
        unassigned: 1,
      },
      {
        title: "Lockout",
        img: getDriveImageUrl(driveImageIds["lockout"]),
        totalWO: 34,
        assingedPTA: 32,
        delays: 1,
        unassigned: 2,
      },
    ],
  },
];
