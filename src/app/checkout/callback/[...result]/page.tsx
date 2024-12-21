import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CircleCheckBigIcon } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

const CheckoutCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const isSuccess = searchParams.get("success");

    if (!isSuccess) {
      navigate("/");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <div className="space-y-6 text-balance text-center">
            <h1 className="text-2xl font-bold">Thank you for choosing us!</h1>
            <div className="flex items-center justify-center">
              <CircleCheckBigIcon className="size-10" />
            </div>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              itaque necessitatibus molestiae quasi minima voluptate
              repudiandae.
            </p>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/orders">View Order</Link>
          </Button>
          <Button className="w-full" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutCallbackPage;
