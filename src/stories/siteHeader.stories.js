import React from "react";
import SiteHeader from "../components/siteHeader";
import { MemoryRouter } from "react-router";
import UserContextProvider from "../contexts/userContext";

export default {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <UserContextProvider>{Story()}</UserContextProvider>,
  ],
};

export const Basic = () => <SiteHeader />;

Basic.storyName = "Default";
