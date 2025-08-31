import Link from "next/link";
const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="hover:underline">
          Home
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
