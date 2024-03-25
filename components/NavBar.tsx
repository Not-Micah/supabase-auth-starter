import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="bg-neutral-500/10 p-5 mt-5 rounded-lg drop-shadow-md 
    absolute top-0 left-1/2 transform -translate-x-1/2
    flex justify-center items-center gap-8">
        <Link className="hover-scale" href="./">Home</Link>
        <Link className="hover-scale" href="./login">Login</Link>
        <Link className="hover-scale" href="./account">Account</Link>
    </nav>
  )
}

export default NavBar