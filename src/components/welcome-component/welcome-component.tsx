import { FC } from 'react';

import { RoundButton } from '@components/round-button/round-button';
import { markTheFirstStart } from '@utils/localstorage-functionality';
import { Link } from 'react-router-dom';

import styles from './welcome-component.module.css';

const WelcomeComponent: FC = () => (
  <div className={styles.welcomeContainer}>
    <h2>👋 Салют!</h2>
    <div>
      Это приложение для закрепления словарного запаса. Основано на идее
      повторения слов по заметкам (markdown-файлам) из твоего личного
      репозитория на GitHub.
    </div>
    <h2>Как это работает:</h2>
    <div>1. Зарегистрируйся и войди на GitHub;</div>
    <div>
      2. Форкни себе этот{' '}
      <Link to={'https://github.com/spanishGitTreiner/mdSpanishWords'}>
        <span className={styles.linkword}>репозиторий</span>
      </Link>{' '}
      и укажи данные о нем в настройках приложения;
    </div>

    <RoundButton onClickFunc={markTheFirstStart} disabled={false}>
      →
    </RoundButton>
  </div>
);
export default WelcomeComponent;
