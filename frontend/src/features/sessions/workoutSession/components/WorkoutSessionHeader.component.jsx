import { Car, Circle } from "lucide-react";
import Card from "../../../../shared/layout/Card";

const WorkoutSessionHeader = () => {
    return (
        <Card className="md:p-lg">
            <div className="flex items-center gap-md text-primary">
                <Circle className="size-md fill-current" aria-hidden="true" />
                <span className="text-body">In Progress</span>
            </div>
        </Card>
    )
}

export default WorkoutSessionHeader;