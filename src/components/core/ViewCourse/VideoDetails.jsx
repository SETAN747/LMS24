import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { AiFillPlayCircle } from "react-icons/ai"
import IconBtn from '../../common/IconBtn';

const VideoDetails = () => {

    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();
    const { token } = useSelector((state) => state.auth);
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const setVideoSpecificDetails = async () => {
            if (!courseSectionData.length)
                return;
            if (!courseId && !sectionId && !subSectionId) {
                navigate("/dashboard/enrolled-courses");
            }
            else {
                //let's assume k all 3 fields are present

                const filteredData = courseSectionData.filter(
                    (course) => course._id === sectionId
                )

                const filteredVideoData = filteredData?.[0].subSection.filter(
                    (data) => data._id === subSectionId
                )

                setVideoData(filteredVideoData[0]);
                setVideoEnded(false);

            }
        }
        setVideoSpecificDetails();

    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if (currentSectionIndex === courseSectionData.length - 1 &&
            currentSubSectionIndex === noOfSubSections - 1) {
            return true;
        }
        else {
            return false;
        }


    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
    
        if (currentSectionIndex === -1) return; // Ensure section exists
    
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );
    
        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    
        if (currentSubSectionIndex < noOfSubSections - 1) {
            // Move to next video in the same section
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        } else if (currentSectionIndex < courseSectionData.length - 1) {
            // Move to first video of the next section
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }
    };
    

    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id === sectionId
        );
    
        if (currentSectionIndex === -1) return; // Ensure section exists
    
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        );
    
        if (currentSubSectionIndex > 0) {
            // Move to previous video in the same section
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        } else if (currentSectionIndex > 0) {
            // Move to the last video of the previous section
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
        }
    };
    

    const handleLectureCompletion = async () => {

        ///dummy code, baad me we will replace it witht the actual call
        setLoading(true);
        //PENDING - > Course Progress PENDING
        const res = await markLectureAsComplete({ courseId: courseId, subSectionId: subSectionId }, token);
        //state update
        if (res) {
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);

    }
    return (
        <div>
            {
                !videoData ? (<div>
                    No Data Found
                </div>)
                    : (
                        <Player
                            ref={playerRef}
                            aspectRatio="16:9"
                            playsInline
                            onEnded={() => setVideoEnded(true)}
                            src={videoData?.videoUrl}
                        >

                            {/* <AiFillPlayCircle /> */}

                            {
                                videoEnded && (
                                    <div>
                                        {
                                            !completedLectures.includes(subSectionId) && (
                                                <IconBtn
                                                    disabled={loading}
                                                    onclick={() => handleLectureCompletion()}
                                                    text={!loading ? "Mark As Completed" : "Loading..."}
                                                />
                                            )
                                        }

                                        <IconBtn
                                            disabled={loading}
                                            onclick={() => {
                                                if (playerRef?.current) {
                                                    playerRef.current?.seek(0);
                                                    setVideoEnded(false);
                                                }
                                            }}
                                            text="Rewatch"
                                            customClasses="text-xl"
                                        />

                                        <div>
                                            {!isFirstVideo() && (
                                                <button
                                                    disabled={loading}
                                                    onClick={goToPrevVideo}
                                                    className='blackButton'
                                                >
                                                    Prev
                                                </button>
                                            )}
                                            {!isLastVideo() && (
                                                <button
                                                    disabled={loading}
                                                    onClick={goToNextVideo}
                                                    className='blackButton'>
                                                    Next
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        </Player>
                    )
            }
            <div className="bg-richblack-800 p-6 rounded-lg shadow-md mt-2">
                <h1 className="text-2xl font-bold text-white mb-2">
                    {videoData?.title}
                </h1>
                <p className="text-richblack-200 text-sm">
                    {videoData?.description}
                </p>
            </div>

        </div>
    )
}

export default VideoDetails
