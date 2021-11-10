import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { animated, useSpring, config } from 'react-spring';
import { theme } from '../../utils';
import { PAGES } from './utils';
import styles from './styles.module.css';

const getInitialScrollPosition = () => {
  if (process.browser) {
    return window.scrollY;
  }

  return 0;
};

const DesktopNavigationHeader = ({ color, router, ...props }) => {
  const [springProps, setSpring] = useSpring(() => ({
    scrollPosition: getInitialScrollPosition(),
    config: config.stiff,
  }));
  const menuColor = color;

  // Equivalent to componentDidMount
  useEffect(() => {
    const eventListener = scrollEventListener({ setSpring });

    window.addEventListener('scroll', eventListener);
    // Return a function equals componentWillUnmount
    return () => window.removeEventListener('scroll', eventListener);
  }, []); // [] means we don't want it to get called in every re-render.

  return (
    <header>
      <animated.nav className={styles.nav} style={calculateNavStyle(springProps, menuColor)}>
        <Link href="/" passHref>
          <a>
            <animated.img
              className={styles.img}
              alt="Salón bugambilias"
              src="/logo.png"
              style={calculateImgStyle(springProps)}
            />
          </a>
        </Link>
        {PAGES.map((page, index) => {
          const isActive = page.href === router.route;
          return (
            <Fragment key={page.href}>
              <Link href={page.href} passHref>
                <a
                  className={`${styles.nav__element} ${
                    isActive ? styles['nav__element--active'] : ''
                  }`}
                >
                  {page.title}
                </a>
              </Link>
              {index < PAGES.length - 1 ? <span className={styles.separator} /> : null}
            </Fragment>
          );
        })}
      </animated.nav>
    </header>
  );
};

DesktopNavigationHeader.propTypes = {
  color: PropTypes.string,
  router: PropTypes.shape({
    route: PropTypes.string,
  }),
};

function scrollEventListener({ setSpring }) {
  let isTicking = false;
  let scrollPosition = 0;

  return () => {
    scrollPosition = window.scrollY;

    if (!isTicking) {
      window.requestAnimationFrame(() => {
        setSpring({ scrollPosition });
        isTicking = false;
      });

      isTicking = true;
    }
  };
}

const TOP_OFFSET = 60;

function calculateNavStyle({ scrollPosition }, defaultColor) {
  const dynamicBackground = scrollPosition.interpolate((val) => {
    if (val < TOP_OFFSET) {
      return 'transparent';
    }

    return theme.primary;
  });

  const dynamicColor = scrollPosition.interpolate((val) => {
    if (val < TOP_OFFSET) {
      return defaultColor;
    }

    return '#fff';
  });

  const dynamicBoxShadow = scrollPosition.interpolate((val) => {
    if (val < TOP_OFFSET) {
      return 'none';
    }

    return '0 1px 3px rgba(0, 0, 0, 0.1)';
  });

  return {
    backgroundColor: dynamicBackground,
    color: dynamicColor,
    boxShadow: dynamicBoxShadow,
  };
}

function calculateImgStyle({ scrollPosition }) {
  const imgOffset = 0;
  const dynamicTransform = scrollPosition.interpolate((val) => {
    if (val < TOP_OFFSET) {
      return `translate3d(0px, ${imgOffset}px, 0px) scale(1)`;
    }

    const scale = (TOP_OFFSET - val) / 100 + 1;

    if (scale <= 0.35) {
      // -92 * (1 - 0.35) = 59.8
      // -110 * (1 - 0.35) = 71.5
      return 'translate3d(-59.8px, -71.5px, 0px) scale(0.35)';
    }

    const counterScale = 1 - scale;

    const x = -92 * counterScale;
    const y = -110 * counterScale + imgOffset;

    return `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  });

  return {
    transform: dynamicTransform,
  };
}

export default withRouter(DesktopNavigationHeader);
