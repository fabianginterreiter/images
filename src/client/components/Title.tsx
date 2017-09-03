import * as React from "react";
import {t} from "../libs/Translation"

export default class Title extends React.Component<{}, {}> {
  public render() {
    return (
      <span><i className="fa fa-camera-retro" aria-hidden="true" /> {t("name")}</span>
    );
  }
}
