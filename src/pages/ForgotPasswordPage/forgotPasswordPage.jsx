import ForgotPassword from "@src/components/Login/ForgotPassword";
import AuthProvider from "@src/providers/AuthProvider";

const ForgotPasswordPage = () => {
  return (
    <main className="relative w-full h-[100vh] flex justify-center items-center">
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    </main>
  );
};

export default ForgotPasswordPage;
