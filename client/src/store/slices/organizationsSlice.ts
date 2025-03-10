import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import imageOrg01 from "@assets/images/organizations/imageOrg01.webp";
import imageOrg02 from "@assets/images/organizations/imageOrg02.webp";
import imageOrg03 from "@assets/images/organizations/imageOrg03.webp";
import imageOrg04 from "@assets/images/organizations/imageOrg04.webp";
import imageOrg05 from "@assets/images/organizations/imageOrg05.webp";
import imageOrg06 from "@assets/images/organizations/imageOrg06.webp";
import imageOrg07 from "@assets/images/organizations/imageOrg07.webp";
import imageOrg08 from "@assets/images/organizations/imageOrg08.webp";
import imageOrg09 from "@assets/images/organizations/imageOrg09.webp";
import imageOrg10 from "@assets/images/organizations/imageOrg10.webp";
import imageOrg11 from "@assets/images/organizations/imageOrg11.webp";

interface Organization {
  id: number;
  name: string;
  description: string;
  image?: string;
  link: string;
}

interface OrganizationsState {
  organizations: Organization[];
}

const initialState: OrganizationsState = {
  organizations: [
    {
      id: 0,
      name: "ООО «АРСО»",
      description:
        "Торговля оптовая лесоматериалами, строительными материалами и санитарно-техническим оборудованием",
      image: imageOrg01,
      link: "arso",
    },
    {
      id: 1,
      name: "НИИ «Восход»",
      description:
        "Деятельность, связанная с использованием вычислительной техники и информационных технологий, прочая",
      image: imageOrg02,
      link: "voshod",
    },
    {
      id: 2,
      name: "ООО «НОРНИКЕЛЬ СПУТНИК»",
      description: "Деятельность по сопровождению компьютерных систем",
      image: imageOrg03,
      link: "nornickel-sputnik",
    },
    {
      id: 3,
      name: "ООО «Заря»",
      description: "Торговля оптовая фруктами и овощами",
      image: imageOrg04,
      link: "zarya",
    },
    {
      id: 4,
      name: "ООО «БИАЙЭЙ-ТЕХНОЛОДЖИЗ»",
      description: "Разработка компьютерного программного обеспечения",
      image: imageOrg05,
      link: "bia-tech",
    },
    {
      id: 5,
      name: "ООО «ДОМКЛИК»",
      description: "Разработка компьютерного программного обеспечения",
      image: imageOrg06,
      link: "dom-click",
    },
    {
      id: 6,
      name: "ООО «РСХБ-Интех»",
      description: "Разработка компьютерного программного обеспечения",
      image: imageOrg07,
      link: "rshb-intech",
    },
    {
      id: 7,
      name: "ООО «ГК-ФОРЕСТ»",
      description: "Распиловка и строгание древесины",
      image: imageOrg08,
      link: "gk-forest",
    },
    {
      id: 8,
      name: "ПАО «Россети»",
      description:
        "Передача электроэнергии и технологическое присоединение к распределительным электросетям",
      image: imageOrg09,
      link: "rosnet",
    },
    {
      id: 9,
      name: "АО «Позитив Текнолоджиз»",
      description:
        "Разработка компьютерного программного обеспечения, консультационные услуги в данной области и другие сопутствующие услуги",
      image: imageOrg10,
      link: "pozitive-tech",
    },
    {
      id: 10,
      name: "ООО «Техцентр Дойче Банка»",
      description: "Разработка компьютерного программного обеспечения",
      image: imageOrg11,
      link: "techcenter-doiche-bank",
    },
  ],
};

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    addOrganization: (state, action: PayloadAction<Organization>) => {
      state.organizations.push(action.payload);
    },
  },
});

export const { addOrganization } = organizationsSlice.actions;
export default organizationsSlice.reducer;
