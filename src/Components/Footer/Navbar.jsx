'use client';
import { useEffect, useMemo, useState } from "react";
import { FaUserCircle, FaCalendar, FaList } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { LuCarrot } from "react-icons/lu";
import NavbarItem from "./NavbarItem";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const selected = useMemo(() => {
    if (pathname.includes('profile')) return 'profile';
    if (pathname.includes('grocery-list')) return 'grocery-list';
    if (pathname.includes('calendar')) return 'calendar';
    if (pathname.includes('recipes')) return 'recipes';
    if (pathname.includes('ingredients')) return 'ingredients';
    if (pathname === '/barcode-scanner') return 'ingredients';
    return null;
  }, [pathname]);

  if (!selected) {
    return null; // No renderizar nada si no hay una selección
  }

  return (
    <ul className="flex flex-wrap justify-between items-center text-white">
      <NavbarItem title="Perfil" url="/profile" icon={<FaUserCircle className="text-2xl" />} selected={selected == 'profile'} />
      <NavbarItem title="Lista de Compras" url="/grocery-list" icon={<FaList className="text-2xl" />} selected={selected == 'grocery-list'} />
      <NavbarItem title="Calendario" url="/calendar" icon={<FaCalendar className="text-2xl" />} selected={selected == 'calendar'} />
      <NavbarItem title="Recetas" url="/recipes" icon={<GiForkKnifeSpoon className="text-2xl" />} selected={selected == 'recipes'} />
      <NavbarItem title="Ingredientes" url="/ingredients" icon={<LuCarrot className="text-2xl" />} selected={selected == 'ingredients'} />
    </ul>
  )
}

export default Navbar