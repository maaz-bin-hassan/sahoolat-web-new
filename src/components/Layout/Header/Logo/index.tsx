import Link from "next/link";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="Sahoolat.AI Logo"
        width={48}
        height={48}
        className="w-12 h-12"
      />
      <span className="font-bold text-2xl">
        <span className="text-primary">Sahoolat</span><span className="text-orange">.AI</span>
      </span>
    </Link>
  );
};

export default Logo;
