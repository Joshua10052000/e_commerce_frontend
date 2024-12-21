import { useConfirmCheckout } from "@/features/checkout/hooks/use-confirm-checkout";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const confirmCheckout = useConfirmCheckout();

  useEffect(() => {
    const orderId = searchParams.get("token");

    if (!orderId) {
      navigate("/cart");
      return;
    }

    confirmCheckout.mutate({ orderId });
  }, [searchParams]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60">
      <div className="flex min-h-screen items-center justify-center text-white">
        <div className="grid place-items-center">
          <LoaderIcon className="size-10 animate-spin" />
          <p className="text-balance font-semibold">
            Please wait a while we are confirming your order. Please do not
            close your browser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
