import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import RefineProvider from "@/providers/refine-provider";
import { ReduxProvider } from "@/providers/redux-provider";

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReduxProvider>
        <RefineProvider>{children}</RefineProvider>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
}
