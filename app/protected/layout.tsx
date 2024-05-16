import PrimaryNavigation from "@/components/Navigation/PrimaryNavigation";
import "@/app/globals.css";
import SearchBar from "@/components/Navigation/SearchBar";
import NavigationList from "@/components/Navigation/NavigationList";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10 mt-[calc(var(--mobileNavHeight)+2rem)] lg:mt-[calc(var(--mobileNavHeight)+3.5rem)]">
      <PrimaryNavigation>
        <NavigationList />
        <SearchBar />
      </PrimaryNavigation>
      <main>{children}</main>
    </div>
  );
}
