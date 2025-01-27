import { FC } from 'react';

import { selectModeState } from '@slices/mode-slice';
import { makeCollection } from '@slices/words-slice';
import { AppMode } from '@utils-types';
import { threeThousandWordBase } from '@word-bases/3k';
import { aWordBase } from '@word-bases/a';
import { bOneWordBase } from '@word-bases/b-one';
import { bTwoWordBase } from '@word-bases/b-two';
import { difWordBase } from '@word-bases/dif';
import { spanish400 } from '@word-bases/spanish400';
import { spanish500 } from '@word-bases/spanish500';
import { useNavigate } from 'react-router-dom';

import styles from './style.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const NotFound404: FC = () => {
  const dispatch = useAppDispatch();
  const currientMode = useAppSelector(selectModeState);

  const navigate = useNavigate();

  const goToBack = () => {
    if (currientMode === AppMode.Dif) {
      dispatch(makeCollection(difWordBase));
    }
    if (currientMode === AppMode.ThreeK) {
      dispatch(makeCollection(threeThousandWordBase));
    }
    if (currientMode === AppMode.A) {
      dispatch(makeCollection(aWordBase));
    }
    if (currientMode === AppMode.B1) {
      dispatch(makeCollection(bOneWordBase));
    }
    if (currientMode === AppMode.B2) {
      dispatch(makeCollection(bTwoWordBase));
    }
    if (currientMode === AppMode.Es400) {
      dispatch(makeCollection(spanish400));
    }
    if (currientMode === AppMode.Es500) {
      dispatch(makeCollection(spanish500));
    }
    navigate(-1);
  };

  return (
    <main className={styles.section}>
      <div className={styles.page_not_found}>
        <h1>smth went wrong 😒</h1>
        <p>page not found</p>
        <button className={styles.button} onClick={goToBack}>
          go to back
        </button>
      </div>
    </main>
  );
};
