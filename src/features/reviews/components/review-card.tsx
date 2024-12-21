import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";
import { Review } from "../types";
import { cn } from "@/lib/utils";
import { useUser } from "@/features/users/hooks/use-user";
import { ReviewStars } from "./review-stars";
import { useSession } from "@/features/auth/hooks/use-session";

const ReviewCard = React.forwardRef<
  React.ElementRef<typeof Card>,
  React.ComponentPropsWithoutRef<typeof Card> & { review: Review }
>(({ className, review, ...props }, ref) => {
  const user = useUser(review.userId);
  const session = useSession();
  const isMe = user.data?.user?.id === session.data?.user?.id;

  return (
    <Card className={cn(className)} ref={ref} {...props}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{user.data?.user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {isMe ? "You" : user.data?.user?.name}
            </p>
            <div className="flex items-center space-x-2">
              <ReviewStars count={5} stars={review.stars} />
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">{review.description}</p>
      </CardContent>
    </Card>
  );
});

export { ReviewCard };
