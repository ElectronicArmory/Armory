package com.electronicarmory.armory.service.mapper;

import com.electronicarmory.armory.domain.*;
import com.electronicarmory.armory.service.dto.ResourceDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Resource and its DTO ResourceDTO.
 */
@Mapper(componentModel = "spring", uses = {DisciplineMapper.class, ProgramMapper.class, CourseMapper.class, LessonMapper.class, })
public interface ResourceMapper {

    @Mapping(source = "discipline.id", target = "disciplineId")
    @Mapping(source = "program.id", target = "programId")
    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "lesson.id", target = "lessonId")
    ResourceDTO resourceToResourceDTO(Resource resource);

    List<ResourceDTO> resourcesToResourceDTOs(List<Resource> resources);

    @Mapping(source = "disciplineId", target = "discipline")
    @Mapping(source = "programId", target = "program")
    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "lessonId", target = "lesson")
    Resource resourceDTOToResource(ResourceDTO resourceDTO);

    List<Resource> resourceDTOsToResources(List<ResourceDTO> resourceDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Resource resourceFromId(Long id) {
        if (id == null) {
            return null;
        }
        Resource resource = new Resource();
        resource.setId(id);
        return resource;
    }
    

}
