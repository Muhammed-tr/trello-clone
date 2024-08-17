import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import Image from 'next/image'
import logo from '../Assets/logoForsico.png';
import { authOptions} from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function LeftBar() {
  const session = await getServerSession(authOptions);

  return (
    <aside className="w-64 h-screen bg-blue-100 fixed top-0 left-0 z-10">
      {/* Sol üst köşedeki kesişim bölgesi için beyaz bir bölüm ekliyoruz ve logo'yu yerleştiriyoruz */}
      <div className="bg-blue-200 h-16 flex items-center justify-center">
      <Link href="/">
  <Image
    src={logo}
    alt="Picture of the logo"
  />
</Link>
<Link href="/">
          <span className="ml-2 cursor-pointer">Forsico</span>
        </Link>
      </div>

      <div className="p-4">
        <Link href="/" className="logo mb-8">
          {/* Trello-Demo */}
        </Link>
        <div>
          {session ? (
            <>
              {/* <p>Hello, {session?.user?.name}</p>
              <LogoutButton /> */}
            </>
          ) : (
            <>
              {/* <p>Not logged in</p>
              <LoginButton /> */}
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
