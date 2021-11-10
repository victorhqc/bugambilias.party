import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';
import { visibleImagesReducer, getDefaultState, nextImage } from './reducer';
import styles from './styles.module.css';

const ImageFader = ({ images, isMobileDevice }) => {
  const [state, dispatch] = useReducer(visibleImagesReducer, getDefaultState(images));
  const transitions = useTransition(state.visibleImages[0], (item) => (item || { src: '' }).src, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 2000,
    },
  });

  useEffect(() => {
    const interval = () => {
      dispatch(nextImage());
    };

    setInterval(interval, 6000);

    return () => {
      return clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.wrapper} data-testid="image-fader">
      <animated.img
        className={styles.img}
        data-is-mobile={isMobileDevice}
        data-testid="ssr-placeholder"
        {...state.visibleImages[0]}
      />
      {transitions.map(({ item, props, key }) => {
        if (!item) {
          return null;
        }

        return (
          <animated.img
            className={styles.img}
            data-is-mobile={isMobileDevice}
            src={item.src}
            alt={item.alt}
            key={key}
            style={{ ...props }}
          />
        );
      })}
      <animated.img
        className={styles.img}
        data-is-mobile={isMobileDevice}
        data-testid="next-image"
        invisible="true"
        {...state.visibleImages[1]}
      />
    </div>
  );
};

ImageFader.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  ),
  isMobileDevice: PropTypes.bool,
};

export default ImageFader;
