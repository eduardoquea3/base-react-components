import { create } from "zustand"

export type SidebarPosition = "left" | "right"

interface SidebarState {
  open: boolean
  position: SidebarPosition
  toggleSidebar: () => void
  togglePosition: () => void
}

export const useSidebar = create<SidebarState>((set) => ({
  open: false,
  position: "left",
  toggleSidebar: () => set((state) => ({ open: !state.open })),
  togglePosition: () => set((state) => ({ position: state.position === "left" ? "right" : "left" })),
})) 