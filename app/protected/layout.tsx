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
    <div className="mt-[calc(var(--mobileNavHeight)+4.25rem)]">
      <PrimaryNavigation>
        <NavigationList />
        <SearchBar />
      </PrimaryNavigation>
      <main>{children}</main>
    </div>
  );
}
