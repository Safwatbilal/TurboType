import { ToastContainer } from "react-toastify";
import AuthWrapper from "@/components/AuthWrapper";
import Header from "@/components/Header";
import 'react-toastify/dist/ReactToastify.css';
import "@/globals.css";
import Tansket from "@/components/tansket";

export const metadata = {
  title: 'TurboType',
  description: "TurboType for all kind Typing."
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <html lang="en">
        <body className="bg-[#323437] min-h-screen">
          <Tansket>
            <div className="flex flex-col min-h-screen">
              <header className="px-4 sm:px-8 py-4 sm:py-8">
                <Header />
              </header>
              <main className="flex-1 p-4 mx-4 sm:mx-16">
                {children}
              </main>
              <ToastContainer />
            </div>
          </Tansket>
        </body>
      </html>
    </AuthWrapper>
  );
}
