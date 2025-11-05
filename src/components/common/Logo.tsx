import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface LogoProps {
    className?: string;
    showText?: boolean;
    size?: "md" | "lg";
}

const sizeClasses = {
    sm: {
        icon: "h-5 w-5",
        container: "h-8 w-8",
        text: "text-base",
    },
    md: {
        icon: "h-6 w-6",
        container: "h-10 w-10",
        text: "text-xl",
    },
    lg: {
        icon: "h-8 w-8",
        container: "h-12 w-12",
        text: "text-2xl",
    },
};



export default function Logo({
    className,
    showText = true,
    size = "md",
}: LogoProps) {
    const sizeClass = sizeClasses[size];
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className={`${sizeClass.container} flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg shadow-pink-500/30`}>
                <Building2 className={`${sizeClass.icon} text-white`} />
            </div>
            {showText && (
                <div className="flex flex-col">
                    <span className={`${sizeClass.text} font-bold text-gray-900 leading-none`}>
                        CompanyHub
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                        Manage Smarter
                    </span>
                </div>
            )}
        </div>
    )
}