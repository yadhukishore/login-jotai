import { useRef, useState } from "react";
import { useSetAtom } from "jotai";
import { PAGE_ROUTES } from "@src/constants/routeConstants";
import ShowToast from "@src/components/ShowToast";
import { redirectionPathPostLogin } from "@src/atoms/authAtoms";
import useUserInfo from "@src/customHooks/useUserInfo";
import useMutation from "@src/customHooks/useMutation";

const useLoginForm = () => {
  const { handleToken } = useUserInfo();
  const [showPassword, setShowPassword] = useState(false);
  const setRedirectionPath = useSetAtom(redirectionPathPostLogin);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formApiRef = useRef();

  const { trigger, isMutating } = useMutation({
    url: `/auth/login`,
    options: {
      onSuccess: (data) => {
        if (data?.status) {
          const access_token = data?.data?.access_token;
          const refresh_token = data?.data?.refresh_token;
          if (access_token) {
            handleToken(access_token,refresh_token); // sets axios header + persists token
            setRedirectionPath(PAGE_ROUTES.dashboard); // jotai atom
          }
          formApiRef.current.reset();
          ShowToast("You have logged in successfully", "success");
        }
      },
      onError: (err) => {
        const errorMessage = err?.response?.data?.message;

        ShowToast(errorMessage, "error");
      },
    },
  });

  const handleSubmit = (data) => {
    const { username, password } = data.values;
    trigger({
      username: username,
      password: password,
    });
  };
  return {
    handleSubmit,
    isMutating,
    formApiRef,
    togglePasswordVisibility,
    showPassword,
  };
};

export default useLoginForm;
