import PrimaryNavigation from "@/components/Navigation/PrimaryNavigation";
import "@/app/globals.css";
import UserSignout from "@/components/UserSignout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="mt-[var(--mobileNavHeight)] pt-5">
        <PrimaryNavigation>
          <UserSignout />
        </PrimaryNavigation>
        <main>{children}</main>
      </body>
    </html>
  );
}
