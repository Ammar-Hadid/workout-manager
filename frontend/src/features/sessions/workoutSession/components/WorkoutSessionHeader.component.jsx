import { Circle, Clock } from "lucide-react";
import { faPause, faCircleMinus, faPlay } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../../shared/layout/Card";

import { useElapsedTime } from "../hooks/useElapsedTime.hook";
import { formatElapsedTime } from "../utils/WorkoutTimeElapsed.util";



import EllipsisMenu from "../../../../shared/components/EllipsisMenu";

const WorkoutSessionHeader = ({
    workoutSession,
    pauseWorkout,
    resumeWorkout,
    discardWorkout,
    pendingAction,
    isPending,
}) => {
    const elapsedTime = useElapsedTime(workoutSession);
    const formattedElapsedTime = formatElapsedTime(elapsedTime);
    const isPaused = workoutSession.status === "paused";

    const menuActions = [
        {
            id: `${isPaused ? "resume" : "pause"}:workout-session`,
            label: isPaused ? "Resume Session" : "Pause Session",
            icon: isPaused ? faPlay : faPause,
            onClick: isPaused ? resumeWorkout : pauseWorkout,
            disabled: isPending,
        },

        {
            id: 'discard:workout-session',
            label: 'Discard Session',
            icon: faCircleMinus,
            variant: 'danger',
            onClick: discardWorkout,
            disabled: isPending,
        }
    ];

    const pausedHeaderClass = isPaused ? 'border-warning text-warning' : '';

    return (
        <Card className={`${pausedHeaderClass} flex flex-row md:p-lg lg:items-center justify-between`}>
            <div className={`flex items-center gap-md ${isPaused ? 'text-warning' : 'text-primary'}`}>
                <Circle className="size-md fill-current" aria-hidden="true" />
                <span className="text-body whitespace-nowrap">
                    {isPaused ? "Paused" : "In Progress"}
                </span>
            </div>

            <div className="flex items-center gap-sm justify-between">
                <div className="flex items-center gap-md">
                    <Clock className="size-xl" />

                    <div className="flex flex-col">
                        <span className="text-body-lg text-text-primary">{formattedElapsedTime}</span>
                        <span className="text-body-sm text-text-secondary whitespace-nowrap">Elapsed Time</span>
                    </div>
                </div>

                <EllipsisMenu
                    actions={menuActions}
                    buttonClassname="block inset-auto static"
                    ariaLabel={
                        pendingAction
                            ? `Workout action in progress: ${pendingAction}`
                            : "Workout actions"
                    }
                />
            </div>
        </Card>
    )
}

export default WorkoutSessionHeader;
