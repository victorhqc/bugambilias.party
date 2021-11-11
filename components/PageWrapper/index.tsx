import React, { FC } from 'react';
import styles from './styles.module.css';

const PageWrapper: FC = ({ children, ...props }) => (
  <div className={styles.wrapper} {...props}>
    {children}
  </div>
);

export default PageWrapper;
