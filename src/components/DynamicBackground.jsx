import { backgrounds } from '../utils/backgrounds';

const DynamicBackground = ({ condition }) => {
  const backgroundUrl = backgrounds[condition] || backgrounds['default'];

  return (
    <img
      src={backgroundUrl}
      alt="weather background"
      className="fixed top-0 left-0 w-full h-full object-cover -z-10"
    />
  );
};

export default DynamicBackground;
