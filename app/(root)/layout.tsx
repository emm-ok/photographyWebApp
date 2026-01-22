import Navbar from "@/components/layout/Navbar";
import Footer from "../../components/sections/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section>
        <Navbar />
        <div className="">{children}</div>
        <Footer />
      </section>
    </>
  );
}
