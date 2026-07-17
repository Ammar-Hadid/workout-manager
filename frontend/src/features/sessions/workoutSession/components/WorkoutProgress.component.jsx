import Card from "../../../../shared/layout/Card";
import SectionHeading from "../../../../shared/layout/SectionHeading";

import { Dumbbell, BookmarkCheck } from "lucide-react";

import IconBadge from "../../../../shared/components/IconBadge.component";
import DefaultButton from "../../../../shared/components/DefaultButton";


const LoadingBar = ({ width }) => {
    if (!Number.isFinite(width)) return null;


    return (
        <div className="relative bg-bg-surface w-full h-md rounded-xl overflow-hidden border border-primary/75">
            <div
                className={`
                     absolute content-[''] top-0 left-0 bottom-0 h-md
                     bg-success transition-[width] duration-200 ease-in-out`}
                style={{ width: `${width}%` }}
            />
        </div>
    )
}

const ProgressItem = ({ label, value }) => {
    if (!label || !value) return null;

    return (
        <div className="flex flex-col gap-md">
            <span className="text-text-secondary text-body uppercase">{label}</span>
            <span className="text-text-primary text-body-lg">{value}</span>
        </div>
    )
}

const WorkoutProgress = ({ progress, progressPercentage, estimatedTimeLeft }) => {
    const { totalExercisesCount, completedExercisesCount } = progress;

    if (
        !Number.isFinite(totalExercisesCount) ||
        !Number.isFinite(completedExercisesCount) ||
        !Number.isFinite(progressPercentage) ||
        !Number.isFinite(estimatedTimeLeft)
    ) return null;

    return (
        <Card className="flex flex-col lg:flex-row lg:items-center justify-between">

            <div className="flex lg:gap-3xl lg:divide-x lg:divide-text-secondary lg:items-center">
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-lg pr-3xl">
                    <IconBadge
                        icon={Dumbbell}
                        className="p-lg"
                        iconClassName="size-3xl text-text-primary"
                    />

                    <div className="flex flex-col">
                        <SectionHeading heading="Workout Progress" />
                        <span className="text-h2">
                            <span>{completedExercisesCount}</span>
                            <span className="text-text-secondary">/{totalExercisesCount}</span>
                        </span>

                        <div className="flex flex-col gap-sm">
                            <div className="flex gap-xl">
                                <span className="text-pr">Exercises completed</span>
                                <span>{progressPercentage}%</span>
                            </div>

                            <LoadingBar width={progressPercentage} />
                        </div>
                    </div>
                </div>

                <div>
                    <ProgressItem label="est. time left" value={`${estimatedTimeLeft} min`} />
                </div>
            </div>

            <DefaultButton className="flex items-center gap-sm">
                <BookmarkCheck />
                Finish workout
            </DefaultButton>
        </Card >
    )
}

export default WorkoutProgress