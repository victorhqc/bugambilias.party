import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';
import { visibleImagesReducer, getDefaultState, nextImage } from './reducer';
import styles from './styles.module.css';

const ImageFader = ({ images, isMobileDevice }) => {
  const [state, dispatch] = useReducer(visibleImagesReducer, getDefaultState(images));
  const { visibleImages } = state;

  const transitions = useTransition(visibleImages[0], {
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
      {transitions(({ opacity }, item) => (
        <animated.img
          className={styles.img}
          data-is-mobile={isMobileDevice}
          src={item.src}
          alt={item.alt}
          style={{
            opacity: opacity.to({
              range: [0.0, 1.0],
              output: [0, 1],
            }),
          }}
        />
      ))}
      <animated.img
        className={`${styles.img} ${styles['img--invisible']}`}
        data-is-mobile={isMobileDevice}
        data-testid="next-image"
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
