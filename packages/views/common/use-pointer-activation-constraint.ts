import { useIsMobile } from "@multica/ui/hooks/use-mobile";

// dnd-kit's distance-based activation fires on the first few pixels of any
// touchmove, so it wins the race against native scroll on touch devices. A
// delay-based constraint lets a scroll gesture start normally and only picks
// up the drag after a deliberate long-press.
const MOUSE_ACTIVATION_CONSTRAINT = { distance: 5 };
const TOUCH_ACTIVATION_CONSTRAINT = { delay: 250, tolerance: 5 };

export function usePointerActivationConstraint() {
  const isMobile = useIsMobile();
  return isMobile ? TOUCH_ACTIVATION_CONSTRAINT : MOUSE_ACTIVATION_CONSTRAINT;
}
