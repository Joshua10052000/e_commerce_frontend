import * as React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSigninForm } from "@/features/auth/hooks/use-signin-form";
import { SigninSchema } from "@/features/auth/types";

interface SigninFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: (data: SigninSchema) => void;
  disabled?: boolean;
}

const SigninForm = React.forwardRef<HTMLFormElement, SigninFormProps>(
  ({ className, children, onSubmit, disabled, ...props }, ref) => {
    const signinForm = useSigninForm();

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

export { SigninForm };
