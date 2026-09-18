"use client";

import { useId, useState } from "react";
import { ActionLink } from "@/components/action-link";

const formats = {
  group: {
    label: "В мини-группе",
    price: "12 800",
    included: [
      "8 занятий по 90 минут",
      "Мини-группа 3–5 человек",
      "Материалы и домашние задания с проверкой",
      "Обратная связь",
    ],
  },
  individual: {
    label: "Индивидуально",
    price: "25 600",
    included: [
      "8 индивидуальных занятий по 60 минут",
      "Материалы и домашние задания с проверкой",
      "Обратная связь",
    ],
  },
};

type Format = keyof typeof formats;

export function ExamPriceCard() {
  const [format, setFormat] = useState<Format>("group");
  const formatId = useId();
  const selected = formats[format];

  return (
    <article className="price-card">
      <h3>К своей цели</h3>
      <p className="format-description">
        Системная работа над предметом, практика и регулярная обратная связь.
      </p>
      <fieldset className="format-switch">
        <legend className="sr-only">Формат программы «К своей цели»</legend>
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
        <p className="price-unit">за 8 занятий по одному предмету</p>
        <ul className="included">
          {selected.included.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
      {/* <p className="subject-note">
        Стоимость указана с одного ученика. Доступные предметы уточните
        на знакомстве.
      </p> */}
      <ActionLink task="exams" className="button button-outline">
        Обсудить подготовку
      </ActionLink>
    </article>
  );
}
