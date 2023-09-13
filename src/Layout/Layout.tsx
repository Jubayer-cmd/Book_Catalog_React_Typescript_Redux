import { ReactNode } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>

      <div className="mb-60">{children}</div>

      <Footer />
    </>
  );
};
export default Layout;
