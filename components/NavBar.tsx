import Link from "next/link";
export default function NavBar() {
  return (
    <div>
      <ul className="flex">
        <li>
          <Link href="/" className="px-3 hover:text-gray-500">
            Home
          </Link>{" "}
        </li>
        <li>
          <Link href="/all-scores" className="px-3 hover:text-gray-500">
            All Scores
          </Link>
        </li>
      </ul>
    </div>
  );
}
