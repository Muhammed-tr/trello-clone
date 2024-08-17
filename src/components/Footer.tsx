import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-100 p-4 px-8 mt-8">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">© {new Date().getFullYear()} Trello-Demo. All rights reserved.</p>
        <div>
          <Link href="/about" className="text-blue-600 hover:underline">
            About Us
          </Link>
          <span className="mx-2">|</span>
          <Link href="/contact" className="text-blue-600 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
