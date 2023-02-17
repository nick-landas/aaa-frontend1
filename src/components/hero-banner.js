import React from "react";

export const HeroBanner = () => {
  const logo = "https://gistcdn.githack.com/nick-landas/b621710e149e6cf2f68bb21755d6e470/raw/10abe37899c9b2633923c1a94550aca5d98c0d7f/la.svg";

  return (
    <div className="hero-banner hero-banner--mandarine-orange">
      <div className="hero-banner__logo">
        <img className="hero-banner__image" src={logo} alt="LA logo" />
      </div>
      <h1 className="hero-banner__headline">Hey, Y'all!</h1>
      <p className="hero-banner__description">
        This is I Luv LA (Lower Alabama) Chat.
      </p>
      <a
        id="code-sample-link"
        target="_blank"
        rel="noopener noreferrer"
        href="/"
        className="button button--secondary"
      >
        Sign yourself up →
      </a>
    </div>
  );
};
