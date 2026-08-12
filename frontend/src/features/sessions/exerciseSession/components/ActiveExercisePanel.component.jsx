import Card from "../../../../shared/layout/Card"
import CurrentExercise from "./CurrentExercise.component"

const ActiveExercisePanel = ({ featuredExercise, completeExercise, skipExercise, isPending }) => {
    return (
        <Card className="flex-1">
            <CurrentExercise
                featuredExercise={featuredExercise}
                completeExercise={completeExercise}
                skipExercise={skipExercise}
                isPending={isPending}
            />
        </Card>
    )
}

export default ActiveExercisePanel;