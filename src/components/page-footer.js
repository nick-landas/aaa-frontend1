import React from "react";
import { PageFooterHyperlink } from "./page-footer-hyperlink";

export const PageFooter = () => {
  const resourceList = [
    {
      path: "https://www.linkedin.com/in/nick-landas-gulf-shores/",
      label: "Linkedin",
    },
    {
      path: "https://dev.to/nick_nick",
      label: "DEV Blog",
    },
  ];

  return (
    <footer className="page-footer">
      <div className="page-footer-grid">
        <div className="page-footer-grid__info">
          <div className="page-footer-info__message">
            <p className="page-footer-message__headline">
              <span>&copy;N Landas</span>
 
            </p>
            <p className="page-footer-message__description">
                <span>
                  React/Rails project 2023&nbsp;
                </span>
                <u>w/Redux</u>
            </p>
          </div>
          <div className="page-footer-info__button">
            <a
              id="create-account-button"
              className="button button--primary"
              href="https://www.ucla.edu/"
              target="_blank"
              rel="noreferrer noopener"
            >
              Go Bruins!
            </a>
          </div>
          <div className="page-footer-info__resource-list">
            {resourceList.map((resource) => (
              <div
                key={resource.path}
                className="page-footer-info__resource-list-item"
              >
                <PageFooterHyperlink path={resource.path}>
                  {resource.label}
                </PageFooterHyperlink>
              </div>
            ))}
          </div>
        </div>
        <div className="page-footer-grid__brand">
          <div className="page-footer-brand">
            <img
              className="page-footer-brand__logo"
              src="https://gistcdn.githack.com/nick-landas/2f536bd3ca55921598c015c1d51aa421/raw/95869e09e7cc04bab530fe125b38f1d4a9316f4d/sun2.svg"
              alt="Beach"
              width="20"
              height="22.22"
            />
            <PageFooterHyperlink path="https://flatironschool.com/">
              Flatrion School
            </PageFooterHyperlink>
          </div>
        </div>
      </div>
    </footer>
  );
};
