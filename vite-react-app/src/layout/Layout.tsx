import ResponsiveAppBar from "../shared/components/ResponsiveAppBar";
import Footer from "../shared/components/Footer";

function Layout({ children }: any) {
  return (
    <div>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
