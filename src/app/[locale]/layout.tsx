import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import RefineProvider from "@/providers/refine-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Project Management App",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="h-full"
    >
      <body className="h-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>
            <RefineProvider>{children}</RefineProvider>
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
