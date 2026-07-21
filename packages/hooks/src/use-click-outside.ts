import { useEffect, useRef } from "react"

/** Detects clicks outside a referenced element. Returns a ref to attach to the element. @public */
export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null)

  useEffect(() => {
    function handleEvent(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleEvent)

    return () => {
      document.removeEventListener("mousedown", handleEvent)
    }
  }, [callback, ref])

  return ref
}
