import Image from "next/image";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  BookOpenTextIcon,
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
import { PathPriceCard } from "@/components/path-price-card";
import { ExamPriceCard } from "@/components/exam-price-card";

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
            {/* <p className="hero-note">
              Онлайн, с практическими заданиями и обратной связью.
            </p> */}
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
            {/* <figcaption>
              <span>Большой путь начинается с понятного шага.</span>
              <span>Учебная иллюстрация</span>
            </figcaption> */}
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
                    сценарий и план ближайших тестов.
                  </p>
                </div>
                <ActionLink task="direction" className="text-link">
                  Обсудить профориентацию
                </ActionLink>
                <div className="method-note">
                  <LightbulbIcon size={27} weight="light" aria-hidden="true" />
                  <p>
                    В основе профориентационной части МЕТА лежит{" "}
                    <strong>Life Design</strong>, подход к проектированию жизни
                    Билла Бернетта и Дэйва Эванса. Несколько сценариев и небольшие
                    практические тесты помогают понять, куда идти дальше.
                  </p>
                </div>
              </div>
              <div className="sample sample-scenarios">
                <div className="sample-heading">
                  <span>Пример</span>
                  <CompassIcon size={22} weight="light" aria-hidden="true" />
                </div>
                <p className="sample-subtitle">
                  Ане 16 лет. Ей нравится информатика, организация школьных
                  событий и фотография. Родители предлагают IT, но она пока
                  не уверена. Вот три сценария на ближайшие пять лет.
                </p>
                <div className="scenario-option">
                  <span>1</span>
                  <div>
                    <strong>Создаю приложения и учусь жить самостоятельно</strong>
                    <p>
                      Текущая идея: поступить на IT-направление, сделать первое
                      приложение с друзьями и попробовать стажировку.
                    </p>
                    <div className="sample-next">
                      <span>Тест</span>
                      <p>
                        Сделать приложение для себя или класса.
                        Интересно ли писать код, когда возникают трудности?
                      </p>
                    </div>
                  </div>
                  {/* <ArrowUpRightIcon size={18} aria-hidden="true" /> */}
                </div>
                <div className="scenario-option">
                  <span>2</span>
                  <div>
                    <strong>Собираю людей и устраиваю события</strong>
                    <p>
                      Если путь в IT недоступен: от школьного фестиваля
                      к городским проектам и работе в культурном центре.
                    </p>
                    <div className="sample-next">
                      <span>Тест</span>
                      <p>
                        С двумя одноклассниками организовать школьный вечер —
                        от идеи до уборки. Нравится ли договариваться с людьми
                        и решать неожиданные задачи?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="scenario-option">
                  <span>3</span>
                  <div>
                    <strong>
                      Путешествую и рассказываю истории через фотографии
                    </strong>
                    <p>
                      Если деньги и мнение окружающих не имеют значения:
                      учиться фотографии, снимать жизнь людей, делать
                      фотопроекты и выставки.
                    </p>
                    <div className="sample-next">
                      <span>Тест</span>
                      <p>
                        Снять «Пять историй моего района» и показать героям
                        и друзьям. Нравится ли сам процесс съёмки
                        и знакомство с людьми?
                      </p>
                    </div>
                  </div>
                </div>
                {/* <p className="sample-caption">Учебный пример плана Одиссеи</p> */}
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
                  <span>Пример</span>
                  <MapTrifoldIcon size={22} weight="light" aria-hidden="true" />
                </div>
                <p className="sample-subtitle">
                  Допустим, Аня выбрала IT. Так может выглядеть её маршрут.
                </p>
                <ol className="route-roadmap" aria-label="Дорожная карта поступления">
                  <li>
                    <span className="route-timing">Сейчас</span>
                    <h4>Выбрать 3–5 программ</h4>
                    <p>Сравнить содержание, стоимость и условия жизни.</p>
                  </li>
                  <li>
                    <span className="route-timing">Следующий шаг</span>
                    <h4>Проверить требования</h4>
                    <p>Уточнить экзамены и сроки на сайтах вузов.</p>
                  </li>
                  <li>
                    <span className="route-timing">До экзаменов</span>
                    <h4>Подготовиться по плану</h4>
                    <p>Оценить текущий уровень и распределить учебные задачи.</p>
                  </li>
                  <li>
                    <span className="route-timing">Приёмная кампания</span>
                    <h4>Подать документы</h4>
                    <p>Следить за конкурсом и сроками, выбрать программу.</p>
                  </li>
                </ol>
                {/* <p className="sample-caption">
                  Пример маршрута. Конкретные сроки уточняем для выбранных программ.
                </p> */}
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
                  <span>Пример</span>
                  <BookOpenTextIcon
                    size={22}
                    weight="light"
                    aria-hidden="true"
                  />
                </div>
                <p className="sample-subtitle">
                  Допустим, для выбранных программ Ане нужна информатика.
                  После диагностики общий маршрут превращается в учебные задачи.
                </p>
                <ol className="study-plan" aria-label="План подготовки Ани к информатике">
                  <li>
                    <span className="plan-check">
                      <CheckIcon size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Диагностика пройдена</strong>
                      <p>
                        Логика даётся уверенно, а в задачах на программирование
                        возникают ошибки.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="plan-check">
                      <CheckIcon size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Темы выбраны</strong>
                      <p>
                        Сначала — циклы и работа со списками. Затем — задачи,
                        в которых они используются вместе.
                      </p>
                    </div>
                  </li>
                  <li className="plan-current">
                    <span className="plan-check">
                      <ArrowRightIcon size={16} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Сейчас: практика программирования</strong>
                      <p>
                        На занятии разбираем подход, дома решаем похожие задачи.
                        Ошибки обсуждаем на следующей встрече.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="plan-empty" />
                    <div>
                      <strong>Через месяц: проверка прогресса</strong>
                      <p>
                        Новая работа покажет, что Аня уже решает самостоятельно
                        и какие темы нужно повторить.
                      </p>
                    </div>
                  </li>
                </ol>
                {/* <p className="sample-caption">
                  Учебный пример плана подготовки
                </p> */}
              </div>
            </article>
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
            {/* <p className="process-note">
              Объём обратной связи и порядок общения между встречами согласуем
              до начала работы.
            </p> */}
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
              {/* <p className="parents-principle">
                Ученик участвует в решениях о своём будущем. Семья понимает ход
                работы.
              </p> */}
            </div>
          </div>
        </section>
        <section className="author container" aria-labelledby="author-title">
          <div className="author-intro">
            <Image
              className="author-photo"
              src="/images/author.png"
              alt="Георгий — автор проекта МЕТА"
              width={2752}
              height={1536}
              // Account for the landscape source covering a portrait frame.
              sizes="(max-width: 767px) 185px, (max-width: 1023px) 198px, 251px"
              quality={90}
            />
            <div>
              <p>Кто ведёт МЕТА</p>
              <h2 id="author-title">Георгий</h2>
              <span>Автор проекта</span>
            </div>
          </div>
          <div className="author-copy">
            <QuotesIcon size={33} weight="fill" aria-hidden="true" />
            <p className="author-statement">
              Мне важно, чтобы ЕГЭ и поступление становились не бегством от взрослой жизни, а первым осознанным шагом навстречу ей.
            </p>
            <p>
              Я развиваю МЕТА, чтобы помочь старшеклассникам связать интересы,
              выбор образования и подготовку к экзаменам. Мы начинаем с вопроса
              о том, к чему ученик хочет двигаться, и постепенно переводим ответ
              в конкретные действия.
            </p>
            {/* <p className="author-bio">{site.biography}</p>
            <a
              className="text-link"
              href={site.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Познакомиться в Telegram
              <ArrowUpRightIcon size={18} aria-hidden="true" />
            </a> */}
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
              {/* <span className="format-label">Разобрать конкретный вопрос</span> */}
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
            <PathPriceCard />
            <article className="price-card">
              {/* <span className="format-label">
                Выбрать образовательный маршрут
              </span> */}
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
            <ExamPriceCard />
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
              {/* <div className="contact-direct">
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
              </div> */}
              <p>
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
            {/* <div className="footer-contacts">
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </div> */}
            <div className="footer-contacts"><LegalLinks /></div>
          </div>
        </div>
      </footer>
    </>
  );
}
