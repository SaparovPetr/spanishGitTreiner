# ПРОЕКТ gitTreiner (PWA)

## ПРЕДНАЗНАЧЕНИЕ:

Поддержание словарного запаса.
Реализовано в виде теста.

Главной ценностью приложения являяется возможность редактирования пользователем заметки к каждому слову.

Сама заметка представлена в виде маркдаун файла, хранящегося в репозитории пользователя на Гитхабе. Если пользователь забыл значение слова, то по клику на него открывается модальное окно с заметкой, где:

- либо представлены распростаненные словосочетания и примеры испльзования слова и предложения с ним (если пользователь их ранее заполнил),
- либо возможен переход в интерфес Гитхаба для дополнения маркдаун-файла.

Для быстрого создания заметки добавлена функциональность ее генерации нейросетью.

Нахожу этот метод самым эфективным. По большому счету для этой нужды и сделано приложение. Испльзую ежедневно и на данный момент мной создано около трех тысяч собственных заметок.

Дополнительным преимуществом полагаю "отказоустойчивость", т.е. независимость от использования сторонних интернет-сервисов для изучения слов. Пользователь имеет полный контроль над файлами заметок к изучаемым словам - все они хранятся в его личном репозитории и их всегда можно спулить с Гитхаба и хранить/редактировать локально.

По сути, приложение - это просто интерфейс для работы с собственной базой слов.

Возможно использование без интернета (в режиме теста).

## ДЕПЛОЙ по ссылке:

[gitTreiner](https://saparovpetr.github.io/gitTreiner/)

## КАК РАБОТАЕТ ПРИЛОЖЕНИЕ:

- Пользователь может форкнуть в свой профиль мой публичный [репозиторий](https://github.com/SaparovPetr/emptyMdFilesForFork/) с незаполненными маркдаун-файлами и (по желанию) переименовать его.

- На странице настроек указать имя своего профиля и название ранее форкнутого репозитория.

- По нажатию на логотип выбрать уровень сложности повторяемых слов.

- Проходя тест, по нажатию на слово открывать карточку к нему и редактировать соответствующий файл в репозитории Гитхаба.

- Находясь в карточке, пользователь может сгенерировать будущую заметку с помощью нейросети (если она онлайн).

## КАК УСТРОЕНО ПРИЛОЖЕНИЕ:

### Понятия:

> **База** (тип TOneWord[]) - массив объектов типа TOneWord. Каждый уровень изучаемых слов - отдельная база.

> **Колллекция**- короткий массив, полученный из Базы (сформирован из рандомно отобранных элементов Базы),

> **Рабочий элемент** - первый элемент Коллекции.

### Логика:

- При инициализации приложения, устанавливается режим по-умолчанию `AppMode.Dif` `(заметка в коде № 1)`,
- Следом автоматически выбирается База (режиму `AppMode.Dif` соответствует База `difWordBase`) `(заметка в коде № 2)`,
- далее функцией `fetchCollection` из выбранной Базы формируется Коллекция `(заметка в коде № 3)`,
- Коллекция записывается в стор `(заметка в коде № 4)`, а каждый ее объект дополняется ключом ID с уникальной значением `(заметка в коде № 5)`,
- Компонент `WordItem` рендерит даннные Рабочего элемента Коллекции `(заметка в коде № 6)`, а также прокидывает их в компонент `OptionList` `(заметка в коде № 7)`,
- компонент `OptionList` получает данные из Рабочего элемента Коллекции (т.е. верный вариант перевода `(заметка в коде № 8)`), а также из текущей Базы (три рандомных неверных варианта перевода `(заметка в коде № 9)`),
- следом компонент `OptionList` создает из полученных данных (четырех вариантов перевода) новый массив `shuffledArrey` и перемешивает их индексы в массиве утилитой `shuffle` `(заметка в коде № 10)`,
- далее `(заметка в коде № 11)` `shuffledArrey` записывается в стейт компонента (в массив `preparedArrey`), чтобы данные не обновлялись при ререндериге `OptionList` (например, при открытии-закрытии мадального окна),
- пользователь выбирает ответ, если он неверный, компонет ответа меняет цвет, а если верный, то первый элемент Колекции удаляется из нее. В результате компонент `WordItem` ререндерится `(заметка в коде № 12)`,
- так происходит пока не опустеет Коллекция,
- если Коллекция пустеет `(заметка в коде № 13)`, `MainPage` отрисовывает "поздравление" и кнопку с колбеком для перезапуска приложения.

### Паралельная логика:

- рендеринг компонентов `WordItem` и `Modal` сопровождается выполнением хука `useEffect`, воспроизводящего аудио по ссылке публичного api онлайн-школы SkyEng `(заметка в коде № 14)`,
- Открытие карточки слова сопровождается копированием `(заметка в коде № 15)` словосочетания в буфер обмена операционки утилитой `copyTextToClipboard`,
- Открытие карточки слова также сопровождается проверкой на статус нейросети. Если нейросеть онлайн, кнопка "сгенерировать" становится доступной.
- Если нейросеть онлайн и пользователь к ней обратился, то сгенерированный ответ помещается в буфер обмена операционки и доступен для вставки в маркдаун-файл.
- Некоторые записи данных в стор (данные о выбранном режиме, данные о прогрессе) сопровождаются записью в `LocalStorage` браузера, чтобы эти данные не проподали при перезапусках приложения `(заметка в коде № 16)`.

## ПРОБЛЕМЫ С КОТОРЫМИ МОЖНО ЖИТЬ:

- Консоль выдает ошибку NotAllowedError: `play() failed because the user didn't interact with the document first`, поскольку код содержит автовоспроизведение аудио-файла без спроса пользователя.

- Если модель оффлайн, консоль выдает ошибку запроса к ней.

- Чтобы никому не платить за API, модель Лама развернута локально в Гугл Коллабе, что имеет издержки ее производительности. Среднее времи генерации - 12 секунд.

- Испльзование Гугл Коллаба обусловлено отстуствием бюджета на аренду сервера, который работал бы круглосуточно. Модель мне приходится каждый раз запускать вручную (примерно 10 минут на развертывание). Эндпоинт в сервисе Ngrok меняется при каждом запуске модели, поэтому в окне настроек сделан инпут для указания актуального эндпоинта. Да, все это ухудшает опыт, зато бесплатно.

Также, разумеется:

- В режиме разработки аудио воспроизводится дважды из-за строго режима,
- В режиме разработки из-за строго режима также дважды увеличивается счетчик.

## БАГИ К УСТРАНЕНИЮ:

- Крах при обновлении страницы в случае, если открыта модалка.

## ПЛАНЫ (но это не точно):

- найти дизайнера и переверстать/переанимировать - чтобы было с домино и медведями;
- сделать поиск по словам;
- возможно, интегрировать в карточки слов api школы SkyEng.
