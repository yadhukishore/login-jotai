import AuthProvider from "../../providers/AuthProvider/authProvider";
import Authentication from "./components/Authentication";

const LoginPage = () => {
  return (
    <main className="relative w-full h-[100vh] flex justify-center items-center">
      <AuthProvider>
        <Authentication />
      </AuthProvider>
    </main>
  );
};

export default LoginPage;
