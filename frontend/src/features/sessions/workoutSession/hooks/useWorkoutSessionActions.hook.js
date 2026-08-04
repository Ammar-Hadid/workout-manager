import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";

import {
    completeWorkoutSession,
    discardWorkoutSession,
    pauseWorkoutSession,
    resumeWorkoutSession,
} from "../api/workoutSession.api";

import { useConfirm } from "../../../../shared/context/confirmContext";
import { useToast } from "../../../../shared/context/toastContext";
import { getErrorMessage } from "../../../../shared/utils/errorHelper";

export const useWorkoutSessionActions = (workoutSessionId) => {
    const { confirm } = useConfirm();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const revalidator = useRevalidator();

    const [pendingAction, setPendingAction] = useState(null);

    const runAction = async ({
        action,
        pendingKey,
        successMessage,
        navigateToDashboard = false,
    }) => {
        if (!workoutSessionId || pendingAction) return null;

        try {
            setPendingAction(pendingKey);

            const result = await action();

            if (navigateToDashboard) {
                navigate("/", { replace: true });
            } else {
                await revalidator.revalidate();
            }

            showToast(successMessage, "success");

            return result;
        } catch (error) {
            showToast(getErrorMessage(error));
            return null;
        } finally {
            setPendingAction(null);
        }
    };

    const pauseWorkout = () => runAction({
        action: () => pauseWorkoutSession(workoutSessionId),
        pendingKey: "pause",
        successMessage: "Workout paused",
    });

    const resumeWorkout = () => runAction({
        action: () => resumeWorkoutSession(workoutSessionId),
        pendingKey: "resume",
        successMessage: "Workout resumed",
    });

    const completeWorkout = async () => {
        const isConfirmed = await confirm({
            mode: "warning",
            title: "Finish workout?",
            text: "This will complete your current workout session.",
            confirmText: "Finish Workout",
        });

        if (!isConfirmed) return null;

        return runAction({
            action: () => completeWorkoutSession(workoutSessionId),
            pendingKey: "complete",
            successMessage: "Workout completed",
            navigateToDashboard: true,
        });
    };

    const discardWorkout = async () => {
        const isConfirmed = await confirm({
            mode: "danger",
            title: "Discard workout?",
            text: "Your workout progress will be permanently deleted.",
            confirmText: "Discard Workout",
        });

        if (!isConfirmed) return null;

        return runAction({
            action: () => discardWorkoutSession(workoutSessionId),
            pendingKey: "discard",
            successMessage: "Workout discarded",
            navigateToDashboard: true,
        });
    };

    return {
        pauseWorkout,
        resumeWorkout,
        completeWorkout,
        discardWorkout,
        pendingAction,
        isPending: pendingAction !== null,
    };
};
