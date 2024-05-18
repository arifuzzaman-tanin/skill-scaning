import { useState } from 'react';
import { CheckOutlined, CloseOutlined, ArrowLeftOutlined, CopyOutlined } from '@ant-design/icons';
import { Progress, notification } from 'antd';
import '../../Components/Score/Score.css'
const twoColors = {
    '0%': 'red',
    '100%': '#0D6EFD',
};


function Score({ scoreData, resumeText, jobDescriptionText, onBackToScan }) {

    const [isCheckedQuantitativeAchievements, setQuantitativeAchievements] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Below Average':
                return 'bg-danger text-white fw-bold';
            case 'Average':
                return 'bg-danger text-white fw-bold';
            case 'Good':
                return 'bg-danger text-white fw-bold';
            case 'Excellent':
                return 'bg-primary text-white fw-bold';
            case 'Best':
                return 'bg-primary text-white fw-bold';
            default:
                return '';
        }
    };

    const openNotificationWithIcon = () => {
        notification.open({
            message: 'GPT command copied',
            description:
                'Now paste it into ChatGPT or other GPT tools to add missing skills and keywords to your resume.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    const handleQuantitativeAchievementsCheckboxOnChange = (event) => {
        setQuantitativeAchievements(event.target.checked)
    }

    const copyToClipboard = async () => {
        try {

            let resume = "The section below is my resume:\n \n"
            resume = resume + resumeText + "\n \n"

            let job_description = "The section below is the job description that I want to apply:\n \n Job Description Section Start\n \n"
            job_description = job_description + jobDescriptionText + "\n \n"
            job_description = job_description + "Job Description Section End\n \n"

            let missing_skills = 'Comma-separated skills which are missing in the resume:\n\n'
            missing_skills = missing_skills + scoreData.comma_separated_missing_skills

            let action = '\n\nNow take the following actions.\n\n'

            if(isCheckedQuantitativeAchievements){
                action = action + '1. Add the missing skills provided in the job description to the resume.\n'
                action = action + '2. Ensure that no missing skills are overlooked in the resume; if necessary, modify the resume.\n'
                action = action + '3. Add quantitative achievements in my work experiences.\n'
                action = action + '4. Provide a complete and final resume that includes all the missing keywords/skills and all sections of the resume.\n'
            }
            else{
                action = action + '1. Add the missing skills provided in the job description to the resume.\n'
            action = action + '2. Ensure that no missing skills are overlooked in the resume; if necessary, modify the resume.\n'
            action = action + '3. Provide a complete and final resume that includes all the missing keywords/skills and all sections of the resume.\n'
            }
            

            await navigator.clipboard.writeText(resume + job_description + missing_skills + action);
            //   alert('Text copied to clipboard!');
            openNotificationWithIcon()
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy text to clipboard.');
        }
    };

    return (
        <div className="card border-0">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className='d-flex align-items-center justify-content-center'>
                            <Progress type="circle" strokeColor={twoColors} percent={scoreData.resume_score_in_percentage} />
                        </div>
                        <div className='text-center'>
                            <p className='mt-3'>match out of 100</p>
                            <p className='resume-status'>
                                <span className={getStatusColor(scoreData.resume_status === 'Below Average' ? 'Below Average' : '')}>Below Average</span>
                                <span className={getStatusColor(scoreData.resume_status === 'Average' ? 'Average' : '')}>Average</span>
                                <span className={getStatusColor(scoreData.resume_status === 'Good' ? 'Good' : '')}>Good</span>
                                <span className={getStatusColor(scoreData.resume_status === 'Excellent' ? 'Excellent' : '')}>Excellent</span>
                                <span className={getStatusColor(scoreData.resume_status === 'Best' ? 'Best' : '')}>Best</span>
                            </p>
                        </div>

                        <div className='row mt-5'>
                            <div className='col-sm-6 mb-3'>
                                <div className='card rounded-0 border-0 bg-score-card'>
                                    <div className='card-body text-center'>
                                        <p>Skill found in the Job description </p>
                                        <p>{scoreData.total_required_skills_in_job_description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6 mb-3'>
                                <div className='card rounded-0 border-0 bg-score-card'>
                                    <div className='card-body text-center'>
                                        <p>Total skill match with your resume </p>
                                        <p>{scoreData.total_matching_skills_in_resume}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-3 mb-3 d-flex align-items-center justify-content-center'>
                            <p className='fs-4 fw-bold cursor-pointer' onClick={onBackToScan} ><ArrowLeftOutlined className='me-3' />Back to scan</p>
                        </div>

                        <div className='mt-3 mb-3'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={isCheckedQuantitativeAchievements} onChange={handleQuantitativeAchievementsCheckboxOnChange} />
                                        <label className="form-check-label">
                                            Add quantitative achievements
                                        </label>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <p className='fs-6 fw-bold cursor-pointer' onClick={copyToClipboard}><CopyOutlined className='me-1' />Copy</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 mb-3 d-flex align-items-center justify-content-center'>
                            <p className='text-small'>
                                After copying, then paste it into ChatGPT or other GPT tools to add missing skills and keywords to your resume.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='row'>
                            <div className='col-8'>
                                <p className='fw-bold float-start'>Skills in the Job description</p>
                            </div>
                            <div className='col-4'>
                                <p className='fw-bold float-end'>Skills in resume</p>
                            </div>
                        </div>

                        <div className='skill-set-div-scroll'>
                            <div className="table-responsive">
                                <table className="table table-sm table-striped table-hover table-borderless">
                                    <tbody>
                                        {scoreData && scoreData.skills.map((skill, index) => (
                                            <tr key={index}>
                                                <td>{skill.name}</td>
                                                <td>
                                                    {skill.is_available_in_resume ? (
                                                        <CheckOutlined className='float-end' />
                                                    ) : (
                                                        <CloseOutlined className='float-end' />
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