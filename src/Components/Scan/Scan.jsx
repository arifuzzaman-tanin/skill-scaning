import { useState } from 'react';
import ScoreService from '../../Services/Score/ScoreService';
import PropTypes from 'prop-types';
import './Scan.css'; // Adjust path according to your project structure
import Score from '../Score/Score'; // Import the Score component
import { RightOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

function Scan() {
    const [isHiddenScan, setIsHiddenScan] = useState(false);
    const [resumeText, setResumeText] = useState('');
    const [jobDescriptionText, setJobDescriptionText] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [scoreData, setScoreData] = useState(null); // State to hold score data
    const [isLoading, setIsLoading] = useState(false); // State to track loading state

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitDisabled(false);
        setIsLoading(true); // Set loading state to true
        fetchData({ job_description: jobDescriptionText, resume: resumeText });
    };

    const fetchData = async (payload) => {
        try {
            const score = await ScoreService.postScore(payload);
            console.log(score);
            setIsHiddenScan(true);
            setScoreData(score); // Set the score data in state
        } catch (error) {
            console.error("Error fetching score:", error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleResumeChange = (event) => {
        const updatedResumeText = event.target.value;
        setResumeText(updatedResumeText);
        setIsSubmitDisabled(true)
        if (updatedResumeText.length >= 50) {
            updateSubmitButtonState(updatedResumeText, jobDescriptionText);
        }
    };

    const handleJobDescriptionChange = (event) => {
        const updatedJobDescriptionText = event.target.value;
        setJobDescriptionText(updatedJobDescriptionText);
        setIsSubmitDisabled(true)
        if (updatedJobDescriptionText.length >= 50) {
            updateSubmitButtonState(resumeText, updatedJobDescriptionText);
        }
    };


    const updateSubmitButtonState = (resume, jobDescription) => {
        setIsSubmitDisabled(!(resume.trim() && jobDescription.trim()));
    };

    const handleBackToScan = () => {
        setIsHiddenScan(false); // Set isHiddenScan to false when back to scan is clicked
    };

    return (
        <div className="container-fluid">
            <div className={isLoading ? 'overlay' : ''}></div> {/* Overlay when loading */}
            {!isHiddenScan && (
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <TextAreaSection
                                    title="Copy and paste your Resume"
                                    value={resumeText}
                                    onChange={handleResumeChange}
                                />
                                <TextAreaSection
                                    title="Copy and paste the Job description"
                                    value={jobDescriptionText}
                                    onChange={handleJobDescriptionChange}
                                />
                            </div>
                            <div>
                                <button className='btn btn-dark mt-3 float-end ps-5 pe-5 text-uppercase' type="submit" disabled={isSubmitDisabled}>Scan <RightOutlined /></button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isLoading && <Spin className='loader' indicator={antIcon} />}
            {isHiddenScan && (
                scoreData && <Score scoreData={scoreData} resumeText={resumeText} jobDescriptionText = {jobDescriptionText} onBackToScan={handleBackToScan} />
            )}
        </div>
    );
}

const TextAreaSection = ({ title, value, onChange }) => (
    <div className="col-md-6 scan-div">
        <div className='scan-div-header'>
            <p className='text-center'>{title}</p>
        </div>
        <textarea
            className="form-control rounded-0"
            value={value}
            onChange={onChange}
        />
    </div>
);

TextAreaSection.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Scan;
