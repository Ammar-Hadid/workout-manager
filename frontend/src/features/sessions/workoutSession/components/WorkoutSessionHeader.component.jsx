import { Circle, Clock } from "lucide-react";
import { faPause, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import Card from "../../../../shared/layout/Card";

import { useElapsedTime } from "../hooks/useElapsedTime.hook";
import { formatElapsedTime } from "../utils/WorkoutTimeElapsed.util";



import EllipsisMenu from "../../../../shared/components/EllipsisMenu";

const WorkoutSessionHeader = ({ workoutSession }) => {
    const elapsedTime = useElapsedTime(workoutSession.startedAt);
    const formattedElapsedTime = formatElapsedTime(elapsedTime);

    const menuActions = [
        {
            id: 'pause:workout-session',
            label: 'Pause Session',
            icon: faPause,
            onclick: () => console.log('pause button clicked'),
        },

        {
            id: 'discard:workout-session',
            label: 'Discard Session',
            icon: faCircleMinus,
            variant: 'danger',
            onClick: () => console.log('discard button clicked'),
        }
    ];

    return (
        <Card className="flex flex-row md:p-lg lg:items-center justify-between">
            <div className="flex items-center gap-md text-primary">
                <Circle className="size-md fill-current" aria-hidden="true" />
                <span className="text-body whitespace-nowrap">In Progress</span>
            </div>

            <div className="flex items-center gap-sm justify-between">
                <div className="flex items-center gap-md">
                    <Clock className="size-xl" />

                    <div className="flex flex-col">
                        <span className="text-body-lg text-text-primary">{formattedElapsedTime}</span>
                        <span className="text-body-sm text-text-secondary whitespace-nowrap">Elapsed Time</span>
                    </div>
                </div>

                <EllipsisMenu actions={menuActions} buttonClassname="block inset-auto static" />
            </div>
        </Card>
    )
}

export default WorkoutSessionHeader;
