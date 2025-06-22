import Link from "next/link";

const NavbarItem = ({ title, url, icon, selected }) => {
  const liBaseStyle =
    "border-x border-base-content text-white transition-colors duration-300 h-20";
  const widthClass = selected ? "w-2/6" : "w-1/6";
  const linkStyle =
    "flex items-center justify-center flex-col text-center gap-2 w-full h-full cursor-pointer hover:bg-base-content hover:text-black";

  return (
    <li className={`${liBaseStyle} ${widthClass}`}>
      <Link href={url} aria-current={selected ? "page" : undefined}>
        <div className={linkStyle}>
          <span>{icon}</span>
          {selected && <span className="text-sm">{title}</span>}
        </div>
      </Link>
    </li>
  );
};

export default NavbarItem;
