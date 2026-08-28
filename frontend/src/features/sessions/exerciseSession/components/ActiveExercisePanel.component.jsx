import Card from "../../../../shared/layout/Card";
import CurrentExercise from "./CurrentExercise.component";
import SetsProgress from "../../setSession/components/SetsProgress";
import NoActiveExercise from "./NoActiveExercise.component";

const ActiveExercisePanel = ({ featuredExercise, completeExercise, skipExercise, areExerciseActionsDisabled, setSessions, weightUnit }) => {

    if (!featuredExercise) return <NoActiveExercise />

    return (
        <Card className="flex-1 lg:gap-3xl">
            <CurrentExercise
                featuredExercise={featuredExercise}
                completeExercise={completeExercise}
                skipExercise={skipExercise}
                isPending={areExerciseActionsDisabled}
            />

            <SetsProgress
                sets={setSessions}
                weightUnit={weightUnit}
            />
        </Card>
    )
}

export default ActiveExercisePanel;