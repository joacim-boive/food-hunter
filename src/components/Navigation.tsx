import Link from "next/link";

export default function Navigation() {
  return (
    <nav className='bg-gray-800 text-white p-4'>
      <ul className='flex space-x-4'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/upload'>Upload Receipt</Link>
        </li>
        <li>
          <Link href='/shopping-list'>Shopping List</Link>
        </li>
      </ul>
    </nav>
  );
}
