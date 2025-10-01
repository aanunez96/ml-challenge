'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header>
      {/* Main header */}
      <div className="bg-ml-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-14">
            {/* Mobile burger menu button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex items-center justify-center w-8 h-8 mr-3"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/icons/mercado-libre-seeklogo.png"
                  alt="Mercado Libre"
                  width={134}
                  height={32}
                  className="h-6 sm:h-8 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Search bar - Hidden on mobile, full width on tablet+ */}
            <div className="hidden sm:flex flex-1 max-w-xl mx-4 lg:mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar productos, marcas y más..."
                  className="w-full h-8 sm:h-9 px-4 pr-12 text-sm bg-white border-none rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-ml-text-muted"
                  data-testid="search-input"
                />
                <button
                  className="absolute right-0 top-0 h-full w-10 sm:w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-r-sm"
                  aria-label="Search"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right section - Icons for mobile, full for desktop */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              {/* MELI Plus banner - hidden on mobile and small tablets */}
              <div className="hidden xl:block">
                <Image
                  src="https://http2.mlstatic.com/D_NQ_743301-MLA87307409360_072025-OO.webp"
                  alt="MELI Plus"
                  width={300}
                  height={35}
                  className="h-8 w-auto"
                />
              </div>

              {/* User actions - always visible */}
              <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-600">
                {/* User icon - mobile */}
                <Link href="#" className="sm:hidden hover:text-gray-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                {/* User info - desktop */}
                <div className="hidden sm:flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-800 font-medium">Adrian</span>
                </div>

                {/* Notification icon with badge */}
                <div className="relative">
                  <Link href="#" className="hover:text-gray-800 flex items-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold leading-none">
                      1
                    </span>
                  </Link>
                </div>

                {/* Cart icon */}
                <Link href="#" className="hover:text-gray-800">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar - visible only on mobile */}
      <div className="sm:hidden bg-ml-primary px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            className="w-full h-9 px-4 pr-12 text-sm bg-white border-none rounded-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-ml-text-muted"
            data-testid="search-input-mobile"
          />
          <button
            className="absolute right-0 top-0 h-full w-11 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-r-sm"
            aria-label="Search"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block bg-ml-primary text-black">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          {/* Location */}
          <div className="flex items-start text-xs text-gray-600 gap-1">
            <svg className="w-3 h-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="leading-tight">
              <div className="text-gray-500">Enviar a Adrian</div>
              <div className="font-semibold text-gray-800">CP 11320</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8 h-12">
            <Link href="#" className="text-sm hover:text-blue-600 font-medium">
              Categorías
            </Link>
            <Link href="#" className="text-sm hover:text-blue-600 font-medium">
              Ofertas
            </Link>
            <Link href="#" className="text-sm hover:text-blue-600 font-medium">
              Cupones
            </Link>
            <Link href="#" className="text-sm hover:text-blue-600 font-medium">
              Supermercado
            </Link>
            <Link href="#" className="text-sm hover:text-blue-600 font-medium">
              Moda
            </Link>
            <div className="relative">
              <Link href="#" className="text-sm hover:text-blue-600 font-medium">
                Mercado Play
              </Link>
              <span className="absolute -top-2 right-0 bg-green-500 text-white text-xs px-1 rounded text-[10px] font-bold">
                GRATIS
              </span>
            </div>
            <Link href="#" className="text-sm hover:text-blue-600 font-medium">
              Vender
            </Link>
            <Link href="#" className="text-sm hover:text-blue-600 font-medium">
              Ayuda
            </Link>
          </nav>

          {/* Right section - User actions (Desktop only extras) */}
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <nav className="flex items-center gap-4">
              <Link href="#" className="hover:text-gray-800 font-medium">
                Mis compras
              </Link>
              <Link href="#" className="hover:text-gray-800 font-medium">
                Favoritos
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto">
            {/* Location section */}
            <div className="flex items-center text-xs text-gray-600 gap-2 px-4 py-3 border-b border-gray-100">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <div className="text-gray-500">Enviar a Adrian</div>
                <div className="font-semibold text-gray-800">CP 11320</div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="py-2">
              <Link 
                href="#" 
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categorías
              </Link>
              <Link 
                href="#" 
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ofertas
              </Link>
              <Link 
                href="#" 
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cupones
              </Link>
              <Link 
                href="#" 
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Supermercado
              </Link>
              <Link 
                href="#" 
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Moda
              </Link>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
                <Link 
                  href="#" 
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mercado Play
                </Link>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded font-bold">
                  GRATIS
                </span>
              </div>
              <Link 
                href="#" 
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vender
              </Link>
              <Link 
                href="#" 
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ayuda
              </Link>
              
              {/* User actions in mobile menu */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <Link 
                  href="#" 
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 border-b border-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mis compras
                </Link>
                <Link 
                  href="#" 
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Favoritos
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
