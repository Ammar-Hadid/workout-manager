import { buildDashboard } from "./dashboard.service.js";

export const getDashboard = async (req, res) => {

    try {
        const dashboard = await buildDashboard(req.userId);

        return res.status(200).json(dashboard);
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }
} 