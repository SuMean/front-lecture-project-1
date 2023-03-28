import React from 'react';
import css from './Notfound.module.scss';
const Notfound = () => {
  return (
    <>
      <div className={css.imgDiv}>
        <div className={css.imgWrapper}>
          <img
            className={css.img}
            src="/images/logo.png"
            alt="logo"
            width="400"
          />
          <p className={css.p}>읍는 페이지입니다</p>
        </div>
      </div>
    </>
  );
};

export default Notfound;
