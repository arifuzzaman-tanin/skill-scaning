export default interface IScore {
    resume_score_in_percentage: number,
    resume_status_pass_fail: string,
    skills: any[],
    total_matching_skills_in_resume: number,
    total_missing_skills_in_resume: number,
    total_required_skills_in_job_description: number
}