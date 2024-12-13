import * as React from "react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

interface SearchFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  onSubmit?: (data: SearchSchema) => void;
}

type SearchSchema = z.infer<typeof searchSchema>;

const searchSchema = z.object({ query: z.string() });

const SearchForm = React.forwardRef<HTMLFormElement, SearchFormProps>(
  ({ className, onSubmit, ...props }, ref) => {
    const searchForm = useForm<SearchSchema>({
      resolver: zodResolver(searchSchema),
      defaultValues: {
        query: "",
      },
    });

    return (
      <Form {...searchForm}>
        <form
          onSubmit={searchForm.handleSubmit((data) => onSubmit?.(data))}
          className={cn("flex gap-[1px]", className)}
          ref={ref}
          {...props}
        >
          <FormField
            name="query"
            control={searchForm.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="rounded-none rounded-s-md border-r-0"
                    placeholder="Search..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            size="icon"
            className="rounded-none rounded-e-md"
            type="submit"
          >
            <SearchIcon />
          </Button>
        </form>
      </Form>
    );
  },
);

export type { SearchSchema };
export { SearchForm, searchSchema };
