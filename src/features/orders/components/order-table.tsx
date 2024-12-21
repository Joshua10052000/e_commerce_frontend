import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { OrderItem } from "../types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useProduct } from "@/features/products/hooks/use-product";
import { formatCents } from "@/features/products/lib/utils";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ClipboardIcon, EllipsisIcon, PenIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReviewForm } from "@/features/reviews/components/review-form";
import { useCreateReview } from "@/features/reviews/hooks/use-create-review";
import { FormResponse } from "@/components/ui/form";

const columnHelper = createColumnHelper<OrderItem>();
const columns = [
  columnHelper.display({
    id: "product.image",
    header: () => {
      return <span></span>;
    },
    cell: ({ row }) => {
      const product = useProduct(row.original.productId);
      const images = product.data ? product.data.product.images : [];

      return (
        <div className="size-10 overflow-hidden rounded-md">
          <img
            className="h-full max-h-full w-full max-w-full object-cover"
            src={images[0]}
            alt={product.data?.product.name}
          />
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "product.name",
    header: () => {
      return <span>Name</span>;
    },
    cell: ({ row }) => {
      const product = useProduct(row.original.productId);

      return (
        <Link
          to={`/products/${row.original.productId}`}
          className="line-clamp-1 hover:underline"
        >
          {product.data?.product.name}
        </Link>
      );
    },
  }),
  columnHelper.display({
    id: "product.priceCents",
    header: () => {
      return <span>Price</span>;
    },
    cell: ({ row }) => {
      const product = useProduct(row.original.productId);
      const price = product.data
        ? formatCents(product.data.product.priceCents)
        : 0;

      return <span>${price}</span>;
    },
  }),
  columnHelper.accessor("quantity", {
    header: () => {
      return <span>Quantity</span>;
    },
    cell: ({ cell }) => {
      return <span>{cell.getValue()}</span>;
    },
  }),
  columnHelper.display({
    id: "total",
    header: () => {
      return <span>Total</span>;
    },
    cell: ({ row }) => {
      const product = useProduct(row.original.productId);
      const total = formatCents(
        product.data?.product.priceCents ?? 0 * row.original.quantity,
      );

      return <span className="font-semibold">${total}</span>;
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => {
      return <span>Actions</span>;
    },
    cell: ({ row }) => {
      const product = useProduct(row.original.productId);
      const createReview = useCreateReview();
      const images = product.data ? product.data.product.images : [];

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <ClipboardIcon className="size-4" />
                <span>Copy ID</span>
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <PenIcon className="size-4" />
                  <span>Review</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Write a review</DialogTitle>
              <DialogDescription>
                Write a review for this product, and click continue when you are
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <div className="mx-auto max-w-xs">
                <img
                  src={images[0]}
                  className="aspect-square h-full max-h-full w-full max-w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {product.data?.product.name}
                </h3>
                <p
                  className="line-clamp-5 text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: product.data?.product.description ?? "",
                  }}
                />
              </div>
              <ReviewForm
                disabled={createReview.isPending}
                onSubmit={({ description, stars }) => {
                  createReview.mutate({
                    description,
                    stars,
                    productId: row.original.productId,
                  });
                }}
              >
                <FormResponse status={createReview.status}>
                  {createReview.data?.message || createReview.error?.message}
                </FormResponse>
              </ReviewForm>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  }),
];

const OrderTable = React.forwardRef<
  React.ElementRef<typeof Table>,
  React.ComponentPropsWithoutRef<typeof Table> & {
    orderItems: OrderItem[];
    totalCents: number;
  }
>(({ className, orderItems, totalCents, ...props }, ref) => {
  const orderTable = useReactTable({
    data: orderItems,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroups = orderTable.getHeaderGroups();
  const coreRowModel = orderTable.getCoreRowModel();

  return (
    <Table className={cn(className)} ref={ref} {...props}>
      {headerGroups.map((headerGroup) => (
        <TableHeader key={headerGroup.id}>
          <TableRow>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      ))}
      <TableBody>
        {coreRowModel.rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell
            colSpan={
              headerGroups.flatMap((headerGroup) => headerGroup.headers)
                .length - 2
            }
          >
            Total Amount
          </TableCell>
          <TableCell>${formatCents(totalCents)}</TableCell>
          <TableCell>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent></DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
});

export { OrderTable };
