export const getCurrentWeekRange = () => {
    // current time
    const now = new Date();
    const day = now.getDay();

    // Difference to monday in Days
    const diffToMonday = day === 0 ? - 6 : 1 - day;

    // Get the date of the Monday of THIS week
    const startOfWeek = new Date(now);
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);
    // Set time to the start of Monday
    startOfWeek.setHours(0, 0, 0, 0);

    // Get the date of Sunday of This week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    // Set time to the END of Sunday
    endOfWeek.setHours(23, 59, 59, 999);

    return { startOfWeek, endOfWeek }
}
