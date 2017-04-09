package com.electronicarmory.armory.service.impl;

import com.electronicarmory.armory.service.CourseService;
import com.electronicarmory.armory.domain.Course;
import com.electronicarmory.armory.repository.CourseRepository;
import com.electronicarmory.armory.service.dto.CourseDTO;
import com.electronicarmory.armory.service.mapper.CourseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Course.
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService{

    private final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);
    
    private final CourseRepository courseRepository;

    private final CourseMapper courseMapper;

    public CourseServiceImpl(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    /**
     * Save a course.
     *
     * @param courseDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CourseDTO save(CourseDTO courseDTO) {
        log.debug("Request to save Course : {}", courseDTO);
        Course course = courseMapper.courseDTOToCourse(courseDTO);
        course = courseRepository.save(course);
        CourseDTO result = courseMapper.courseToCourseDTO(course);
        return result;
    }

    /**
     *  Get all the courses.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CourseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Courses");
        Page<Course> result = courseRepository.findAll(pageable);
        return result.map(course -> courseMapper.courseToCourseDTO(course));
    }

    /**
     *  Get one course by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CourseDTO findOne(Long id) {
        log.debug("Request to get Course : {}", id);
        Course course = courseRepository.findOneWithEagerRelationships(id);
        CourseDTO courseDTO = courseMapper.courseToCourseDTO(course);
        return courseDTO;
    }

    /**
     *  Delete the  course by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Course : {}", id);
        courseRepository.delete(id);
    }
}
