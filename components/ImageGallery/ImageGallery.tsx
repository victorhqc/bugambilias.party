import React, {
  useReducer,
  useState,
  useEffect,
  useCallback,
  FC,
  HTMLAttributes, CSSProperties,
} from 'react';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';
import { withUserAgent } from '../UserAgent';
import isInScreen from '../isInScreen';
import { imageGalleryReducer, getDefaultState, nextImage, previousImage, VisualElement } from './reducer';
import { event } from '../../utils';
import styles from './styles.module.css';
import { easeCubicInOut } from 'd3-ease';
import { isAnimated } from '@react-spring/animated';

type Props = {
  height: number;
  elements: VisualElement[];
  isMobileDevice?: boolean;
  isInScreen?: boolean;
  nextDelay?: number;
};

const ImageGallery: FC<Props> = ({ elements, height, isMobileDevice, nextDelay, isInScreen }) => {
  const [state, dispatch] = useReducer(imageGalleryReducer, getDefaultState(elements));
  const [mouseStatus, setMouseStatus] = useState('none');
  const onForward = useCallback(() => {
    dispatch(nextImage());
    event({
      action: 'gallery_click',
      category: 'gallery',
      label: 'Next Image',
    });
  }, []);
  const onPrevious = useCallback(() => {
    dispatch(previousImage());
    event({
      action: 'gallery_click',
      category: 'gallery',
      label: 'Previous Image',
    });
  }, []);

  useEffect(() => {
    if (!process.browser || isMobileDevice) return;

    let automaticNextImage = setInterval(() => {
      setTimeout(() => dispatch(nextImage()), nextDelay || 0);
    }, 6000);

    // Disable automatic next image when mouse is over the gallery or is not in the screen.
    if (mouseStatus === 'entered' || !isInScreen) {
      clearInterval(automaticNextImage);
    }

    // Disable next image when out of blur of `window`. As it triggers a lot of animations at once.
    const onBlur = () => {
      clearInterval(automaticNextImage);
    };

    // Small hack just to re-enable the automatic next image.
    const onFocus = () => {
      setMouseStatus(`Focus-${Math.random()}`);
    };

    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);

      clearInterval(automaticNextImage);
    };
  }, [mouseStatus, isInScreen]);

  const nextImageTransitions = useTransition(state.elements[0], {
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
    config: {
      duration: 500,
      easing: easeCubicInOut,
    },
  });
  const previousImageTransitions = useTransition(state.elements[0], {
    from: { opacity: 0, transform: 'translate3d(-100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(50%, 0, 0)' },
    config: {
      duration: 500,
      easing: easeCubicInOut,
    },
  });

  return (
    <div
      className={styles.wrapper}
      data-testid="desktop-gallery-wrapper"
      onMouseEnter={() => setMouseStatus('entered')}
      onMouseLeave={() => setMouseStatus('left')}
    >
      <button
        className={`${styles.button} ${styles['button--back']}`}
        onClick={onPrevious}
        title="Imagen anterior"
      >
        <div className={`${styles.icon} ${styles['icon--back']}`} />
      </button>
      <button
        className={`${styles.button} ${styles['button--forward']}`}
        onClick={onForward}
        title="Siguiente imagen"
      >
        <div className={styles.icon} />
      </button>
      {state.direction === 'none' && <VisualElement className={styles.img} element={state.elements[0]} />}
      {state.direction === 'next' &&
        nextImageTransitions(({ opacity, transform }, item) => (
          <VisualElement
            element={item}
            isAnimated={true}
            className={styles.img}
            style={{
              opacity: opacity.to({
                range: [0.0, 1.0],
                output: [0, 1],
              }),
              transform,
            }}
          />
        ))}
      {state.direction === 'previous' &&
        previousImageTransitions(({ opacity, transform }, item) => (
          <VisualElement
            element={item}
            isAnimated={true}
            className={styles.img}
            style={{
              opacity: opacity.to({
                range: [0.0, 1.0],
                output: [0, 1],
              }),
              transform,
            }}
          />
        ))}
      {/* Prefetches the next image */}
      <VisualElement
        className={styles.img}
        element={state.elements[1]}
        style={{ visibility: 'hidden' }}
        data-testid="prefetched"
      />
    </div>
  );
};

const VisualElement: FC<{
  element: VisualElement;
  isAnimated?: boolean;
  style?: any;
} & Omit<HTMLAttributes<HTMLImageElement | HTMLVideoElement>, 'style'>>
  = ({
       element,
       isAnimated = false,
       ...props
  }) => {
  switch (element.type) {
    case 'image':
      return isAnimated ? <animated.img
        src={element.src}
        alt={element.alt}
        {...props} /> :
        <img
          src={element.src}
          alt={element.alt}
          {...props} />;
    case 'video':
      return isAnimated ? <animated.video controls {...props}><source src={element.src} type="video/mp4" /></animated.video> :
        <video controls {...props}><source src={element.src} type="video/mp4" /></video>
  }
}

export default withUserAgent(isInScreen(ImageGallery));
