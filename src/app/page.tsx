import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl font-bold mb-8'>Receipt Analyzer</h1>
      <div className='flex gap-4'>
        <Button asChild>
          <Link href='/upload'>Upload Receipt</Link>
        </Button>
        <Button asChild>
          <Link href='/shopping-list'>View Shopping List</Link>
        </Button>
      </div>
    </main>
  );
}
