import { twMerge } from "tailwind-merge"

interface BoxProps {
    children: React.ReactNode
    className?: string
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <section className="w-[100vw] h-[100vh] bg-gray-200/50 flex justify-center items-center absolute top-0
    max-md:bg-white">
        <div className={twMerge("max-w-[600px] overflow-y-auto ", className)}>
            {children}
        </div>
    </section>
  )
}

export default Box