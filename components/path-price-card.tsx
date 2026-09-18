"use client";

import { useId, useState } from "react";
import { ActionLink } from "@/components/action-link";

const formats = {
  group: {
    label: "В группе",
    price: "14 900",
    unit: "за программу с одного ученика",
    included: [
      "4 групповые встречи по 90 минут",
      "Группа 4–6 человек",
      "Задания с обратной связью",
      "Индивидуальная встреча на 45 минут",
    ],
  },
  individual: {
    label: "Индивидуально",
    price: "24 900",
    unit: "за индивидуальную программу",
    included: [
      "4 индивидуальные встречи по 60 минут",
      "Задания с обратной связью",
      "Итоговый план практических тестов",
      "Встреча с родителем на 30 минут",
    ],
  },
};

type Format = keyof typeof formats;

export function PathPriceCard() {
  const [format, setFormat] = useState<Format>("group");
  const formatId = useId();
  const selected = formats[format];

  return (
    <article className="price-card price-featured">
      {/* <span className="format-label">Исследовать варианты будущего</span> */}
      <h3>Мой путь</h3>
      <p className="format-description">
        Программа профориентации: от исследования интересов к плану
        практических тестов.
      </p>
      <fieldset className="format-switch">
        <legend className="sr-only">Формат программы «Мой путь»</legend>
        {(["group", "individual"] as const).map((value) => (
          <label key={value}>
            <input
              className="sr-only"
              type="radio"
              name={formatId}
              value={value}
              checked={format === value}
              onChange={() => setFormat(value)}
            />
            <span>{formats[value].label}</span>
          </label>
        ))}
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        <p className="price">
          {selected.price} <span>₽</span>
        </p>
        <p className="price-unit">{selected.unit}</p>
        <ul className="included">
          {selected.included.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      <ActionLink task="direction" className="button button-primary">
        Обсудить профориентацию
      </ActionLink>
    </article>
  );
}
