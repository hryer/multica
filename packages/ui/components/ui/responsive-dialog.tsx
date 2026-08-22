"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { useIsMobile } from "@multica/ui/hooks/use-mobile"
import { Dialog, DialogContent, DialogTitle } from "./dialog"
import { Drawer, DrawerContent, DrawerTitle, DrawerClose } from "./drawer"

const ResponsiveDialogContext = React.createContext(false)

/**
 * Renders a Dialog on desktop and a bottom-sheet Drawer on mobile
 * (shadcn's standard responsive-dialog pattern). Reserve this for
 * high-traffic modals — most dialogs should stay on the plain Dialog
 * primitive.
 */
function ResponsiveDialog({
  children,
  open,
  onOpenChange,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()
  return (
    <ResponsiveDialogContext.Provider value={isMobile}>
      {isMobile ? (
        <Drawer open={open} onOpenChange={onOpenChange}>
          {children}
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {children}
        </Dialog>
      )}
    </ResponsiveDialogContext.Provider>
  )
}

function ResponsiveDialogContent({
  className,
  drawerClassName,
  children,
  showCloseButton = true,
  ...props
}: {
  className?: string
  drawerClassName?: string
  children: React.ReactNode
  showCloseButton?: boolean
} & Omit<
  React.ComponentProps<typeof DialogContent>,
  "className" | "children" | "showCloseButton"
>) {
  const isMobile = React.useContext(ResponsiveDialogContext)

  if (isMobile) {
    return (
      <DrawerContent className={drawerClassName}>
        {children}
        {showCloseButton && (
          <DrawerClose
            className="absolute top-2 right-2 z-10 flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-accent"
            aria-label="Close"
          >
            <XIcon className="size-4" />
          </DrawerClose>
        )}
      </DrawerContent>
    )
  }

  return (
    <DialogContent className={className} showCloseButton={showCloseButton} {...props}>
      {children}
    </DialogContent>
  )
}

function ResponsiveDialogTitle({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const isMobile = React.useContext(ResponsiveDialogContext)
  return isMobile ? (
    <DrawerTitle className={className}>{children}</DrawerTitle>
  ) : (
    <DialogTitle className={className}>{children}</DialogTitle>
  )
}

export { ResponsiveDialog, ResponsiveDialogContent, ResponsiveDialogTitle }
