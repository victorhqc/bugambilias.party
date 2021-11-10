import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Octicon, { Grabber } from '@githubprimer/octicons-react';
import { PAGES } from './utils';
import styles from './styles.module.css';

const OPENED = 'OPENED';
const CLOSED = 'CLOSED';

const ToggleButton = ({ status, setStatus }) => (
  <button
    className={styles.button}
    role="navigation"
    onClick={toggleOpenMenu(setStatus)}
    title={status === OPENED ? 'Cierra el menú' : 'Abre el menú'}
  >
    <div className={styles.octicon}>
      <Octicon size="medium" icon={Grabber} />
    </div>
  </button>
);

ToggleButton.propTypes = {
  status: PropTypes.string,
  setStatus: PropTypes.func,
};

const MobileNavigationHeader = ({ router }) => {
  const [status, setStatus] = useState(CLOSED);

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <a href="/">
          <img alt="Salón bugambilias" src="logo.png" height="50" />
        </a>
        <ToggleButton setStatus={setStatus} />
      </div>
      {status === OPENED ? (
        <nav className={styles.nav}>
          {PAGES.map((page) => {
            const isActive = router.route === page.href;

            return (
              <Link href={page.href} passHref key={page.href}>
                <a
                  className={`${styles.nav__element} ${isActive && styles['nav__element--active']}`}
                >
                  {page.title}
                </a>
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
};

MobileNavigationHeader.propTypes = {
  router: PropTypes.shape({
    route: PropTypes.string,
  }),
};

function toggleOpenMenu(setStatus) {
  return () => {
    setStatus((state) => {
      if (state === CLOSED) {
        return OPENED;
      }

      return CLOSED;
    });
  };
}

export default withRouter(MobileNavigationHeader);
