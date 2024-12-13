import * as React from "react";
import * as ReactQuery from "@tanstack/react-query";
import * as ReactQueryDevtools from "@tanstack/react-query-devtools";

interface QueryProviderProps {
  children?: React.ReactNode;
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = React.useState(() => new ReactQuery.QueryClient());

  return (
    <ReactQuery.QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools.ReactQueryDevtools />
    </ReactQuery.QueryClientProvider>
  );
};

export { QueryProvider };
