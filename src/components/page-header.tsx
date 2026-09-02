import React from "react";
import * as style from "./page-header.module.scss";
import { HomeOutlined } from "@ant-design/icons";

export const HomeLink = () => (
  <a
    href="https://space-robots.org"
    className={style.homeLink}
    aria-label="Space Robotics Workshop home"
    title="Space Robotics Workshop home"
  >
    <HomeOutlined />
  </a>
);

export const OtherYears = () => null;

export const Header = (props: {
  conference: string;
  title?: string;
  rightSide: React.ReactNode;
  leftSide: React.ReactNode;
  imageContent: any;
  headerGradient: string;
  headerStyle: any;
  headerContainer: any;
  compact?: boolean;
}) => (
  <div
    style={{ background: props.headerGradient, ...props.headerStyle }}
    className={`${style.header} ${props.compact ? style.headerCompact : ""}`}
  >
    <div className={style.headerContent}>
      {props.leftSide ?? (
        <div className={style.left}>
          <HomeLink />
        </div>
      )}
      {!props.compact && (
        <div className={style.middle}>
          {props.conference ? (
            <>
              <div className={style.workshopTitle}>
                {props.title ?? "space robotics"}
              </div>
              <div className={style.conference}>{props.conference}</div>
            </>
          ) : null}
        </div>
      )}
      {props.rightSide}
      <div id="headerContainer" {...props.headerContainer}>
        <div {...props.imageContent} />
      </div>
    </div>
  </div>
);

export default Header;
