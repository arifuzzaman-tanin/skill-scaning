import axiosInstance from "../../Api/AxiosInstance";
import type { AxiosResponse } from "axios"; 
import IScore from "./IScore";

const ScoreService = {
    postScore: async (payload: any): Promise<IScore> => {
        try {
            const response: AxiosResponse<IScore> = await axiosInstance.post("/extract_skills", payload);
            return response.data;
        } catch (error) {
            console.error("Error fetching score:", error);
            throw new Error("Error fetching score.");
        }
    }
}

export default ScoreService;
