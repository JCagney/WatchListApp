import React from "react";
import WatchProviders from "../components/watchProviders";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";

export default {
  title: "Playlist Page/Watch Providers",
  component: WatchProviders,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
  ],
};

export const Basic = () => <WatchProviders movie={SampleMovie} />;

Basic.storyName = "Default";
