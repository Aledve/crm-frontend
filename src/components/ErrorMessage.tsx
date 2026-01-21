import { ReactNode } from "react";

export default function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div className="text-center my-2 bg-red-100 text-red-600 font-bold p-2 uppercase text-sm rounded-lg border border-red-200">
      {children}
    </div>
  )
}
