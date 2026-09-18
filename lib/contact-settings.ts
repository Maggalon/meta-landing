function publicUrl(value: string | undefined) {
  if (!value) return "";
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    return new URL(value).protocol === "https:" ? value : "";
  } catch {
    return "";
  }
}

export function contactSettings() {
  const privacyUrl = publicUrl(process.env.CONTACT_PRIVACY_URL);
  const consentUrl = publicUrl(process.env.CONTACT_CONSENT_URL);
  const consentText = process.env.CONTACT_CONSENT_TEXT?.trim() ?? "";
  const termsUrl = publicUrl(process.env.CONTACT_TERMS_URL);
  const providerUrl = publicUrl(process.env.CONTACT_PROVIDER_URL);
  return {
    enabled: Boolean(
      process.env.CONTACT_WEBHOOK_URL &&
      privacyUrl &&
      consentUrl &&
      consentText,
    ),
    privacyUrl,
    consentUrl,
    consentText,
    links: [
      { label: "Политика обработки данных", url: privacyUrl },
      { label: "Условия оказания услуг", url: termsUrl },
      { label: "Данные исполнителя", url: providerUrl },
    ].filter((link) => link.url),
  };
}
