'use client';;
import * as React from "react";
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function XScroll({
  children,
  className,
  ...props
}) {
  return (
    <div className="flex">
      <ScrollArea className={cn('w-full flex-1', className)} {...props}>
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}