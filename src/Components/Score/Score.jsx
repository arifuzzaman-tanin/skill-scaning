import { useState } from 'react';
import { CheckOutlined, CloseOutlined, ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons';
import { Progress, notification } from 'antd';
import '../../Components/Score/Score.css';

const twoColors = {
    '0%': 'red',
    '100%': '#0D6EFD',
};

function Score({ scoreData, resumeText, jobDescriptionText, onBackToScan }) {
    const [isCheckedQuantitativeAchievements, setQuantitativeAchievements] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Below Average':
            case 'Average':
            case 'Good':
                return 'bg-danger text-white fw-bold';
            case 'Excellent':
            case 'Best':
                return 'bg-primary text-white fw-bold';
            default:
                return '';
        }
    };

    const openNotification = () => {
        notification.open({
            message: 'GPT command copied',
            description: 'Paste this command into ChatGPT or other GPT tools to enhance your resume with missing skills and keywords.',
            onClick: () => console.log('Notification Clicked!'),
        });
    };

    const handleCheckboxChange = (event) => {
        setQuantitativeAchievements(event.target.checked);
    };

    const copyToClipboard = async () => {
        try {
            const promptText = `
You are a professional resume optimization assistant.

Your goal is to help improve my resume so that it matches the job description as closely as possible.

---

RESUME SECTION:
"""
${resumeText}
"""

---

JOB DESCRIPTION SECTION:
"""
${jobDescriptionText}
"""

---

MISSING SKILLS:
${scoreData.comma_separated_missing_skills}

---

INSTRUCTIONS:
1. Carefully review the job description and my resume.
2. Identify the missing skills listed above and integrate them naturally into the resume.
3. Ensure that NO missing skills are left out. Reword the resume where necessary.
4. DO NOT fabricate any experience.
${isCheckedQuantitativeAchievements ? '5. Where applicable, add **quantitative achievements** (with numbers, percentages, or measurable impact) to my work experiences.\n' : ''}
5. Maintain a professional tone and preserve formatting consistency.
6. Return the **final optimized resume** only — no explanation or commentary.

---

Final Output:
Return ONLY the full revised resume, ready to be submitted.
`;

            await navigator.clipboard.writeText(promptText);
            openNotification();
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy text to clipboard.');
        }
    };

    return (
        <div className="card border-0">
            <div className="card-body">
                <div className="row">
                    {/* Left side */}
                    <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-center">
                            <Progress type="circle" strokeColor={twoColors} percent={scoreData.resume_score_in_percentage} />
                        </div>
                        <div className="text-center mt-3">
                            <p>Match out of 100</p>
                            <p className="resume-status">
                                {['Below Average', 'Average', 'Good', 'Excellent', 'Best'].map((status) => (
                                    <span
                                        key={status}
                                        className={getStatusColor(scoreData.resume_status === status ? status : '')}
                                    >
                                        {status}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div className="row mt-5">
                            <div className="col-sm-6 mb-3">
                                <div className="card rounded-0 border-0 bg-score-card">
                                    <div className="card-body text-center">
                                        <p>Skills found in the Job Description</p>
                                        <p>{scoreData.total_required_skills_in_job_description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <div className="card rounded-0 border-0 bg-score-card">
                                    <div className="card-body text-center">
                                        <p>Total skill match with your Resume</p>
                                        <p>{scoreData.total_matching_skills_in_resume}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 mb-3 d-flex align-items-center justify-content-center">
                            <p className="fs-4 fw-bold cursor-pointer" onClick={onBackToScan}>
                                <ArrowLeftOutlined className="me-3" /> Back to scan
                            </p>
                        </div>

                        <div className="mt-3 mb-3">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={isCheckedQuantitativeAchievements}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className="form-check-label">Add quantitative achievements</label>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <p className="fs-6 fw-bold cursor-pointer" onClick={copyToClipboard}>
                                        <CopyOutlined className="me-1" /> Copy
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 mb-3 d-flex align-items-center justify-content-center">
                            <p className="text-small">
                                After copying, paste it into ChatGPT or other GPT tools to enhance your resume.
                            </p>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-8">
                                <p className="fw-bold float-start">Skills in the Job Description</p>
                            </div>
                            <div className="col-4">
                                <p className="fw-bold float-end">Skills in Resume</p>
                            </div>
                        </div>

                        <div className="skill-set-div-scroll">
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-hover table-borderless">
                                    <tbody>
                                        {scoreData.skills.map((skill, index) => (
                                            <tr key={index}>
                                                <td>{skill.name}</td>
                                                <td>
                                                    {skill.is_available_in_resume ? (
                                                        <CheckOutlined className="float-end" />
                                                    ) : (
                                                        <CloseOutlined className="float-end" />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Score;
