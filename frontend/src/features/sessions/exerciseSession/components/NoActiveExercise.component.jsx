import { Dumbbell } from "lucide-react";

import Card from "../../../../shared/layout/Card.jsx";

const NoActiveExercise = () => {
    return (
        <Card className="flex-1 justify-center">
            <div className="relative mt-md flex min-h-72 overflow-hidden text-center">
                <div
                    className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                />

                <div className="relative m-auto flex flex-col items-center">
                    <div className="mb-lg flex size-3xl items-center justify-center rounded-full border border-primary/25 bg-bg-accent-surface text-primary shadow-lg shadow-primary/10">
                        <Dumbbell className="size-lg" strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <h2 className="m-0 text-body-lg font-semibold text-text-primary">
                        No exercise in progress
                    </h2>

                    <p className="m-0 mt-sm text-body text-text-secondary">
                        Start an exercise to track your sets, progress, and rest time here.
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default NoActiveExercise;
