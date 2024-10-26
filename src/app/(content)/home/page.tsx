import React from "react";
import { cn } from "@/lib/utils";
import { FaClipboardList } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { Note } from "./note";
import WorkTimeChart from "../../../components/graphs/WorkTimePie";
import { UsageGraph } from "../../../components/graphs/usageGraph";

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
          "border-2 border-primary": border,
        },
        className
      )}
    >
      <h3 className="text-sm">{title}</h3>
      <div className="w-full text-base text-foreground/80 font-light">
        {children}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="w-full h-full flex flex-col gap-[60px] items-center">
      <h2 className="text-xl font-semibold">August - Sepetember 2023</h2>
      <div className="h-full w-full flex flex-col gap-4 overflow-auto">
        <div className="w-full flex flex-row gap-4">
          <Card className="w-full" title="Completed">
            <div className="flex flex-row items-center gap-2">
              <FaClipboardList className="w-8 h-8 fill-positive" />
              <p className="text-lg font-medium text-foreground">50/100</p>
            </div>
          </Card>
          <Card className="w-full" title="Revenue" border>
            <div className="w-full flex flex-row items-center justify-between gap-2">
              <p className="text-xl font-semibold text-foreground">106K</p>
              <div className="flex flex-row gap-1 items-center">
                <p className="text-sm text-positive">+20%</p>
                <GoArrowUpRight className="w-3 h-3 fill-positive" />
              </div>
            </div>
          </Card>
        </div>
        <div className="h-[186px] w-full flex flex-row gap-4 flex-shrink-0">
          <Card className="w-full" title="Notes">
            <div className="relative h-[100px] w-[100px] md:w-32 md:h-32 flex justify-center items-center">
              <Note className="absolute">Alarm</Note>
              <Note className="absolute ml-6">Reminder</Note>
              <Note className="absolute ml-12">Important</Note>
            </div>
          </Card>
          <Card className="w-full" title="Work Time">
            <div className="flex w-full h-full justify-center items-center">
              <WorkTimeChart />
            </div>
          </Card>
        </div>
        <Card className="w-full h-fit" border title="Usage over time">
          <UsageGraph />
        </Card>
      </div>
    </div>
  );
}
