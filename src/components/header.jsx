import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <header className="mb-10">
      <h1 className="text-center text-6xl font-semibold uppercase text-black">
        {title}
      </h1>
    </header>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
