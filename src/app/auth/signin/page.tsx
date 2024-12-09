import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FormResponse } from "@/components/ui/form";

import { SigninForm } from "@/features/auth/components/signin-form";
import { useSignin } from "@/features/auth/hooks/use-signin";

const SigninPage = () => {
  const signIn = useSignin();

  return (
    <div className="grid min-h-screen place-items-center">
      <Card className="w-full max-w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            <span>Don't have an account yet? </span>
            <Link to="/auth/signup" className="font-semibold hover:underline">
              Sign Up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SigninForm disabled={signIn.isPending} onSubmit={signIn.mutate}>
            <FormResponse status={signIn.status}>
              {signIn.error?.message || signIn.data?.message}
            </FormResponse>
          </SigninForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
