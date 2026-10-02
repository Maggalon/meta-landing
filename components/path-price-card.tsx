import { ActionLink } from "@/components/action-link";

const included = [
  "3 групповые встречи по 90 минут",
  "Группа 4–6 человек",
  "Задания на платформе с обратной связью",
  "Подкасты и текстовые интервью с экспертами из выявленных сфер интересов",
  "Итоговый план практического эксперимента",
];

export function PathPriceCard() {
  return (
    <article className="price-card price-featured">
      {/* <span className="format-label">Исследовать варианты будущего</span> */}
      <h3>Мой путь</h3>
      <p className="format-description">
        Групповая программа профориентации: от исследования интересов к плану
        практического эксперимента.
      </p>
      <p className="price">
        14 900 <span>₽</span>
      </p>
      <p className="price-unit">за программу с одного ученика</p>
      <ul className="included">
        {included.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <ActionLink task="direction" className="button button-primary">
        Обсудить профориентацию
      </ActionLink>
    </article>
  );
}
