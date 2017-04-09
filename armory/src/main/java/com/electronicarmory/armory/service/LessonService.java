package com.electronicarmory.armory.service;

import com.electronicarmory.armory.service.dto.LessonDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Lesson.
 */
public interface LessonService {

    /**
     * Save a lesson.
     *
     * @param lessonDTO the entity to save
     * @return the persisted entity
     */
    LessonDTO save(LessonDTO lessonDTO);

    /**
     *  Get all the lessons.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<LessonDTO> findAll(Pageable pageable);

    /**
     *  Get the "id" lesson.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    LessonDTO findOne(Long id);

    /**
     *  Delete the "id" lesson.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
