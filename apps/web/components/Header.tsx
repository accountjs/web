import { ComponentProps } from "react"
import { Popover, PopoverButtonProps } from "@headlessui/react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

import { Container } from "@/components/Container"
import { Logo } from "@/components/Logo"
import { NavLinks } from "@/components/nav/NavLinks"
import { headerNvigations } from "@/components/nav/navigations"

const MenuIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ChevronUpIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 14l-5-5-5 5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const MobileNavLink = ({ children, ...props }: PopoverButtonProps<"a">) => {
  return (
    <Popover.Button
      as={Link}
      className="block text-base leading-7 tracking-tight text-gray-700 hover:bg-gray-200 p-2 rounded transition-colors ease-in-out duration-200"
      {...props}
    >
      {children}
    </Popover.Button>
  )
}

export const Header = () => {
  return (
    <header>
      <nav>
        <Container className="relative z-50 flex justify-between py-8">
          <div className="relative z-10 flex items-center gap-16 pl-2 sm:pl-0">
            <Link href="/" aria-label="Home">
              <Logo className="h-10" />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-3 lg:items-center">
            <NavLinks />
          </div>
          <div className="lg:hidden flex items-center gap-6">
            <Popover className="lg:hidden">
              {({ open }) => (
                <>
                  <Popover.Button
                    className="relative z-10 -m-2 inline-flex items-center rounded-lg stroke-gray-900 p-2 hover:bg-gray-200/50 hover:stroke-gray-600 active:stroke-gray-900 [&:not(:focus-visible)]:focus:outline-none"
                    aria-label="Toggle site navigation"
                  >
                    {({ open }) =>
                      open ? (
                        <ChevronUpIcon className="h-6 w-6" />
                      ) : (
                        <MenuIcon className="h-6 w-6" />
                      )
                    }
                  </Popover.Button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <>
                        <Popover.Overlay
                          static
                          as={motion.div}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 z-0 bg-gray-300/60 backdrop-blur"
                        />
                        <Popover.Panel
                          static
                          as={motion.div}
                          initial={{ opacity: 0, y: -32 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: -32,
                            transition: { duration: 0.2 },
                          }}
                          className="absolute inset-x-0 top-0 z-0 origin-top rounded-b-2xl bg-gray-50 px-6 pb-6 pt-28 shadow-2xl shadow-gray-900/20"
                        >
                          {headerNvigations.map(([title, href]) => (
                            <MobileNavLink href={href} key={title}>
                              {title}
                            </MobileNavLink>
                          ))}
                        </Popover.Panel>
                      </>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Popover>
          </div>
        </Container>
      </nav>
    </header>
  )
}
