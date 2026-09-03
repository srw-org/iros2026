import React from "react";
import * as style from "./page-header.module.scss";
import { Popover, Button } from "antd";
import { DownOutlined, HomeOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import {
  EVENT_ID,
  HUB_URL,
  navEditions,
  externalEditions,
} from "../data/event-routes";

// Workshop selector for the header. Every destination lives in another
// deployment, so these are plain anchors with absolute URLs rather than
// Gatsby <Link>s, which would pick up this site's path prefix.
export const OtherYears = (props: {
  onConference: string;
  align?: "left" | "right";
}) => {
  const align = props.align ?? "right";

  return (
    <div className={align === "left" ? style.left : style.right}>
      <Popover
        placement={align === "left" ? "bottomLeft" : "bottomRight"}
        content={
          <div className={style.editionsMenu}>
            <div className={style.editionsTitle}>Past/Future Events</div>
            {navEditions.map((edition) => (
              <div key={edition.id}>
                {edition.id === EVENT_ID ? (
                  edition.label
                ) : (
                  <a href={edition.href}>{edition.label}</a>
                )}
              </div>
            ))}
            {externalEditions.map((edition) => (
              <div key={edition.id}>
                <a href={edition.href} target="_blank" rel="noreferrer">
                  {edition.label}
                </a>
              </div>
            ))}
          </div>
        }
        trigger="click"
      >
        <Button
          aria-label="Past/Future Events"
          title="Past/Future Events"
          css={css`
            background: none !important;
            color: inherit;
            border: none;
            box-shadow: none;
            padding: 0px;
            font-size: 20px;
            line-height: 1;
            display: inline-flex;
            align-items: center;
            &:hover {
              color: #1d3d7e !important;
            }
          `}
        >
          <DownOutlined />
        </Button>
      </Popover>
    </div>
  );
};

// Logo / home button that returns to the hub landing page.
export const HomeLink = () => (
  <a
    href={HUB_URL}
    className={style.homeLink}
    aria-label="Space Robotics Workshop home"
    title="Space Robotics Workshop home"
  >
    <HomeOutlined />
  </a>
);

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
    css={css`
      background: ${props.headerGradient};
      ${props.headerStyle};
    `}
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
