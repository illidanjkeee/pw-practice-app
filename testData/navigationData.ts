import { env } from "../utils/environment";

export interface NavigationTestData {
  name: string;
  method: string;
  url: string;
}

export interface FormData {
  email: string;
  password: string;
  name?: string;
  option?: string;
  rememberMe?: boolean;
}

export const navigationPages: NavigationTestData[] = [
  {
    name: "Form Layouts",
    method: "formLayoutsPage",
    url: `${env.baseUrl}/pages/forms/layouts`,
  },
  {
    name: "Datepicker",
    method: "datePickerPage",
    url: `${env.baseUrl}/pages/forms/datepicker`,
  },
  {
    name: "Smart Table",
    method: "smartTablePage",
    url: `${env.baseUrl}/pages/tables/smart-table`,
  },
  {
    name: "Tooltip",
    method: "tooltipPage",
    url: `${env.baseUrl}/pages/modal-overlays/tooltip`,
  },
  {
    name: "Dialog",
    method: "dialogPage",
    url: `${env.baseUrl}/pages/modal-overlays/dialog`,
  },
];

export const testForms: FormData[] = [
  {
    email: env.testUser.email, // Using email from .env
    password: env.testUser.password, // Using password from .env
    option: "Option 2",
  },
  {
    email: "johnsmith@email.com",
    password: "",
    name: "John Smith",
    rememberMe: true,
  },
];
