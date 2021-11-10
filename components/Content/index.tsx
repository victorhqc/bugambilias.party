import React, { FC } from 'react';
import styles from './styles.module.css';

const Content: FC = ({ children }) => <div className={styles.content}>{children}</div>;

export default Content;
