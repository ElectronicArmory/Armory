package com.electronicarmory.armory.service.mapper;

import com.electronicarmory.armory.domain.*;
import com.electronicarmory.armory.service.dto.LessonDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Lesson and its DTO LessonDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LessonMapper {

    LessonDTO lessonToLessonDTO(Lesson lesson);

    List<LessonDTO> lessonsToLessonDTOs(List<Lesson> lessons);

    @Mapping(target = "resources", ignore = true)
    @Mapping(target = "courses", ignore = true)
    Lesson lessonDTOToLesson(LessonDTO lessonDTO);

    List<Lesson> lessonDTOsToLessons(List<LessonDTO> lessonDTOs);
}
