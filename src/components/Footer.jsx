import React from "react";

const footerStyles =  {
  width: "100%",
  height: "60px",
}

const Footer = () => {
 
  return (
    <footer className="bg-info text-center text-lg-start" style={footerStyles}>
      <div
        className="text-center p-3"
      >
        © {new Date().getFullYear()} Copyright:
        <a className="text-dark px-2" href="https://github.com/CiroJSCH" target={"_blank"} rel="noreferrer">
          Ciro Schapert
        </a>
      </div>
    </footer>
  );
};

export default Footer;
