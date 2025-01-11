import PropTypes from "prop-types";

import Logo from "./Logo";

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

// PropTypes validation
NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavBar;
