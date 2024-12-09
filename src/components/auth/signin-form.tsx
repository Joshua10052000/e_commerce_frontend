import * as React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

interface SigninFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: (data: SigninSchema) => void;
  disabled?: boolean;
}

type SigninSchema = z.infer<typeof signinSchema>;

const signinSchema = z.object({ email: z.string(), password: z.string() });

const SigninForm = React.forwardRef<HTMLFormElement, SigninFormProps>(
  ({ className, children, onSubmit, disabled, ...props }, ref) => {
    const signinForm = useForm<SigninSchema>({
      resolver: zodResolver(signinSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    return (
      <Form {...signinForm}>
        <form
          onSubmit={signinForm.handleSubmit((data) => onSubmit?.(data))}
          className={cn("grid gap-2", className)}
          ref={ref}
          {...props}
        >
          <FormField
            control={signinForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="foobar@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signinForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
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
  },
);

export type { SigninSchema };
export { SigninForm };
