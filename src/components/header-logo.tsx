import Image from "next/image";
import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex gap-x-2.5">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={28}
          height={28}
          className="h-10 w-10"
        />
        <p className="font-semibold text-white text-2xl">Finance</p>
      </div>
    </Link>
  );
}
