export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <main>
            left side bar
            {children}
            right side bar
        </main>
    </div>
  );
}
