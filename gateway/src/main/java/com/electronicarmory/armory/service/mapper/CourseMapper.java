package com.electronicarmory.armory.service.mapper;

import com.electronicarmory.armory.domain.*;
import com.electronicarmory.armory.service.dto.CourseDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Course and its DTO CourseDTO.
 */
@Mapper(componentModel = "spring", uses = {LessonMapper.class, })
public interface CourseMapper {

    CourseDTO courseToCourseDTO(Course course);

    List<CourseDTO> coursesToCourseDTOs(List<Course> courses);

    @Mapping(target = "resources", ignore = true)
    @Mapping(target = "programs", ignore = true)
    Course courseDTOToCourse(CourseDTO courseDTO);

    List<Course> courseDTOsToCourses(List<CourseDTO> courseDTOs);

    default Lesson lessonFromId(Long id) {
        if (id == null) {
            return null;
        }
        Lesson lesson = new Lesson();
        lesson.setId(id);
        return lesson;
    }
}
