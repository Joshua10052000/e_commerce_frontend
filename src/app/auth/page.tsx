import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

const AuthPage = () => {
  return (
    <div className="grid min-h-screen place-items-center">
      <Card className="w-full max-w-full overflow-hidden sm:max-w-sm">
        <CardContent className="p-0">
          <img
            src="/placeholder.svg"
            className="h-full max-h-full w-full max-w-full"
          />
        </CardContent>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Find what your looking for</CardTitle>
          <CardDescription className="text-balance">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo enim
            ex nam at optio ut perspiciatis perferendis. Provident sed facilis,
            inventore velit dolor repudiandae libero maxime. Unde ratione aut
            fuga.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2 p-6">
          <Button className="w-full rounded-full" asChild>
            <Link to="/auth/signup">Create an account</Link>
          </Button>
          <Button className="w-full rounded-full" variant="ghost" asChild>
            <Link to="/auth/signin">Already have an account</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
