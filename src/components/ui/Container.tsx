import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div"> & {
  wide?: boolean;
};

export function Container({ wide, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-gutter",
        wide ? "max-w-wide" : "max-w-page",
        className,
      )}
      {...props}
    />
  );
}
