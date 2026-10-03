"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { Brand } from "./Brand";
import { Icon } from "./Icon";

export type NavItem = { label: string; href: string };

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

export function Header({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("menu-open");
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 1080 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggleRef.current?.focus();
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="tricolor" aria-hidden="true" />
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__item">
            <Icon name="pin" size={15} />
            <span>{site.address.short}</span>
          </span>
          <span className="topbar__group">
            <a className="topbar__item" href={`tel:${site.phone.tel}`}>
              <Icon name="phone" size={15} />
              <span>{site.phone.display}</span>
            </a>
            <a className="topbar__item" href={`mailto:${site.email}`}>
              <Icon name="mail" size={15} />
              <span>{site.email}</span>
            </a>
          </span>
        </div>
      </div>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/">
            <Brand />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map((item) => (
              <Link key={item.href} className={`nav-link${isActive(pathname, item.href) ? " is-active" : ""}`} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="btn btn-primary" href="/membership">
              Join NFTCI <Icon name="arrow" size={17} />
            </Link>
            <button ref={toggleRef} className="menu-toggle" type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobileDrawer" onClick={() => setOpen(true)}>
              <span className="menu-toggle__label">Menu</span>
              <span className="menu-toggle__icon" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-drawer${open ? " is-open" : ""}`} id="mobileDrawer" aria-hidden={!open} inert={!open}>
        <div className="drawer-scrim" onClick={() => setOpen(false)} />
        <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
          <div className="drawer-head">
            <Brand />
            <button ref={closeRef} className="drawer-close" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <Icon name="close" size={22} />
            </button>
          </div>
          <p className="drawer-kicker">Explore NFTCI</p>
          <nav className="drawer-nav" aria-label="Mobile navigation">
            {nav.map((item, index) => (
              <Link key={item.href} className={`drawer-link${isActive(pathname, item.href) ? " is-active" : ""}`} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                <span className="drawer-link__main">
                  <span className="drawer-link__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="drawer-link__label">{item.label}</span>
                </span>
                <span className="drawer-link__arrow">
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
            ))}
          </nav>
          <Link className="btn btn-primary drawer-cta" href="/membership" onClick={() => setOpen(false)}>
            Become a member <Icon name="arrow" size={17} />
          </Link>
          <div className="drawer-contact">
            <span className="drawer-contact__label">Need assistance?</span>
            <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a>
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>Federation office · Sector 80, Noida</p>
          </div>
        </div>
      </div>
    </>
  );
}
