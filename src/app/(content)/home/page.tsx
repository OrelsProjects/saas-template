import React from "react";
import { cn } from "../../../lib/utils";

const Card = ({
  title,
  className,
  border,
  children,
}: {
  title: string;
  className?: string;
  border?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full h-full min-h-[126px] px-4 py-2 flex flex-col justify-between items-start bg-foreground/5 rounded-lg",
        {
          "border border-primary": border,
        },
        className
      )}
    >
      <h3 className="text-sm">{title}</h3>
      <p className="text-base text-foreground/80 font-light">{children}</p>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col gap-[60px] items-center">
      <h2 className="text-xl font-semibold">August - Sepetember 2023</h2>
      <div className="h-full w-full flex flex-col gap-4 overflow-auto">
        <div className="w-full flex flex-row gap-4">
          <Card className="w-full" title="Learning">
            Test
          </Card>
          <Card className="w-full" title="Learning">
            Test
          </Card>
        </div>
        <div className="h-[186px] w-full flex flex-row gap-4">
          <Card className="w-full" title="Learning">
            Test
          </Card>
          <Card className="w-full" title="Learning">
            Test
          </Card>
        </div>
        <Card className="w-full" title="Learning">
          Test
        </Card>
      </div>
    </div>
  );
}
