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
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Course courseFromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
    

}
