import type { Metadata } from "next";
import Image from "next/image";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-full overflow-hi">
      <Image
        src="/bg-lines/line-top-right.png"
        alt="line-top-right"
        className="absolute top-0 right-0 hidden md:block"
        width={550}
        height={550}
      />

      <Image
        src="/bg-lines/line-bottom-right.png"
        alt="line-bottom-right"
        className="absolute bottom-0 right-0 hidden md:block"
        width={550}
        height={550}
      />
      <Image
        src="/bg-lines/line-left.png"
        alt="line-left-right"
        className="absolute bottom-0 left-0 -rotate-90 hidden md:block"
        width={550}
        height={550}
      />

      {children}
    </div>
  );
}
