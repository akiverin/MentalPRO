import React from "react";
export { default } from "./Instruments";

import { instrumentImages } from "./instrumentsImages";

import IconCases from "@/components/ui/icons/IconCases";
import IconSurveys from "@/components/ui/icons/IconSurveys";
import IconOrganizations from "@/components/ui/icons/IconOrganizations";
import IconProfile from "@/components/ui/icons/IconProfile";

export interface IInstrument {
  id: number;
  images: {
    avif: string[];
    webp: string[];
    png: string[];
  };
  bg: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  desc: string;
  link: string;
}

export const INSTRUMENTS: IInstrument[] = [
  {
    id: 0,
    images: instrumentImages.instrument01,
    bg: "linear-gradient(147deg,#648aac 0%,#9ac8e4 67.91%,#bbcad2 100%) ",
    name: "Практики",
    path: "/cases",
    icon: <IconCases />,
    desc: "Короткие техники управления стрессом, которые можно применять в повседневной жизни.",
    link: "Все практики",
  },
  {
    id: 1,
    images: instrumentImages.instrument02,
    bg: "linear-gradient(147deg, #355535 0%, #84a583 67.91%, #e3f0e3 100%)",
    name: "Опросы",
    path: "/surveys",
    icon: <IconSurveys />,
    desc: "Определение уровня тревожности, триггеров стресса и анализ полученных результатов.",
    link: "Все опросы",
  },
  {
    id: 2,
    images: instrumentImages.instrument03,
    bg: "linear-gradient(147deg, #7d6247 0%, #c4bba0 67.91%, #d3d0bd 100%)",
    name: "Организации",
    path: "/organizations",
    icon: <IconOrganizations />,
    desc: "Мониторинг психологического состояния сотрудников и рекомендации по снижению стресса.",
    link: "Все организации",
  },
  {
    id: 3,
    images: instrumentImages.instrument04,
    bg: "linear-gradient(147deg, #824877 0%, #ae7b7c 67.91%, #f9e7d9 100%)",
    name: "Профиль",
    path: "/profile",
    icon: <IconProfile />,
    desc: "Индивидуальный дашборд с динамикой изменений уровня тревожности.",
    link: "Перейти в профиль",
  },
];
