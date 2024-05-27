import PrimaryNavigation from "@/components/Navigation/PrimaryNavigation";
import "@/app/globals.css";
import UserInfoBar from "@/components/Navigation/UserInfoBar";
import NavigationList from "@/components/Navigation/NavigationList";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10 mt-[calc(var(--mobileNavHeight)+1.25rem)] lg:mt-[calc(var(--mobileNavHeight)+3.5rem)]">
      <PrimaryNavigation>
        <NavigationList />
        <UserInfoBar />
      </PrimaryNavigation>
      <main>{children}</main>
    </div>
  );
}
