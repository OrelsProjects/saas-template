import React from "react";
import { cn } from "@/lib/utils";
import { FaClipboardList } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { Note } from "./note";
import WorkTimeChart from "@/components/graphs/workTimePie";
import { UsageGraph } from "@/components/graphs/usageGraph";

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
      <h3 className="text-sm md:text-xl flex-shrink-0">{title}</h3>
      <div className="w-full text-base text-foreground/80 font-light">
        {children}
      </div>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="w-full h-full md:h-fit flex flex-col gap-8 mt-7 items-center">
      <h2 className="w-full text-xl md:text-3xl font-semibold text-center md:text-start">
        August - Sepetember 2023
      </h2>
      <div className="h-full w-full flex flex-col gap-4 overflow-auto">
        {/* Upper section */}
        <div className="w-full flex flex-row gap-4 md:h-52">
          <Card className="w-full md:pb-14" title="Completed">
            <div className="flex flex-row items-center gap-2">
              <FaClipboardList className="w-8 h-8 fill-positive" />
              <p className="text-lg md:text-2xl font-medium text-foreground">
                50/100
              </p>
            </div>
          </Card>
          <Card className="hidden md:flex w-full md:pb-14" title="In progress">
            <div className="flex flex-row items-center gap-2">
              <FaClipboardList className="w-8 h-8 fill-progress" />
              <p className="text-lg md:text-2xl font-medium text-foreground">
                20/100
              </p>
            </div>
          </Card>
          <Card className="w-full md:pb-14" title="Revenue" border>
            <div className="w-full flex flex-row items-center justify-between gap-2">
              <p className="text-xl md:text-3xl font-semibold text-foreground">
                106K
              </p>
              <div className="flex flex-row gap-1 items-center">
                <p className="text-sm md:text-base text-positive">+20%</p>
                <GoArrowUpRight className="w-3 h-3 fill-positive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Mid section */}
        <div className="h-[186px] w-full flex flex-row gap-4 flex-shrink-0 md:grid md:grid-cols-3 md:h-52">
          <Card
            className="w-full md:col-span-2 md:order-last md:justify-start"
            title="Notes"
          >
            <div className="relative h-[100px] w-[100px] flex justify-center items-center md:w-full md:h-32 md:gap-5">
              <Note className="absolute md:relative">Alarm</Note>
              <Note className="absolute ml-6 md:relative md:ml-0">
                Reminder
              </Note>
              <Note className="absolute ml-12 md:relative md:ml-0">
                Important
              </Note>
            </div>
          </Card>
          <Card className="w-full md:col-span-1" title="Work Time">
            <div className="flex w-full h-full justify-center items-center">
              <WorkTimeChart />
            </div>
          </Card>
        </div>

        {/* Lower graph */}
        <Card
          className="w-full h-fit md:flex-row"
          border
          title="Usage over time"
        >
          <UsageGraph />
        </Card>
      </div>
    </div>
  );
}
