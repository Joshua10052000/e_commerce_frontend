import { SignupForm } from "@/components/auth/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormResponse } from "@/components/ui/form";
import auth from "@/server/actions/auth";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router";

const SignupPage = () => {
  const signup = useMutation({ mutationFn: auth.signUp });

  return (
    <div className="grid min-h-screen place-items-center">
      <Card className="w-full max-w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            <span>Already have an account? </span>
            <Link to="/auth/signin" className="font-semibold hover:underline">
              Sign In
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm disabled={signup.isPending} onSubmit={signup.mutate}>
            <FormResponse status={signup.status} className="col-span-2">
              {signup.error?.message || signup.data?.message}
            </FormResponse>
          </SignupForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
