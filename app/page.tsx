import Image from "next/image";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenTextIcon,
  CalendarBlankIcon,
  CheckIcon,
  CompassIcon,
  FlagIcon,
  FolderOpenIcon,
  LightbulbIcon,
  MapTrifoldIcon,
  PathIcon,
  PlusIcon,
  QuotesIcon,
  TargetIcon,
  UsersThreeIcon,
  VideoCameraIcon,
} from "@phosphor-icons/react/dist/ssr";
import { ActionLink } from "@/components/action-link";
import { ContactForm } from "@/components/contact-form";
import { Header } from "@/components/header";
import { questions, site } from "@/lib/site";
import { LegalLinks } from "@/components/legal-links";

const situations = [
  {
    icon: CompassIcon,
    title: "Пока выбираю направление",
    text: "Исследуем интересы, рассмотрим несколько сценариев будущего и проверим идеи на практике.",
    href: "#direction",
    link: "Программа профориентации",
    className: "situation-first",
  },
  {
    icon: MapTrifoldIcon,
    title: "Хочу сравнить варианты",
    text: "Сравним образовательные программы и составим план с учётом целей, времени и условий семьи.",
    href: "#route",
    link: "Выбор маршрута",
    className: "",
  },
  {
    icon: TargetIcon,
    title: "Нужна подготовка к экзаменам",
    text: "Разберём текущий уровень, определим приоритеты и организуем подготовку к выбранным экзаменам.",
    href: "#exams",
    link: "Форматы подготовки",
    className: "",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main-content">
        <section
          className="hero container"
          id="top"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">Для старшеклассников и их родителей</p>
            <h1 id="hero-title">
              Понять, куда двигаться <span>после школы</span>
            </h1>
            <p className="hero-description">
              Помогаем разобраться в интересах, выбрать образовательный маршрут
              и подготовиться к нужным экзаменам.
            </p>
            <div className="hero-actions">
              <ActionLink />
              <a className="text-link" href="#approach">
                Как работает МЕТА
                <ArrowDownIcon size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-note">
              Онлайн, с практическими заданиями и обратной связью.
            </p>
          </div>
          <figure className="hero-figure">
            <div className="hero-image">
              <Image
                src="/images/education-route.webp"
                alt="Учебная иллюстрация: бумажная дорожная карта от интересов к вариантам и следующему шагу"
                width={1120}
                height={1400}
                sizes="(max-width: 767px) 100vw, 46vw"
                preload
              />
            </div>
            <figcaption>
              <span>Большой путь начинается с понятного шага.</span>
              <span>Учебная иллюстрация</span>
            </figcaption>
          </figure>
        </section>
        <section
          className="situations container section"
          aria-labelledby="situations-title"
        >
          <div className="section-heading">
            <h2 id="situations-title">Начните со своей ситуации</h2>
            <p>Можно начать с того этапа, который нужен сейчас.</p>
          </div>
          <div className="situation-grid">
            {situations.map(({ icon: Icon, ...item }) => (
              <a
                className={`situation ${item.className}`}
                href={item.href}
                key={item.href}
              >
                <Icon
                  className="situation-icon"
                  size={35}
                  weight="light"
                  aria-hidden="true"
                />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="card-link">
                  {item.link}
                  <ArrowUpRightIcon size={21} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </section>
        <section
          className="approach section"
          id="approach"
          aria-labelledby="approach-title"
        >
          <div className="container">
            <div className="section-heading approach-heading">
              <p className="eyebrow">От интереса к действию</p>
              <h2 id="approach-title">
                Будущее становится понятнее,
                <br className="desktop-break" /> когда есть следующий шаг
              </h2>
              <p>
                Выбор направления, поступление и подготовка связаны между собой.
                На каждом этапе мы уточняем цель и определяем следующий
                выполнимый шаг.
              </p>
            </div>
            <article className="stage" id="direction">
              <div className="stage-copy">
                <div className="stage-title">
                  <span className="step-number">01</span>
                  <h3>Профориентация</h3>
                </div>
                <p>
                  Начинаем с интересов, опыта и представлений о будущем.
                  Составляем несколько сценариев жизни после школы и выбираем,
                  какие идеи стоит проверить.
                </p>
                <p>
                  Познакомиться с учебной программой, поговорить со специалистом
                  или выполнить небольшую практическую задачу.
                </p>
                <div className="stage-method">
                  <span>Как работаем</span>
                  <p>
                    Короткие инструкции, самостоятельные задания и
                    индивидуальные или групповые встречи.
                  </p>
                </div>
                <div className="stage-outcome">
                  <CheckIcon size={19} aria-hidden="true" />
                  <p>
                    <strong>Результат:</strong> планы Одиссеи, выбранный
                    сценарий и план ближайших проб.
                  </p>
                </div>
                <ActionLink task="direction" className="text-link">
                  Обсудить профориентацию
                </ActionLink>
              </div>
              <div className="sample sample-scenarios">
                <div className="sample-heading">
                  <span>Мои возможные сценарии</span>
                  <CompassIcon size={22} weight="light" aria-hidden="true" />
                </div>
                <p className="sample-subtitle">
                  Не один правильный ответ. Несколько идей для проверки.
                </p>
                <div className="scenario-option">
                  <span>А</span>
                  <div>
                    <strong>Создавать визуальные истории</strong>
                    <p>Попробовать себя в дизайне</p>
                  </div>
                  <ArrowUpRightIcon size={18} aria-hidden="true" />
                </div>
                <div className="scenario-option">
                  <span>Б</span>
                  <div>
                    <strong>Разбираться, как всё устроено</strong>
                    <p>Исследовать технологии</p>
                  </div>
                </div>
                <div className="scenario-option">
                  <span>В</span>
                  <div>
                    <strong>Помогать людям учиться</strong>
                    <p>Узнать больше о преподавании</p>
                  </div>
                </div>
                <div className="sample-next">
                  <span>Ближайшая проба</span>
                  <p>
                    Сделать афишу школьного события и собрать обратную связь.
                  </p>
                </div>
                <p className="sample-caption">Учебный пример плана Одиссеи</p>
              </div>
            </article>
            <article className="stage" id="route">
              <div className="stage-copy">
                <div className="stage-title">
                  <span className="step-number">02</span>
                  <h3>Выбор образовательного маршрута</h3>
                </div>
                <p>
                  Разбираемся, какое образование требуется для выбранной цели и
                  какую роль в этом маршруте играет вуз.
                </p>
                <p>
                  Сравниваем варианты, уточняем требования к поступлению и
                  учитываем время, бюджет и место учёбы.
                </p>
                <div className="stage-method">
                  <span>Как работаем</span>
                  <p>
                    Исследование официальных источников, консультации и
                    составление дорожной карты.
                  </p>
                </div>
                <div className="stage-outcome">
                  <CheckIcon size={19} aria-hidden="true" />
                  <p>
                    <strong>Результат:</strong> список вариантов, проверенные
                    требования, необходимые экзамены и план со сроками.
                  </p>
                </div>
                <ActionLink task="route" className="text-link">
                  Обсудить маршрут
                </ActionLink>
              </div>
              <div className="sample sample-route">
                <div className="sample-heading">
                  <span>Сравниваем, чтобы выбрать</span>
                  <MapTrifoldIcon size={22} weight="light" aria-hidden="true" />
                </div>
                <div className="comparison-table">
                  <table>
                    <caption className="sr-only">
                      Учебное сравнение двух вымышленных программ
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Что важно</th>
                        <th scope="col">Программа А</th>
                        <th scope="col">Программа Б</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Фокус</th>
                        <td>Визуальный дизайн</td>
                        <td>Цифровые продукты</td>
                      </tr>
                      <tr>
                        <th scope="row">Формат</th>
                        <td>Очно</td>
                        <td>Смешанный</td>
                      </tr>
                      <tr>
                        <th scope="row">Что уточнить</th>
                        <td>Творческий конкурс</td>
                        <td>Состав экзаменов</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="route-next">
                  <CalendarBlankIcon size={25} aria-hidden="true" />
                  <div>
                    <strong>Следующий шаг</strong>
                    <p>
                      Проверить требования на сайте программы и записаться на
                      день открытых дверей.
                    </p>
                  </div>
                </div>
                <p className="sample-caption">
                  Учебный пример. Программы вымышлены.
                </p>
              </div>
            </article>
            <article className="stage" id="exams">
              <div className="stage-copy">
                <div className="stage-title">
                  <span className="step-number">03</span>
                  <h3>Подготовка к экзаменам</h3>
                </div>
                <p>
                  Определяем, что уже получается самостоятельно и что нужно
                  отработать. На занятиях разбираем материал и задания, между
                  встречами выполняем домашнюю работу.
                </p>
                <p>По результатам проверок корректируем подготовку.</p>
                <div className="stage-method">
                  <span>Как работаем</span>
                  <p>
                    Онлайн-занятия индивидуально или в мини-группе, домашние
                    задания и регулярная обратная связь.
                  </p>
                </div>
                <div className="stage-outcome">
                  <CheckIcon size={19} aria-hidden="true" />
                  <p>
                    <strong>Результат:</strong> план подготовки, материалы,
                    результаты проверок и понятные учебные задачи.
                  </p>
                </div>
                <ActionLink task="exams" className="text-link">
                  Обсудить подготовку
                </ActionLink>
              </div>
              <div className="sample sample-plan">
                <div className="sample-heading">
                  <span>План, с которым можно работать</span>
                  <BookOpenTextIcon
                    size={22}
                    weight="light"
                    aria-hidden="true"
                  />
                </div>
                <p className="sample-subtitle">
                  От текущего уровня к следующей учебной задаче.
                </p>
                <ol className="study-plan">
                  <li>
                    <span className="plan-check">
                      <CheckIcon size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Разобрать стартовую работу</strong>
                      <p>Что получается и где нужна помощь</p>
                    </div>
                  </li>
                  <li>
                    <span className="plan-check">
                      <CheckIcon size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Выбрать приоритетные темы</strong>
                      <p>Составить последовательность занятий</p>
                    </div>
                  </li>
                  <li className="plan-current">
                    <span className="plan-check">
                      <ArrowRightIcon size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Отработать задания</strong>
                      <p>Практика с обратной связью</p>
                    </div>
                  </li>
                  <li>
                    <span className="plan-empty" />
                    <div>
                      <strong>Проверить и уточнить план</strong>
                      <p>Сравнить результаты, определить следующий шаг</p>
                    </div>
                  </li>
                </ol>
                <p className="sample-caption">
                  Учебный пример плана подготовки
                </p>
              </div>
            </article>
          </div>
        </section>
        <section
          className="example container section"
          aria-labelledby="example-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Учебный пример</p>
            <h2 id="example-title">
              «Мне нравится дизайн.
              <br className="desktop-break" /> А что делать дальше?»
            </h2>
            <p>
              Необязательно сразу выбирать профессию. Сначала можно попробовать
              небольшую реальную задачу.
            </p>
          </div>
          <div className="example-layout">
            <figure className="example-figure">
              <Image
                src="/images/design-exercise.webp"
                alt="Иллюстрация учебной пробы: создание синей афиши вымышленного школьного вечера идей"
                width={1400}
                height={1050}
                sizes="(max-width: 767px) 100vw, 46vw"
              />
              <figcaption>
                Создать афишу, получить обратную связь, доработать идею.
              </figcaption>
            </figure>
            <ol className="example-steps">
              <li>
                <span>1</span>
                <div>
                  <h3>Уточняем вопрос</h3>
                  <p>
                    Интересно создавать изображения, придумывать идеи или решать
                    задачу по чужому заданию?
                  </p>
                </div>
              </li>
              <li>
                <span>2</span>
                <div>
                  <h3>Выбираем пробу</h3>
                  <p>
                    Сделать афишу вымышленного школьного события для конкретной
                    аудитории и доработать её после обратной связи.
                  </p>
                </div>
              </li>
              <li>
                <span>3</span>
                <div>
                  <h3>Обсуждаем опыт</h3>
                  <p>
                    Что хотелось продолжать? Где возникли трудности? Что
                    оказалось неожиданным?
                  </p>
                </div>
              </li>
              <li>
                <span>4</span>
                <div>
                  <h3>Определяем продолжение</h3>
                  <p>
                    Другая задача, разговор со студентом или знакомство с
                    программой обучения.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div className="method-note">
            <LightbulbIcon size={27} weight="light" aria-hidden="true" />
            <p>
              В основе профориентационной части МЕТА лежит{" "}
              <strong>Life Design</strong>, подход к проектированию жизни Билла
              Бернетта и Дэйва Эванса. Несколько сценариев и небольшие
              практические пробы помогают уточнить, что исследовать дальше.
            </p>
          </div>
        </section>
        <section
          className="process section"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="container">
            <div className="section-heading">
              <h2 id="process-title">
                Онлайн. С понятным планом.
                <br className="desktop-break" /> И с человеком на связи.
              </h2>
              <p>
                Работа продолжается между встречами, а материалы и результаты
                остаются под рукой.
              </p>
            </div>
            <div className="process-grid">
              {[
                {
                  icon: VideoCameraIcon,
                  title: "Встречаемся онлайн",
                  text: "На консультациях обсуждаем результаты упражнений, на занятиях работаем с материалом и заданиями.",
                },
                {
                  icon: FlagIcon,
                  title: "Двигаемся между встречами",
                  text: "Ученик выполняет согласованные задания. Следующий шаг и срок понятны заранее.",
                },
                {
                  icon: FolderOpenIcon,
                  title: "Собираем всё в одном месте",
                  text: "Сохраняем материалы и результаты в одном рабочем пространстве, чтобы возвращаться к ним по мере продвижения.",
                },
                {
                  icon: PathIcon,
                  title: "Корректируем план",
                  text: "Обсуждаем прогресс, учитываем новые сведения и меняющиеся обстоятельства.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div className="process-item" key={title}>
                  <Icon size={31} weight="light" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <p className="process-note">
              Объём обратной связи и порядок общения между встречами согласуем
              до начала работы.
            </p>
          </div>
        </section>
        <section
          className="parents container section"
          aria-labelledby="parents-title"
        >
          <div className="parents-layout">
            <div className="parents-copy">
              <p className="eyebrow">Родителям</p>
              <h2 id="parents-title">
                Быть рядом.
                <br />
                Понимать процесс.
                <br />
                <span>Поддерживать выбор.</span>
              </h2>
              <p>
                Выбор после школы затрагивает всю семью. Мы учитываем интересы
                ученика и условия, в которых он будет учиться. При необходимости
                обсуждаем варианты вместе с родителями.
              </p>
              <ActionLink role="parent">Обсудить ситуацию ребёнка</ActionLink>
            </div>
            <div className="parents-details">
              <UsersThreeIcon size={40} weight="light" aria-hidden="true" />
              <div>
                <h3>На этапе выбора</h3>
                <p>
                  Помогаем сформулировать вопросы к разным маршрутам и
                  договориться, как их проверить.
                </p>
              </div>
              <div>
                <h3>При составлении плана</h3>
                <p>
                  Учитываем сроки, учебную нагрузку, бюджет и возможность
                  переезда.
                </p>
              </div>
              <div>
                <h3>Во время подготовки</h3>
                <p>
                  Даём согласованную обратную связь: что уже получается, какие
                  трудности остаются и над чем работаем дальше.
                </p>
              </div>
              <p className="parents-principle">
                Ученик участвует в решениях о своём будущем. Семья понимает ход
                работы.
              </p>
            </div>
          </div>
        </section>
        <section className="author container" aria-labelledby="author-title">
          <div className="author-intro">
            <div className="author-monogram" aria-hidden="true">
              Г.
            </div>
            <div>
              <p>Кто ведёт МЕТА</p>
              <h2 id="author-title">Георгий</h2>
              <span>Автор проекта</span>
            </div>
          </div>
          <div className="author-copy">
            <QuotesIcon size={33} weight="fill" aria-hidden="true" />
            <p className="author-statement">
              Мне важно, чтобы ЕГЭ и поступление становились осознанным шагом во
              взрослую жизнь.
            </p>
            <p>
              Я развиваю МЕТА, чтобы помочь старшеклассникам связать интересы,
              выбор образования и подготовку к экзаменам. Мы начинаем с вопроса
              о том, к чему ученик хочет двигаться, и постепенно переводим ответ
              в конкретные действия.
            </p>
            <p className="author-bio">{site.biography}</p>
            <a
              className="text-link"
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Познакомиться в Telegram
              <ArrowUpRightIcon size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          className="formats container section"
          id="formats"
          aria-labelledby="formats-title"
        >
          <div className="section-heading">
            <h2 id="formats-title">
              Выберите работу
              <br className="desktop-break" /> под свою задачу
            </h2>
            <p>
              От отдельного вопроса до последовательной подготовки. Состав и
              стоимость работы согласуем заранее.
            </p>
          </div>
          <div className="pricing-grid">
            <article className="price-card">
              <span className="format-label">Разобрать конкретный вопрос</span>
              <h3>Следующий шаг</h3>
              <p className="format-description">
                Одна консультация, чтобы разобраться в ситуации и наметить
                ближайшие действия.
              </p>
              <p className="price">
                3 900 <span>₽</span>
              </p>
              <p className="price-unit">за консультацию</p>
              <ul className="included">
                <li>Встреча на 60 минут</li>
                <li>Предварительная анкета</li>
                <li>Краткое письменное резюме</li>
                <li>План ближайших действий</li>
              </ul>
              <ActionLink task="other" className="button button-outline">
                Обсудить консультацию
              </ActionLink>
            </article>
            <article className="price-card price-featured">
              <span className="format-label">
                Исследовать варианты будущего
              </span>
              <h3>Мой путь</h3>
              <p className="format-description">
                Программа профориентации: от исследования интересов к плану
                практических проб.
              </p>
              <div className="price-options">
                <div>
                  <p className="price">
                    14 900 <span>₽</span>
                  </p>
                  <p className="price-unit">в группе</p>
                </div>
                <div>
                  <p className="price secondary-price">
                    24 900 <span>₽</span>
                  </p>
                  <p className="price-unit">индивидуально</p>
                </div>
              </div>
              <ul className="included">
                <li>Группа: 4 встречи по 90 минут, 4–6 человек</li>
                <li>Задания с обратной связью</li>
                <li>Индивидуальная встреча на 45 минут</li>
              </ul>
              <details className="format-details">
                <summary>
                  Что входит в индивидуальный формат
                  <PlusIcon size={16} aria-hidden="true" />
                </summary>
                <p>
                  4 встречи по 60 минут, 4 письменных разбора, итоговый план
                  проб и встреча с родителем на 30 минут.
                </p>
              </details>
              <ActionLink task="direction" className="button button-primary">
                Обсудить профориентацию
              </ActionLink>
            </article>
            <article className="price-card">
              <span className="format-label">
                Выбрать образовательный маршрут
              </span>
              <h3>Маршрут</h3>
              <p className="format-description">
                Сравнение образовательных вариантов и понятная дорожная карта
                поступления.
              </p>
              <p className="price">
                16 900 <span>₽</span>
              </p>
              <p className="price-unit">за программу</p>
              <ul className="included">
                <li>Две встречи по 60 минут</li>
                <li>До 5 программ в одной стране в рамках запроса</li>
                <li>Требования и дорожная карта</li>
                <li>Одна корректировка плана</li>
              </ul>
              <ActionLink task="route" className="button button-outline">
                Обсудить маршрут
              </ActionLink>
            </article>
            <article className="price-card">
              <span className="format-label">Подготовиться к экзаменам</span>
              <h3>К своей цели</h3>
              <p className="format-description">
                Системная работа над предметом, практика и регулярная обратная
                связь.
              </p>
              <div className="price-options">
                <div>
                  <p className="price">
                    12 800 <span>₽</span>
                  </p>
                  <p className="price-unit">в мини-группе</p>
                </div>
                <div>
                  <p className="price secondary-price">
                    25 600 <span>₽</span>
                  </p>
                  <p className="price-unit">индивидуально</p>
                </div>
              </div>
              <ul className="included">
                <li>Группа: 8 занятий по 90 минут, 3–5 человек</li>
                <li>Индивидуально: 8 занятий по 60 минут</li>
                <li>Материалы и домашние задания с проверкой</li>
                <li>Обратная связь</li>
              </ul>
              <p className="subject-note">
                За один предмет, с одного ученика. Доступные предметы уточните
                на знакомстве.
              </p>
              <ActionLink task="exams" className="button button-outline">
                Обсудить подготовку
              </ActionLink>
            </article>
          </div>
          <p className="pricing-note">
            Полные условия, расписание, способы оплаты и правила переноса встреч
            обсуждаем до покупки.
          </p>
        </section>
        <section
          className="faq section"
          id="questions"
          aria-labelledby="questions-title"
        >
          <div className="container faq-layout">
            <div>
              <h2 id="questions-title">
                Можно
                <br />
                спросить
              </h2>
              <p className="faq-intro">
                Здесь собрали вопросы, которые часто возникают перед первым
                шагом.
              </p>
              <a
                className="text-link"
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Задать свой вопрос
                <ArrowUpRightIcon size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="faq-list">
              {questions.map(([question, answer]) => (
                <details key={question} className="faq-item">
                  <summary>
                    {question}
                    <PlusIcon size={22} aria-hidden="true" />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section
          className="contact section container"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Следующий шаг</p>
              <h2 id="contact-title">
                Начнём
                <br />с вашей ситуации<span className="accent-dot">.</span>
              </h2>
              <p>
                Расскажите, какой следующий шаг сейчас вызывает вопросы. Уточним
                задачу и предложим подходящий формат знакомства с МЕТА.
              </p>
              <div className="contact-direct">
                <span>Или свяжитесь напрямую</span>
                <a
                  href={site.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram {site.telegramLabel}
                  <ArrowUpRightIcon size={20} aria-hidden="true" />
                </a>
                <a href={site.phoneHref}>
                  {site.phone}
                  <ArrowUpRightIcon size={20} aria-hidden="true" />
                </a>
              </div>
              <p className="contact-note">
                На знакомстве обсудим вашу ситуацию. Формат, состав и стоимость
                платной работы согласуем до её начала.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <a className="wordmark" href="#top" aria-label="МЕТА, наверх">
              <span className="brand-mark" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              МЕТА<span className="wordmark-dot">.</span>
            </a>
            <p>
              Профориентация, выбор образовательного маршрута
              <br className="desktop-break" /> и подготовка к экзаменам для
              старшеклассников.
            </p>
            <a className="back-top" href="#top">
              Наверх
              <ArrowUpRightIcon size={19} aria-hidden="true" />
            </a>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} МЕТА</span>
            <div className="footer-contacts">
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </div>
            <LegalLinks />
          </div>
        </div>
      </footer>
    </>
  );
}
