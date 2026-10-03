"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  required?: boolean;
  full?: boolean;
  autoComplete?: string;
};

type Status = { kind: "idle" | "sending" | "sent" | "mailto" | "error"; message?: string };

const toLabel = (key: string) => key.replace(/[-_]/g, " ").replace(/^./, (letter) => letter.toUpperCase());

/**
 * Sends the enquiry to /api/enquiry (Cloudflare Worker → email to the Federation).
 * If the endpoint is unavailable (e.g. local `next dev`), it falls back to opening the visitor's email app.
 */
export function EnquiryForm({ id, kind, subject, fields, submitLabel }: { id: string; kind: "membership" | "contact"; subject: string; fields: Field[]; submitLabel: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const values = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, kind, subject }),
      });
      if (response.ok) {
        form.reset();
        setStatus({ kind: "sent", message: "Thank you. Your enquiry has been sent to the Federation. We will reply to the email address you gave." });
        return;
      }
      if (response.status === 400 || response.status === 429) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setStatus({ kind: "error", message: data.error ?? "Please check the form and try again." });
        return;
      }
      throw new Error(`Unexpected status ${response.status}`);
    } catch {
      const { website: _honeypot, ...rest } = values;
      const body = Object.entries(rest)
        .filter(([, value]) => value)
        .map(([key, value]) => `${toLabel(key)}: ${value}`)
        .join("\n");
      setStatus({ kind: "mailto" });
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  return (
    <form className="form-card reveal" noValidate={false} onSubmit={onSubmit} aria-describedby={`${id}-status`}>
      <div className="form-grid">
        {fields.map((field) => {
          const fieldId = `${id}-${field.name}`;
          const common = { className: "field", id: fieldId, name: field.name, required: field.required, autoComplete: field.autoComplete };
          return (
            <div key={field.name} className={`field-group${field.full ? " full" : ""}`}>
              <label htmlFor={fieldId}>
                {field.label}
                {field.required ? "" : " (optional)"}
              </label>
              {field.type === "textarea" ? (
                <textarea {...common} maxLength={4000} />
              ) : field.type === "select" ? (
                <select {...common} defaultValue="">
                  <option value="">Select an option</option>
                  {field.options?.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input {...common} type={field.type ?? "text"} inputMode={field.type === "tel" ? "tel" : undefined} maxLength={200} />
              )}
            </div>
          );
        })}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor={`${id}-website`}>Leave this field empty</label>
          <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <button className="btn btn-primary" type="submit" style={{ marginTop: 20 }} disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : submitLabel}
      </button>
      <div id={`${id}-status`} role="status" aria-live="polite">
        {status.kind === "sent" && <p className="form-note">{status.message}</p>}
        {status.kind === "error" && <p className="form-note is-error">{status.message}</p>}
        {status.kind === "mailto" && (
          <p className="form-note">
            We couldn’t send the form directly, so your email app should open with the details filled in. If it doesn’t, write to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        )}
      </div>
      <p className="form-disclaimer">
        Your details are used only to respond to this enquiry. See our <Link href="/privacy">privacy notice</Link>.
      </p>
    </form>
  );
}
