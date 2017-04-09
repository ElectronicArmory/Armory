package com.electronicarmory.armory.service.mapper;

import com.electronicarmory.armory.domain.*;
import com.electronicarmory.armory.service.dto.ProgramDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Program and its DTO ProgramDTO.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, })
public interface ProgramMapper {

    ProgramDTO programToProgramDTO(Program program);

    List<ProgramDTO> programsToProgramDTOs(List<Program> programs);

    @Mapping(target = "resources", ignore = true)
    @Mapping(target = "disciplines", ignore = true)
    Program programDTOToProgram(ProgramDTO programDTO);

    List<Program> programDTOsToPrograms(List<ProgramDTO> programDTOs);

    default Course courseFromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
