"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react";
import { site, tasks, type Role, type Task } from "@/lib/site";

type ContactSettings = {
  enabled: boolean;
  privacyUrl: string;
  consentUrl: string;
  consentText: string;
};
const defaultSettings: ContactSettings = {
  enabled: false,
  privacyUrl: "",
  consentUrl: "",
  consentText: "",
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [task, setTask] = useState<Task | "">("");
  const [role, setRole] = useState<Role | "">("");
  const [settings, setSettings] = useState(defaultSettings);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "draft" | "error"
  >("idle");
  const [error, setError] = useState("");
  const [draftUrl, setDraftUrl] = useState("");
  const requestId = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/contact", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : defaultSettings))
      .then(setSettings)
      .catch(() => {});
    function preselect(event: Event) {
      const detail = (event as CustomEvent<{ task?: Task; role?: Role }>)
        .detail;
      if (detail.task) setTask(detail.task);
      if (detail.role) setRole(detail.role);
      setStatus((current) =>
        current === "sending" || current === "success" ? current : "idle",
      );
      requestId.current = null;
    }
    window.addEventListener("meta:contact", preselect);
    return () => {
      controller.abort();
      window.removeEventListener("meta:contact", preselect);
    };
  }, []);

  useEffect(() => {
    if (status === "success" || status === "draft" || status === "error")
      resultRef.current?.focus();
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    if (!name || !contact) {
      setError(
        !contact
          ? "Укажите контакт, по которому можно вам ответить."
          : "Укажите, как к вам обращаться.",
      );
      setStatus("error");
      return;
    }
    const grade = String(data.get("grade") ?? "");
    const comment = String(data.get("comment") ?? "").trim();
    if (!settings.enabled) {
      const lines = [
        "Здравствуйте, Георгий! Хочу обсудить следующий шаг в МЕТА.",
        `Имя: ${name}`,
        role === "parent" ? "Я родитель" : "Я школьник",
        `Контакт: ${contact}`,
        task
          ? `Задача: ${tasks.find((item) => item.value === task)?.label}`
          : "",
        grade ? `Класс: ${grade}` : "",
        comment,
      ].filter(Boolean);
      setDraftUrl(
        `${site.telegram}?text=${encodeURIComponent(lines.join("\n"))}`,
      );
      setStatus("draft");
      return;
    }
    setError("");
    setStatus("sending");
    requestId.current ??= crypto.randomUUID();
    const query = new URLSearchParams(window.location.search);
    const source = Object.fromEntries(
      ["utm_source", "utm_medium", "utm_campaign", "utm_content"].flatMap(
        (key) => {
          const value = query.get(key);
          return value ? [[key, value.slice(0, 200)]] : [];
        },
      ),
    );
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          contact,
          task,
          grade,
          comment,
          consent: data.get("consent") === "on",
          website: data.get("website"),
          requestId: requestId.current,
          source,
        }),
        signal: AbortSignal.timeout(25_000),
      });
      if (!response.ok) throw new Error("delivery");
      setStatus("success");
    } catch {
      setError(
        "Не удалось отправить заявку. Введённые данные сохранены. Попробуйте ещё раз или напишите Георгию в Telegram.",
      );
      setStatus("error");
    }
  }

  if (status === "success")
    return (
      <div ref={resultRef} className="form-result" role="status" tabIndex={-1}>
        <CheckCircleIcon size={46} weight="light" aria-hidden="true" />
        <h3>Спасибо! Заявка отправлена.</h3>
        <p>
          Свяжемся с вами по указанному контакту, чтобы уточнить задачу и
          договориться о знакомстве.
        </p>
      </div>
    );

  return (
    <form
      className="contact-form"
      ref={formRef}
      onSubmit={submit}
      onChange={() => {
        if (status === "draft" || status === "error") setStatus("idle");
        requestId.current = null;
      }}
    >
      <div className="field">
        <label htmlFor="contact-name">
          Как к вам обращаться <span>*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          placeholder="Ваше имя"
          required
          maxLength={100}
        />
      </div>
      <fieldset className="role-field">
        <legend>
          Вы обращаетесь как <span>*</span>
        </legend>
        <div className="role-options">
          {(
            [
              ["student", "Я школьник"],
              ["parent", "Я родитель"],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className={role === value ? "selected" : ""}>
              <input
                type="radio"
                name="role"
                value={value}
                checked={role === value}
                onChange={() => setRole(value)}
                required
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="contact-detail">
          Удобный контакт для ответа <span>*</span>
        </label>
        <input
          id="contact-detail"
          name="contact"
          placeholder="Telegram, телефон или электронная почта"
          autoComplete="off"
          aria-describedby="contact-hint"
          required
          maxLength={200}
        />
        <small id="contact-hint">
          Укажите контакт, по которому можно вам ответить.
        </small>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="contact-task">Что хочется обсудить</label>
          <select
            id="contact-task"
            name="task"
            value={task}
            onChange={(event) => setTask(event.target.value as Task | "")}
          >
            <option value="">Выберите задачу</option>
            {tasks.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="contact-grade">
            Класс <span className="optional">необязательно</span>
          </label>
          <select id="contact-grade" name="grade" defaultValue="">
            <option value="">Не указан</option>
            {["8", "9", "10", "11", "Уже окончил(а) школу"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-comment">
          Комментарий <span className="optional">необязательно</span>
        </label>
        <textarea
          id="contact-comment"
          name="comment"
          rows={3}
          maxLength={2000}
          placeholder="Можно коротко описать ситуацию"
        />
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Сайт</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {settings.enabled ? (
        <label className="consent">
          <input name="consent" type="checkbox" required />
          <span>
            {settings.consentText}{" "}
            <a
              href={settings.consentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Текст согласия
            </a>{" "}
            и{" "}
            <a
              href={settings.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              политика обработки персональных данных
            </a>
            .
          </span>
        </label>
      ) : (
        <p className="form-notice">
          Подготовим сообщение для Георгия в Telegram. Вы сможете проверить
          текст и отправить его самостоятельно. Форма не отправляет данные на
          сайт.
        </p>
      )}
      {status === "error" && (
        <div className="form-error" ref={resultRef} role="alert" tabIndex={-1}>
          {error}{" "}
          <a href={site.telegram} target="_blank" rel="noopener noreferrer">
            Написать в Telegram
          </a>
        </div>
      )}
      {status === "draft" ? (
        <div
          ref={resultRef}
          className="draft-result"
          role="status"
          tabIndex={-1}
        >
          <PaperPlaneTiltIcon size={25} aria-hidden="true" />
          <div>
            <strong>Сообщение подготовлено</strong>
            <p>
              Заявка ещё не отправлена. Откройте Telegram и отправьте сообщение
              Георгию.
            </p>
            <a
              className="button button-primary"
              href={draftUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Открыть Telegram
              <ArrowUpRightIcon size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : (
        <button
          className="button button-primary form-submit"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending"
            ? "Отправляем…"
            : settings.enabled
              ? "Отправить заявку"
              : "Продолжить в Telegram"}
          <ArrowUpRightIcon size={19} aria-hidden="true" />
        </button>
      )}
      {/* <p className="required-note">* Обязательные поля</p> */}
    </form>
  );
}
