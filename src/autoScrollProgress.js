"use strict";

import React, { Component, PropTypes } from 'react';
import * as styles from './autoScroll.scss';

export default function(props){
    const { progress, tickProgress } = props;
    const className = `progress-${progress}`;
    const progressClass = styles[className];
    return (
        <div className={`${styles.progress} ${progressClass} ${className}`}>
            <div className={styles.circle}>
                <div className={`${styles.mask} ${styles.full}`}>
                    <div className={styles.fill}></div>
                </div>
                <div className={styles.mask}>
                    <div className={styles.fill}></div>
                    <div className={`${styles.fill} ${styles.fix}`}></div>
                </div>
                <div className={styles.shadow}></div>
            </div>
            <div className={styles.inset}>
                <div className={styles.percentage}></div>
            </div>
        </div>
    );
}
