import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "../lib/zod";
import { ReviewStar } from "./review-star";
import { FormSchema } from "../types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ReviewForm = React.forwardRef<
  HTMLFormElement,
  Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> & {
    onSubmit?: (inputs: FormSchema) => void;
    disabled?: boolean;
  }
>(({ className, children, onSubmit, disabled, ...props }, ref) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: "", stars: 0, productId: "" },
  });
  const [hoveredStar, setHoveredStar] = React.useState(0);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit?.(values))}
        className={cn("grid gap-2", className)}
        ref={ref}
        {...props}
      >
        <FormField
          control={form.control}
          name="stars"
          render={() => (
            <FormItem>
              <FormLabel>Ratings</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <ReviewStar
                      className="cursor-pointer"
                      filled={
                        form.getValues("stars") > i ||
                        (hoveredStar > i && "indeterminate")
                      }
                      onMouseEnter={() => {
                        setHoveredStar(i + 1);
                      }}
                      onMouseLeave={() => {
                        setHoveredStar(0);
                      }}
                      onClick={() => {
                        form.setValue(
                          "stars",
                          form.getValues("stars") === i + 1 ? 0 : i + 1,
                        );
                      }}
                      key={i}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
        <Button disabled={disabled} type="submit">
          Continue
        </Button>
      </form>
    </Form>
  );
});

export { ReviewForm };
