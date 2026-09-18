"use client";

import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import type { Role, Task } from "@/lib/site";

export function ActionLink({
  children = "Обсудить следующий шаг",
  task,
  role,
  className = "button button-primary",
}: {
  children?: ReactNode;
  task?: Task;
  role?: Role;
  className?: string;
}) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("meta:contact", { detail: { task, role } }),
        );
      }}
    >
      {children}
      <ArrowUpRightIcon size={19} weight="bold" aria-hidden="true" />
    </a>
  );
}
