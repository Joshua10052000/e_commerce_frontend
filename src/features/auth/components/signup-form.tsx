import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useSignupForm } from "@/features/auth/hooks/use-signup-form";
import { SignupSchema } from "@/features/auth//types";

interface SignupFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: (data: SignupSchema) => void;
  disabled?: boolean;
}

const SignupForm = React.forwardRef<HTMLFormElement, SignupFormProps>(
  ({ className, children, onSubmit, disabled, ...props }, ref) => {
    const signupForm = useSignupForm();

    return (
      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit((data) => onSubmit?.(data))}
          className={cn("grid grid-cols-2 gap-2", className)}
          ref={ref}
          {...props}
        >
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
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
            control={signupForm.control}
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
          <FormField
            control={signupForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {children}
          <Button disabled={disabled} type="submit" className="col-span-2">
            Continue
          </Button>
        </form>
      </Form>
    );
  },
);

export { SignupForm };
