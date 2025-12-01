import { Form } from "informed";
import useLoginForm from "./useLoginForm";
import Button from "@src/components/Button";
import Input from "@src/components/Input";
import GotoLink from "@src/components/GotoLink";
import { PAGE_ROUTES } from "@src/constants/routeConstants";
import { isRequired, validateEmail } from "@src/utilities/formValidator";
import combine from "@src/utilities/combine";

const LoginForm = () => {
  const {
    handleSubmit,
    isMutating,
    formApiRef,
    togglePasswordVisibility,
    showPassword,
  } = useLoginForm();

  return (
    <div className="w-full p-[30px] xl:py-[30px] xl:px-[40px]">
      <div className="w-full flex flex-col">
        <h1 className="text-xl font-semibold mb-30">Sign in</h1>
      </div>
      <Form onSubmit={handleSubmit} formApiRef={formApiRef}>
        <div className="w-full relative flex flex-col">
          <div className="flex flex-col space-y-6">
            <Input
              label={"User ID"}
              type={"text"}
              field={"username"}
              size={"lg"}
              validateOn="change-blur"
              maxLength={40}
              validate={combine([validateEmail, isRequired])}
            />
            <div className="relative">
              <Input
                label={"Password"}
                type={showPassword ? "text" : "password"}
                field={"password"}
                size={"lg"}
                validateOn="change-blur"
                validate={combine([isRequired])}
                icon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-1 flex items-center text-gray-600"
                  >
                    {showPassword ? (
                      <span className="material-symbols-rounded text-lg">
                        visibility
                      </span>
                    ) : (
                      <span className="material-symbols-rounded text-lg">
                        visibility_off
                      </span>
                    )}
                  </button>
                }
                iconPosition="right"
              />
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="md"
          classNames={"!w-full my-30"}
          type="submit"
          loading={isMutating}
          disabled={isMutating}
        >
          Login
        </Button>
      </Form>

      <div className="w-full relative flex flex-col">
        <GotoLink
          label={"Forgot password?"}
          underline
          path={PAGE_ROUTES.forgotPassword}
          //disabled={isMutating}
        />
      </div>
    </div>
  );
};

export default LoginForm;
