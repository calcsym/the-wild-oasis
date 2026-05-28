import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
//import { useAuth } from "../../context/FakeAuthContext";

/*
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //const { user, logout } = useAuth();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
*/
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      // NOTE: setQueryData -- not setQueriesData, as Jonas suggested
      // and we need ONLY data.user here, not full data, as Jonas suggested
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login successful");
      navigate("/dashboard");
    },

    onError: (error) =>
      toast.error(
        error.cause?.message
          ? `${error.message}: ${error.cause.message}`
          : error.message,
      ),
  });

  return { login, isLoading };
};
