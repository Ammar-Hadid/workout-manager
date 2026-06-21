import { Construction } from "lucide-react";


const DevelopmentPreviewBanner = () => {
    return (
        <aside
            aria-labelledby="development-preview-title"
            className="border-b border-warning/30 bg-warning-200 px-lg py-sm md:px-4xl lg:px-5xl"
        >
            <div className="flex flex-col gap-md md:flex-row md:items-center md:gap-lg">
                <Construction className="text-warning w-xl h-xl md:w-2xl md:h-2xl lg:w-3xl lg:h-3xl" />

                <div>
                    <h2
                        id="development-preview-title"
                        className="shrink-0 text-body-sm font-semibold text-warning"
                    >
                        Early Development Preview
                    </h2>

                    <p className="text-body-sm leading-relaxed text-text-primary">
                        This project is currently in active development and has not reached its first public release. The current version is intended to demonstrate architecture, backend functionality, and core workflows. Features such as workout tracking, session history, analytics, and the final user experience are still being built. The current interface is a temporary prototype and does not represent the planned final design.                    </p>
                </div>
            </div>
        </aside>
    )
}

export default DevelopmentPreviewBanner;
